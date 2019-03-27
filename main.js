
var canvas, gl, vertexShader, fragmentShader, program;

// start() is the main function that gets called first by index.html
var start = function() {
    initShaders();
    initCanvas();

};

// loads the shader text and calls createShaders to initialize shaders
var initShaders = function() {
    loadTextResource('./Shaders/vertexShader.glsl', function (vertexError, vertexText) {
		if (vertexError) {
			alert('Fatal error getting vertex shader (see console)');
			console.error(vertexError);
		} else {
			loadTextResource('./Shaders/fragmentShader.glsl', function (fragmentError, fragmentText) {
				if (fragmentError) {
					alert('Fatal error getting fragment shader (see console)');
					console.error(fragmentError);
				} else {
                    createShaders(vertexText, fragmentText);
				}
			});
		}
	});
};

// compiles shaders and creates program
var createShaders = function(vertexText, fragmentText) {
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
	fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexText);
	gl.shaderSource(fragmentShader, fragmentText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
    }

    program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
    }
    
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}
}

// starts the canvas
var initCanvas = function(vertexText, fragmentText) {
	canvas = document.getElementById('game-surface');
    gl = canvas.getContext('webgl2');   // WebGL 2
    
    gl.clearColor(0.53, 0.81, 0.92, 1.0);   // sky blue
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);  
}
