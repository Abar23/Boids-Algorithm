class Flock
{
    constructor(numberOfBoids, shaderProgram)
    {
        this.factory1 = new Factory(new SpriteAtlas("duckhunt1-image", 240, 240, 3, 3));
        this.factory2 = new Factory(new SpriteAtlas("duckhunt2-image", 240, 240, 3, 3));
        this.factory3 = new Factory(new SpriteAtlas("duckhunt3-image", 240, 240, 3, 3));

        this.shader = shaderProgram;
        this.boids = [];
        for(let i = 0; i < numberOfBoids; i++)
        {
            var num = this.RandomValueBetween(1, 3);
            switch(num) 
            {
                case 1:
                    this.boids[i] = new Boid(this.shader, this.factory1);
                    break;
                case 2:
                    this.boids[i] = new Boid(this.shader, this.factory2);
                    break;
                case 3:
                    this.boids[i] = new Boid(this.shader, this.factory3);
                    break;
                default:
                    this.boids[i] = new Boid(this.shader, this.factory1);
                    break;
            }
        }
    }

    Update()
    {
        for(let i = 0; i < this.boids.length; i++)
        {
            this.boids[i].Run(this.boids, this.shader);
        }
    }

    RandomValueBetween(minimumValue, maximumValue)
    {
        return Math.floor(Math.random() * (maximumValue - minimumValue + 1)) + minimumValue;
    }

    // Might add AddBoidsFunction
}