var canvas, 
    gl, 
    program,
    texture, 
    vec3, 
    mat4, 
    projectionMatrix, 
    viewMatrix,
    aspectRatio;

var flock;

// start() is the main function that gets called first by index.html
var start = function() {
    
    initCanvas();

    vec3 = glMatrix.vec3;
    mat4 = glMatrix.mat4;
    aspectRatio = canvas.width / canvas.height;
    
    program = new Shader('vertShader', 'fragShader');
    program.UseProgram();

    texture = new Texture("duckhunt1-image");
    texture.BindTexture(0);

    flock = new Flock(100, program);

    projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4, aspectRatio, 0.01, 100);
    
    viewMatrix = mat4.create();
    mat4.translate(viewMatrix, viewMatrix, vec3.fromValues(0, 0, -30));

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
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); 
}

// animation loop
var animate = function() {

    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.53, 0.81, 0.92, 1.0);   // sky blue
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    program.SetUniformToTextureUnit('desiredTexture', 0);
    program.SetUniformMatrix4fv('mView', viewMatrix);
    program.SetUniformMatrix4fv('mProj', projectionMatrix);
    
    flock.Update();

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
        aspectRatio = displayWidth / displayHeight;
    }
}
