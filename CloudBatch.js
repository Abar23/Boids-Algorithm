class CloudBatch
{
    constructor(numberOfClouds, shaderProgram)
    {
        this.shader = shaderProgram;
        this.clouds = [];
        for(let i = 0; i < numberOfClouds; i++)
        {
            var num = this.RandomValueBetween(1, 3);
            switch(num) 
            {
                case 1:
                    this.clouds[i] = new Cloud(this.shader, "cloud1-image", this.RandomValueBetween(1, 3));
                    break;
                case 2:
                    this.clouds[i] = new Cloud(this.shader, "cloud2-image", this.RandomValueBetween(1, 3));
                    break;
                case 3:
                    this.clouds[i] = new Cloud(this.shader, "cloud3-image", this.RandomValueBetween(1, 3));
                    break;
                default:
                    this.clouds[i] = new Cloud(this.shader, "cloud3-image", this.RandomValueBetween(1, 3));
                    break;
            }
        }
    }

    Update()
    {
        for(let i = 0; i < this.clouds.length; i++)
        {
            this.clouds[i].Run();
        }
    }

    Draw()
    {
        for(let i = 0; i < this.clouds.length; i++)
        {
            this.clouds[i].Draw(this.shader);
        }
    }

    RandomValueBetween(minimumValue, maximumValue)
    {
        return Math.floor(Math.random() * (maximumValue - minimumValue + 1)) + minimumValue;
    }
}