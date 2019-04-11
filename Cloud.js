
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
        this.position = vec3.fromValues(this.RandomValueBetween(-20, 20), this.RandomValueBetween(-20, 20), -12.5);
        var x = this.RandomValueBetween(-0.03, 0.03);
        this.velocity = vec3.fromValues(x, 0, 0);
    }

    Run()
    {
        this.Update();
        this.AvoidEdges();
    }

    Update()
    {
        vec3.add(this.position, this.position, this.velocity);
        this.modelMatrix = mat4.create();

        if(btn.textContent === "Exit VR")
        {   
            var cylinderCoords = planeToCylinderMapper.ConvertPlaneCoordsToCylinder(this.position);

            this.modelMatrix[12] = cylinderCoords[0];
            this.modelMatrix[13] = cylinderCoords[1];
            this.modelMatrix[14] = cylinderCoords[2];

            var angle = planeToCylinderMapper.GetAngle(this.position[0]) + PI_OVER_TWO;
            mat4.rotate(this.modelMatrix, this.modelMatrix, -angle, vec3.fromValues(0, 1, 0));
        }
        else if(btn.textContent === "Start VR")
        {
            this.modelMatrix[12] = this.position[0];
            this.modelMatrix[13] = this.position[1];
            this.modelMatrix[14] = this.position[2];
        }
        
        mat4.scale(this.modelMatrix, this.modelMatrix, vec3.fromValues(this.scale, this.scale, this.scale));
    }

    Draw(shaderProgram)
    {
        this.texture.BindTexture(0);
        shaderProgram.SetUniformMatrix4fv('mWorld', this.modelMatrix);
        shaderProgram.SetUniformToTextureUnit('desiredTexture', 0);
        this.mesh.Draw();
        this.texture.UnbindTexture();
    }

    AvoidEdges()
    {
        if(this.position[0] > BOUNDARY_TOP_CORNER_X)
        {
            this.position[0] = BOUNDARY_BOTTOM_CORNER_X;
        }
        else if(this.position[0] < BOUNDARY_BOTTOM_CORNER_X)
        {
            this.position[0] = BOUNDARY_TOP_CORNER_X;
        }
        else if(this.position[1] > BOUNDARY_TOP_CORNER_Y)
        {
            this.position[1] = BOUNDARY_BOTTOM_CORNER_Y;
        }
        else if(this.position[1] < BOUNDARY_BOTTOM_CORNER_Y)
        {
            this.position[1] = BOUNDARY_TOP_CORNER_Y;
        }
    }

    RandomValueBetween(minimumValue, maximumValue)
    {
        return (Math.random() * (maximumValue - minimumValue)) + minimumValue;
    }

}