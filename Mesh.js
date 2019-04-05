class Mesh
{
    constructor(verticesArray, textCoords, indicesArray, shaderProgram)
    {
        this.numberOfIndices = indicesArray.length;
        this.shader = shaderProgram;
        // Create vao, vbo, and ebo
        this.vao = gl.createVertexArray();
        this.verticesVBO = gl.createBuffer();
        this.textCoordsVBO = gl.createBuffer();
        this.ebo = gl.createBuffer();

        const positionAttribute = gl.getAttribLocation(this.shader.GetProgram(), 'position');
        const texCoorAttribute = gl.getAttribLocation(this.shader.GetProgram(), 'textCoord');

        gl.bindVertexArray(this.vao);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesArray), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(positionAttribute);
        gl.vertexAttribPointer(positionAttribute, 3, gl.FLOAT, false, 12, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.textCoordsVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textCoords), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(texCoorAttribute);
        gl.vertexAttribPointer(texCoorAttribute, 2, gl.FLOAT, false, 8, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indicesArray), gl.STATIC_DRAW);
    
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    Draw()
    {
        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.drawElements(gl.TRIANGLES, this.numberOfIndices, gl.UNSIGNED_INT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }

    RefillTextCoords(newTextCoords)
    {
        this.textCoords = newTextCoords;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.textCoordsVBO);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(this.textCoords));
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}