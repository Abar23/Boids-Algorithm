
const DUCK_1 = 0;
const DUCK_2 = 1;
const DUCK_3 = 2;
const DUCK_4 = 3;
const DUCK_5 = 4;
const DUCK_6 = 5;
const DUCK_7 = 6;
const DUCK_8 = 7;
const DUCK_9 = 8;

class Factory 
{
    constructor(spriteAtlas)
    {
        this.spriteAtlas = spriteAtlas;
    }

    GetTextCoords(desiredNumberOfAdvances)
    {
        this.spriteAtlas.AdvanceAndGenerate(desiredNumberOfAdvances);
        return this.spriteAtlas.GetTextCoords();
    }

    BindAtlas(textureUnit)
    {
        this.spriteAtlas.textureAtlas.BindTexture(textureUnit);
    }

    UnbindAtlas()
    {
        this.spriteAtlas.textureAtlas.UnbindTexture();
    }
}