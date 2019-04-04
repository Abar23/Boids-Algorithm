var canvas, gl, program, mesh, texture, vec3, mat4;
// start() is the main function that gets called first by index.html
var start = function() {
    
    vec3 = glMatrix.vec3;
    mat4 = glMatrix.mat4;

    initCanvas();
    program = new Shader('vertShader', 'fragShader');
    program.UseProgram();

    texture = new Texture("bird1-image");
    texture.BindTexture(1);

    var verts = [-0.5, -0.5, 0.0, 1.0, 0.0, 
                  0.5, -0.5, 0.0, 0.0, 0.0,
                  0.0,  0.5, 0.0, 0.5, 0.5];
    
    var indices = [0, 1, 2];
    mesh = new Mesh(verts, indices, program);

    var b = new Boid(program);
    b.Update();

    requestAnimationFrame(animate);
};

// starts the canvas and gl
var initCanvas = function() {
	canvas = document.getElementById('game-surface');
    gl = canvas.getContext('webgl2');   // WebGL 2

    gl.clearColor(0.53, 0.81, 0.92, 1.0);   // sky blue
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);  
}

// animation loop
var animate = function() {

    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.53, 0.81, 0.92, 1.0);   // sky blue
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    program.SetUniformToTextureUnit('desiredTexture', 1);
    mesh.Draw();
    requestAnimationFrame(animate);
}

// resizes canvas to fit browser window
var resize = function(canvas) {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width  !== displayWidth || canvas.height !== displayHeight) {
        // Make the canvas the same size
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
    }
}
