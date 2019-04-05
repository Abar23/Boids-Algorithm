precision mediump float;

varying vec2 fragTexCoord;
uniform sampler2D desiredTexture;

void main()
{
    gl_FragColor = texture2D(desiredTexture, fragTexCoord);

    if(gl_FragColor.a < 0.5)
    {
        discard;
    }
}
