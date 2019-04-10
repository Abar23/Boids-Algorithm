class Flock
{
    constructor(numberOfBoids, shaderProgram)
    {
        this.spriteAtlas1 = new SpriteAtlas("duckhunt1-image", 400, 240, 3, 5);
        this.spriteAtlas2 = new SpriteAtlas("duckhunt2-image", 400, 240, 3, 5);
        this.spriteAtlas3 = new SpriteAtlas("duckhunt3-image", 400, 240, 3, 5);
        this.spriteAtlas4 = new SpriteAtlas("duckhunt4-image", 400, 240, 3, 5);
        this.spriteAtlas5 = new SpriteAtlas("duckhunt5-image", 400, 240, 3, 5);
        this.spriteAtlas6 = new SpriteAtlas("duckhunt6-image", 400, 240, 3, 5);
        this.spriteAtlas7 = new SpriteAtlas("duckhunt7-image", 400, 240, 3, 5);
        this.spriteAtlas8 = new SpriteAtlas("duckhunt8-image", 400, 240, 3, 5);
        this.spriteAtlas9 = new SpriteAtlas("duckhunt9-image", 400, 240, 3, 5);
        this.spriteAtlas10 = new SpriteAtlas("duckhunt10-image", 400, 240, 3, 5);

        this.shader = shaderProgram;
        this.boids = [];
        for(let i = 0; i < numberOfBoids; i++)
        {
            this.AddBoid(i);
        }
        
        canvas.addEventListener('mousedown', function(evt) 
        {
            if (evt.button == 0) 
            {
                flock.AddBoid(flock.boids.length);
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

    Draw()
    {
        for(let i = 0; i < this.boids.length; i++)
        {
            this.boids[i].Draw(this.shader);
        }
    }

    RandomValueBetween(minimumValue, maximumValue)
    {
        return Math.floor(Math.random() * (maximumValue - minimumValue + 1)) + minimumValue;
    }

    AddBoid(index)
    {
        var num = this.RandomValueBetween(1, 10);
        switch(num) 
        {
            case 1:
                this.boids[index] = new Boid(this.shader, this.spriteAtlas1);
                break;
            case 2:
                this.boids[index] = new Boid(this.shader, this.spriteAtlas2);
                break;
            case 3:
                this.boids[index] = new Boid(this.shader, this.spriteAtlas3);
                break;
            case 4:
                this.boids[index] = new Boid(this.shader, this.spriteAtlas4);
                break;
            case 5:
                this.boids[index] = new Boid(this.shader, this.spriteAtlas5);
                break;
            case 6:
                this.boids[index] = new Boid(this.shader, this.spriteAtlas6);
                break;
            case 7:
                this.boids[index] = new Boid(this.shader, this.spriteAtlas7);
                break;
            case 8:
                this.boids[index] = new Boid(this.shader, this.spriteAtlas8);
                break;
            case 9:
                this.boids[index] = new Boid(this.shader, this.spriteAtlas9);
                break;
            case 10:
                this.boids[index] = new Boid(this.shader, this.spriteAtlas10);
                break;
            default:
                this.boids[index] = new Boid(this.shader, this.spriteAtlas1);
                break;
        }
    }
}