
var textCoords = [0, 0, 1, 0, 0, 1, 1, 1];

class Cloud
{
    constructor(shaderProgram, textureId, scale)
    {
        this.texture = new Texture(textureId);
        this.mesh = new Mesh(verts, textCoords, indices, shaderProgram);
        this.modelMatrix = mat4.create();
        this.scale = scale;
        this.maxSpeed = 0.2;
        this.position = vec3.fromValues(this.RandomValueBetween(-20, 20), this.RandomValueBetween(-20, 20), 0);
        var x = this.RandomValueBetween(-0.03, 0.03);
        this.velocity = vec3.fromValues(x, 0, 0);
    }

    Run(shaderProgram)
    {
        this.Update();
        this.Borders();
        this.Render(shaderProgram);
    }

    Update()
    {
        vec3.add(this.position, this.position, this.velocity);
        this.modelMatrix = mat4.create();
        this.modelMatrix[12] = this.position[0];
        this.modelMatrix[13] = this.position[1];
        this.modelMatrix[14] = this.position[2];
        mat4.scale(this.modelMatrix, this.modelMatrix, vec3.fromValues(this.scale, this.scale, this.scale));
    }

    Render(shaderProgram)
    {
        this.texture.BindTexture(0);
        shaderProgram.SetUniformMatrix4fv('mWorld', this.modelMatrix);
        shaderProgram.SetUniformToTextureUnit('desiredTexture', 0);
        this.mesh.Draw();
        this.texture.UnbindTexture();
    }

    Borders()
    {
        if(this.position[0] > 27)
        {
            this.position[0] = -27;
        }
        else if(this.position[0] < -27)
        {
            this.position[0] = 27;
        }
        else if(this.position[1] > 15)
        {
            this.position[1] = -15;
        }
        else if(this.position[1] < -15)
        {
            this.position[1] = 15;
        }
    }

    RandomValueBetween(minimumValue, maximumValue)
    {
        return (Math.random() * (maximumValue - minimumValue)) + minimumValue;
    }

}