class Flock
{
    constructor(numberOfBoids, shaderProgram)
    {
        this.shader = shaderProgram;
        this.boids = [];
        for(let i = 0; i < numberOfBoids; i++)
        {
            this.boids[i] = new Boid(this.shader);
        }
    }

    Update()
    {
        for(let i = 0; i < this.boids.length; i++)
        {
            this.boids[i].Run(this.boids, this.shader);
        }
    }

    // Might add AddBoidsFunction
}