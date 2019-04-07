
const DUCK_ANIMATION_1 = 0;
const DUCK_ANIMATION_2 = 3;
const DUCK_ANIMATION_3 = 6;
const DUCK_ANIMATION_4 = 9;
const DUCK_ANIMATION_5 = 12;
const NUM_ANIMATION_FRAMES = 3;
const NUM_MILLIS_PER_FRAME = 100;

class DuckAnimator 
{
    constructor(spriteAtlas, mesh)
    {
        this.startingFrame = 0;
        this.currentFrame = 0;
        this.spriteAtlas = spriteAtlas;
        this.timer = new Timer();
        this.elapesTime = 0;
    }

    Update(mesh)
    {
        this.elapesTime += this.timer.GetTimeInMillis();

        if(this.elapesTime > NUM_MILLIS_PER_FRAME)
        {
            this.currentFrame++;
            if(this.currentFrame == NUM_ANIMATION_FRAMES)
            {
                this.currentFrame = 0;
            }
            this.elapesTime = 0;

            mesh.RefillTextCoords(this.GetTextCoords());
        }
    }

    ChangeAnimation(newAnimationFrame)
    {
        this.startingFrame = newAnimationFrame;
    }

    GetTextCoords()
    {
        return this.spriteAtlas.GetTextCoordsForSprite(this.currentFrame + this.startingFrame);
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