const TWO_PI = 2 * Math.PI;
const PI_OVER_TWO = Math.PI / 2;
const PI_OVER_FOUR = Math.PI / 4;
const RAD_TO_DEGREES_RATIO = 180 / Math.PI;
const DEGREES_TO_RAD_RATIO = Math.PI / 180;

const BOUNDARY_BOTTOM_CORNER_X = -27;
const BOUNDARY_BOTTOM_CORNER_Y = -15;
const BOUNDARY_TOP_CORNER_X = 27;
const BOUNDARY_TOP_CORNER_Y = 15;
const VIEWING_CYLINDER_RADIUS = 20;

var canvas, 
    gl, 
    program,
    texture, 
    vec3, 
    mat4, 
    projectionMatrix, 
    viewMatrix,
    aspectRatio,
    planeToCylinderMapper;

var flock, cloudBatch;
var frameData, vrDisplay, normalSceneFrame, vrSceneFrame, curOrient;
var btn = document.querySelector('.stop-start');

// start() is the main function that gets called first by index.html
var start = function() {
    
    initCanvas();

    vec3 = glMatrix.vec3;
    mat4 = glMatrix.mat4;
    aspectRatio = canvas.width / canvas.height;

    planeToCylinderMapper = new PlaneToCylinderMapper(
        BOUNDARY_BOTTOM_CORNER_X, 
        BOUNDARY_BOTTOM_CORNER_Y, 
        BOUNDARY_TOP_CORNER_X, 
        BOUNDARY_TOP_CORNER_Y, 
        VIEWING_CYLINDER_RADIUS);

    program = new Shader('vertShader', 'fragShader');
    program.UseProgram();

    flock = new Flock(50, program);
    cloudBatch = new CloudBatch(30, program);

    drawScene();
    //requestAnimationFrame(drawScene);

    if(navigator.getVRDisplays) {
        console.log('WebVR 1.1 supported');
        frameData = new VRFrameData();
        // Then get the displays attached to the computer
        navigator.getVRDisplays().then(function(displays) {
            // If a display is available, use it to present the scene
            if(displays.length > 0) {
                vrDisplay = displays[0];
                console.log('Display found');
                // Starting the presentation when the button is clicked: It can only be called in response to a user gesture
                btn.addEventListener('click', function() {
                    if(btn.textContent === 'Start VR') {
                        btn.textContent = 'Exit VR';

                        vrDisplay.requestPresent([{ source: canvas }]).then(function() {
                            console.log('Presenting to WebVR display');

                            // Set the canvas size to the size of the vrDisplay viewport

                            var leftEye = vrDisplay.getEyeParameters('left');
                            var rightEye = vrDisplay.getEyeParameters('right');

                            canvas.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
                            canvas.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);

                            // stop the normal presentation, and start the vr presentation
                            window.cancelAnimationFrame(normalSceneFrame);
                            drawVRScene();
                        });
                    } else {
                        btn.textContent = 'Start VR';

                        vrDisplay.exitPresent();
                        console.log('Stopped presenting to WebVR display');

                        // Stop the VR presentation, and start the normal presentation
                        vrDisplay.cancelAnimationFrame(vrSceneFrame);
                        drawScene();
                    }
                });
            }
        });
    } else {
        console.log('WebVR API not supported by this browser.');
    }
};

// starts the canvas and gl
var initCanvas = function() {
	canvas = document.getElementById('game-surface');
    gl = canvas.getContext('webgl2');   // WebGL 2

    gl.clearColor(0.53, 0.81, 0.92, 1.0);   // sky blue
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	//gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
    //gl.cullFace(gl.BACK); 
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); 
}

// regular animation loop
var drawScene = function() {
    normalSceneFrame = window.requestAnimationFrame(drawScene);

    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.53, 0.81, 0.92, 1.0);   // sky blue
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4, aspectRatio, 0.01, 100);
    
    viewMatrix = mat4.create();
    mat4.translate(viewMatrix, viewMatrix, vec3.fromValues(0, 0, -17.5));

    program.SetUniformMatrix4fv('mView', viewMatrix);
    program.SetUniformMatrix4fv('mProj', projectionMatrix);
    
    flock.Update();
    cloudBatch.Update();

    flock.Draw();
    cloudBatch.Draw();
}

// WebVR animation loop
var drawVRScene = function() {
    vrSceneFrame = vrDisplay.requestAnimationFrame(drawVRScene);
    vrDisplay.getFrameData(frameData);
    var curFramePose = frameData.pose;
    var curPos = curFramePose.position;
    curOrient = curFramePose.orientation;

    gl.clearColor(0.53, 0.81, 0.92, 1.0);   // sky blue
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    flock.Update();
    cloudBatch.Update();

    // left eye
    gl.viewport(0, 0, canvas.width * 0.5, canvas.height);
    program.SetUniformMatrix4fv('mView', frameData.leftViewMatrix);
    program.SetUniformMatrix4fv('mProj', frameData.leftProjectionMatrix);
    drawGeometry();

    // right eye
    gl.viewport(canvas.width * 0.5, 0, canvas.width * 0.5, canvas.height);
    program.SetUniformMatrix4fv('mView', frameData.rightViewMatrix);
    program.SetUniformMatrix4fv('mProj', frameData.rightProjectionMatrix);
    drawGeometry();

    function drawGeometry() {
        projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix, Math.PI / 4, aspectRatio, 0.01, 100);
        viewMatrix = mat4.create();
        mat4.translate(viewMatrix, viewMatrix, vec3.fromValues(0.0 - (curPos[0] * 25) + (curOrient[1] * 25), 
                                                               5.0 - (curPos[1] * 25) - (curOrient[0] * 25), 
                                                               0.0 - (curPos[2] * 25)));
        flock.Draw();
        cloudBatch.Draw();
    }

    vrDisplay.submitFrame();
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
