class SpriteAtlas
{
    constructor(textureId, 
        textureHeight, 
        textureWidth, 
        numSpritesAlongX, 
        numSpritesAlongY)
    {
        this.textureAtlas = new Texture(textureId);

        this.numSpritesAlongX = numSpritesAlongX;
        this.numSpritesAlongY = numSpritesAlongY;

        var spriteHeight = (textureHeight / this.numSpritesAlongY);
        var spriteWidth = (textureWidth /  this.numSpritesAlongX);

        this.normalizedSpriteHeight = spriteHeight / textureHeight;
        this.normalizedSpriteWidth = spriteWidth / textureWidth;
        
        this.numAdvances = (textureHeight * textureWidth) / (spriteHeight * spriteWidth);

        this.startPoint = [0, 0];
        this.textCords = [];

        this.GenerateTextCoords();
    }

    AdvanceAndGenerate(desiredNumberOfAdvances)
    {
        if(desiredNumberOfAdvances > this.numAdvances || desiredNumberOfAdvances < 0)
        {
            desiredNumberOfAdvances = 0;
        }

        var xPosition = this.startPoint[0];
        var yPosition = this.startPoint[1];
        for(let i = 0; i < desiredNumberOfAdvances; i++)
        {
            xPosition += this.normalizedSpriteWidth;
            
            if(xPosition >= 1)
            {
                xPosition = 0;
                yPosition += this.normalizedSpriteHeight;
            }
        }

        this.startPoint[0] = xPosition;
        this.startPoint[1] = yPosition;

        this.GenerateTextCoords();

        this.startPoint[0] = 0;
        this.startPoint[1] = 0;
    }

    GenerateTextCoords()
    {
        var startPointX = this.startPoint[0];
        var startPointY = this.startPoint[1];
        // Top left corner
        this.textCords[0] = startPointX;
        this.textCords[1] = startPointY;
        // Top right corner
        this.textCords[2] = startPointX + this.normalizedSpriteWidth;
        this.textCords[3] = startPointY;
        // Bottom left corner
        this.textCords[4] = startPointX;
        this.textCords[5] = startPointY + this.normalizedSpriteHeight;
        // Bottom right corner
        this.textCords[6] = startPointX + this.normalizedSpriteWidth;
        this.textCords[7] = startPointY + this.normalizedSpriteHeight;
    }

    GetTextCoords()
    {
        return this.textCords;
    }
}