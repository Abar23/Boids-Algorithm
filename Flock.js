class Flock
{
    constructor(numberOfBoids, shaderProgram)
    {
        this.spriteAtlas1 = new SpriteAtlas("duckhunt1-image", 400, 240, 3, 5);
        this.spriteAtlas2 = new SpriteAtlas("duckhunt2-image", 400, 240, 3, 5);
        this.spriteAtlas3 = new SpriteAtlas("duckhunt3-image", 400, 240, 3, 5);

        this.shader = shaderProgram;
        this.boids = [];
        for(let i = 0; i < numberOfBoids; i++)
        {
            var num = this.RandomValueBetween(1, 3);
            switch(num) 
            {
                case 1:
                    this.boids[i] = new Boid(this.shader, this.spriteAtlas1);
                    break;
                case 2:
                    this.boids[i] = new Boid(this.shader, this.spriteAtlas2);
                    break;
                case 3:
                    this.boids[i] = new Boid(this.shader, this.spriteAtlas3);
                    break;
                default:
                    this.boids[i] = new Boid(this.shader, this.spriteAtlas1);
                    break;
            }
        }

        canvas.addEventListener('mousedown', function(evt) 
        {
            if (evt.button == 0) 
            {
                flock.AddBoid();
            }
        });
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

    AddBoid()
    {
        var num = this.RandomValueBetween(1, 3);
        switch(num) 
        {
            case 1:
                this.boids[this.boids.length] = new Boid(this.shader, this.spriteAtlas1);
                break;
            case 2:
                this.boids[this.boids.length] = new Boid(this.shader, this.spriteAtlas2);
                break;
            case 3:
                this.boids[this.boids.length] = new Boid(this.shader, this.spriteAtlas3);
                break;
            default:
                this.boids[this.boids.length] = new Boid(this.shader, this.spriteAtlas1);
                break;
        }
    }
}