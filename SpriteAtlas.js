class SpriteAtlas
{
    constructor(textureId, 
        textureHeight, 
        textureWidth, 
        numSpritesAlongX, 
        numSpritesAlongY)
    {
        this.textureAtlas = new Texture(textureId);
        this.spritesTextCoords = [];

        var spriteHeight = (textureHeight / numSpritesAlongY);
        var spriteWidth = (textureWidth /  numSpritesAlongX);

        var normalizedSpriteHeight = spriteHeight / textureHeight;
        var normalizedSpriteWidth = spriteWidth / textureWidth;
        
        this.GenerateAllSpriteTextCoords(numSpritesAlongX * numSpritesAlongY, normalizedSpriteHeight, normalizedSpriteWidth);
    }

    GenerateAllSpriteTextCoords(numberOfSprites, normalizedSpriteHeight, normalizedSpriteWidth)
    {
        var xPosition = 0;
        var yPosition = 0;
        for(let i = 0; i < numberOfSprites; i++)
        {
            var textCoords = [];
            // Top left corner
            textCoords.push(xPosition);
            textCoords.push(yPosition);
            // Top right corner
            textCoords.push(xPosition + normalizedSpriteWidth);
            textCoords.push(yPosition);
            // Bottom left corner
            textCoords.push(xPosition);
            textCoords.push(yPosition + normalizedSpriteHeight);
            // Bottom right corner
            textCoords.push(xPosition + normalizedSpriteWidth);
            textCoords.push(yPosition + normalizedSpriteHeight);

            this.spritesTextCoords.push(textCoords);
            
            xPosition += normalizedSpriteWidth;
            
            if(xPosition >= 1)
            {
                xPosition = 0;
                yPosition += normalizedSpriteHeight;
            }
        }
    }

    GetTextCoordsForSprite(spriteIndex)
    {
        return this.spritesTextCoords[spriteIndex];
    }
}