class Mesh
{
    constructor(verticesArray, indicesArray, shaderProgram)
    {
        this.vertices = verticesArray;
        this.indices = indicesArray;
        this.shader = shaderProgram;

        this.CreateMesh();
    }

    Draw()
    {
        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_INT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }

    CreateMesh()
    {
        // Create vao, vbo, and ebo
        this.vao = gl.createVertexArray();
        this.vbo = gl.createBuffer();
        this.ebo = gl.createBuffer();

        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        const positionAttribute = gl.getAttribLocation(this.shader.GetProgram(), 'position');
        const texCoorAttribute = gl.getAttribLocation(this.shader.GetProgram(), 'textCoord');

        gl.enableVertexAttribArray(positionAttribute);
        gl.vertexAttribPointer(positionAttribute, 3, gl.FLOAT, false, 20, 0);

        gl.enableVertexAttribArray(texCoorAttribute);
        gl.vertexAttribPointer(texCoorAttribute, 2, gl.FLOAT, false, 20, 12);

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(this.indices), gl.STATIC_DRAW);
    
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
}