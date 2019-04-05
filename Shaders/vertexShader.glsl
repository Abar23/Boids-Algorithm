precision mediump float;

attribute vec3 position;
attribute vec2 textCoord;
varying vec2 fragTexCoord;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
    fragTexCoord = textCoord;
    gl_Position = mProj * mView * mWorld * vec4(position, 1.0);
}
