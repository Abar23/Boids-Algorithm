class Texture
{
    constructor(imageId)
    {
        // Tell WebGL to create a texture buffer/object
        this.texture = gl.createTexture();
        // Bind the texture
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        // Place the image data into the texture buffer/object
        gl.texImage2D(
            gl.TEXTURE_2D, 
            0,
            gl.RGBA, 
            gl.RGBA, 
            gl.UNSIGNED_BYTE,
            document.getElementById(imageId)
        );
        // Create mipmap for the texture
        gl.generateMipmap(gl.TEXTURE_2D);

        //Set texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    UnbindTexture()
    {
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    BindTexture(textureUnit)
    {
        gl.activeTexture(gl.TEXTURE0 + textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }

    GetTexture()
    {
        return this.texture;
    }
}