
const DUCK_ANIMATION_1 = 0;
const DUCK_ANIMATION_2 = 3;
const DUCK_ANIMATION_3 = 6;
const DUCK_ANIMATION_4 = 9;
const DUCK_ANIMATION_5 = 12;
const NUM_ANIMATION_FRAMES = 3;
const NUM_MILLIS_PER_FRAME = 100;

class Factory 
{
    constructor(spriteAtlas)
    {
        this.startingFrame = 0;
        this.currentFrame = this.startingFrame;
        this.spriteAtlas = spriteAtlas;
        this.timer = new Timer();
        this.elapesTime = 0;
    }

    Update()
    {
        this.elapesTime += this.timer.GetTimeInMillis();

        if(this.elapesTime > NUM_MILLIS_PER_FRAME)
        {
            this.currentFrame++;
            if((this.currentFrame - this.startingFrame) > NUM_ANIMATION_FRAMES - 1)
            {
                this.currentFrame = this.startingFrame;;
            }
            this.elapesTime = 0;
        }

        return this.GetTextCoords();
    }

    ChangeAnimation(newAnimationFrame)
    {
        this.startingFrame = newAnimationFrame;
    }

    GetTextCoords()
    {
        this.spriteAtlas.AdvanceAndGenerate(this.currentFrame);
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