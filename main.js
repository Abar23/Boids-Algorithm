
var canvas, gl, program;

// start() is the main function that gets called first by index.html
var start = function() {
	initCanvas();
    initShaders();
    
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

// initializes the shaders
var initShaders = function() {

    program = gl.createProgram();

	var vertexShader = getShader(gl, "vertShader");
    var fragmentShader = getShader(gl, "fragShader");

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(program);
}

// animation loop
var animate = function() {

    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.53, 0.81, 0.92, 1.0);   // sky blue
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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
