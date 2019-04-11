class PlaneToCylinderMapper
{
    constructor(bottomLeftX, bottomLeftY, topRightX, topRightY, cylinderRadius)
    {
        this.bottomLeftX = bottomLeftX;
        this.bottomLeftY = bottomLeftY;
        this.topRightX = topRightX;
        this.topRightY = topRightY;
        this.radius = cylinderRadius;
    }

    ConvertPlaneCoordsToCylinder(planeCoords)
    {
        var cylinderCoords = vec3.create();

        var theta = this.GetAngle(planeCoords[0]);
        cylinderCoords[0] = this.radius * Math.cos(theta);
        cylinderCoords[1] = planeCoords[1];
        cylinderCoords[2] = this.radius * Math.sin(theta);

        return cylinderCoords;
    }

    GetAngle(value)
    {
        return (value - this.bottomLeftX) / (this.topRightX - this.bottomLeftX) * (TWO_PI);
    }
}