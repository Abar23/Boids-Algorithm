class Timer
{
    constructor()
    {
        this.startingTime = new Date();
    }

    GetTimeInMillis()
    {
        var endingTime = new Date();
        var elapedTime = endingTime - this.startingTime;
        this.startTime = endingTime;
        Math.round(elapedTime);

        return elapedTime;
    }
}