var verts = [-0.5, -0.5, 0.0, 1.0, 0.0, 
    0.5, -0.5, 0.0, 0.0, 0.0,
    0.0,  0.5, 0.0, 0.5, 0.5];

var indices = [0, 1, 2];

class Boid
{
    constructor(shaderProgram) 
    {
        this.mesh = new Mesh(verts, indices, shaderProgram);
        this.acceleration = vec3.create();
        this.velocity = vec3.create();
        this.position = vec3.create();
        this.maxSpeed = 5;
        this.maxSteeringForce = 1;
        this.modelMatrix = mat4.create();
    }

    Update()
    {
        vec3.add(this.velocity, this.velocity, this.acceleration);



    }

    Limit(vector, max)
    {
        if (vec3.length(vector) > max)
        {
            var scaleRatio = this.maxSpeed / vec3.length(this.velocity);
            
        }
    }

}

