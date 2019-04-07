var verts = [-1.0,  1.0, 0.0,
              1.0,  1.0, 0.0,
             -1.0, -1.0, 0.0, 
              1.0, -1.0, 0.0];

var indices = [0, 2, 1,
               1, 2, 3];

const TWO_PI = 2 * Math.PI;
const PI_OVER_TWO = Math.PI / 2;
const PI_OVER_FOUR = Math.PI / 4;
const RAD_TO_DEGREES_RATIO = 180 / Math.PI;
const DEGREES_TO_RAD_RATIO = Math.PI / 180;

class Boid
{
    constructor(shaderProgram, spriteAtlas) 
    {
        this.spriteAtlas = spriteAtlas;
        this.animator = new DuckAnimator(this.spriteAtlas, this.mesh);
        this.mesh = new Mesh(verts, this.animator.GetTextCoords(), indices, shaderProgram);
        this.acceleration = vec3.create();
        this.velocity = vec3.fromValues(this.RandomValueBetween(-1, 1), this.RandomValueBetween(-1, 1), 0);
        this.position = vec3.create();
        this.maxSpeed = 0.2;
        this.maxSteeringForce = 0.01;
        this.modelMatrix;
    }

    RandomValueBetween(minimumValue, maximumValue)
    {
        return Math.random() * (maximumValue - minimumValue + 1) + minimumValue;
    }

    Update()
    {
        vec3.add(this.velocity, this.velocity, this.acceleration);
        this.Limit(this.velocity, this.maxSpeed);
        vec3.add(this.position, this.position, this.velocity);
        vec3.set(this.acceleration, 0, 0, 0);

        var headingAngle = Math.atan2(this.velocity[1], this.velocity[0]) * RAD_TO_DEGREES_RATIO;
        var evaluationAngle = Math.abs(headingAngle);
        if(evaluationAngle > 0 && evaluationAngle < 30)
        {
            this.animator.ChangeAnimation(DUCK_ANIMATION_1);
            headingAngle = (headingAngle) * DEGREES_TO_RAD_RATIO;
        }
        else if(evaluationAngle > 30 && evaluationAngle < 60)
        {
            this.animator.ChangeAnimation(DUCK_ANIMATION_2);
            if(headingAngle < 0)
            {
                headingAngle = ((headingAngle + 30) * DEGREES_TO_RAD_RATIO) + (-2 * PI_OVER_FOUR);
            }
            else
            {
                headingAngle = (headingAngle - 30) * DEGREES_TO_RAD_RATIO;
            }
        }
        else if(evaluationAngle > 60 && evaluationAngle < 120)
        {
            this.animator.ChangeAnimation(DUCK_ANIMATION_3);
            if(headingAngle < 0)
            {
                headingAngle = Math.PI;
            }
            else
            {
                headingAngle = 0;
            }
        }
        else if(evaluationAngle > 120 && evaluationAngle < 150)
        {
            this.animator.ChangeAnimation(DUCK_ANIMATION_5);
            if(headingAngle < 0)
            {
                headingAngle = ((headingAngle + 120) * DEGREES_TO_RAD_RATIO) + (2 * PI_OVER_FOUR);
            }
            else
            {
                headingAngle = (headingAngle - 120) * DEGREES_TO_RAD_RATIO;
            }
        }
        else if(evaluationAngle > 150 && evaluationAngle < 180)
        {
            this.animator.ChangeAnimation(DUCK_ANIMATION_4);
            headingAngle = (headingAngle + 180) * DEGREES_TO_RAD_RATIO;
        }

        this.animator.Update(this.mesh);
        
        this.modelMatrix = mat4.create();
        this.modelMatrix[12] = this.position[0];
        this.modelMatrix[13] = this.position[1];
        this.modelMatrix[14] = this.position[2];
        mat4.rotate(this.modelMatrix, this.modelMatrix, headingAngle, vec3.fromValues(0, 0, 1));
        mat4.scale(this.modelMatrix, this.modelMatrix, vec3.fromValues(1.0, 1.0, 1.0));
    }

    Render(shaderProgram)
    {
        this.animator.BindAtlas(0);
        shaderProgram.SetUniformMatrix4fv('mWorld', this.modelMatrix);
        shaderProgram.SetUniformToTextureUnit('desiredTexture', 0);

        this.mesh.Draw();
        this.animator.UnbindAtlas();
    }

    Flock(boids)
    {
        var desiredSeparation = 1.5;
        var alignmentNeighborDistance = 3;
        var cohesionNeighborDistance = 3;
        var separationSteerVector = vec3.create();
        var alignmentSumVector = vec3.create();
        var cohesionSumVector = vec3.create();
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;

        for(let i = 0; i < boids.length; i++)
        {
            var dist = vec3.distance(this.position, boids[i].position);
            if (dist > 0 && dist < alignmentNeighborDistance)
            {
                vec3.add(alignmentSumVector, alignmentSumVector, boids[i].velocity);
                count1++;
            }

            if (dist > 0 && dist < cohesionNeighborDistance)
            {
                vec3.add(cohesionSumVector, cohesionSumVector, boids[i].velocity);
                count2++;
            }

            if (dist > 0 && dist < desiredSeparation)
            {
                var distanceVector = vec3.fromValues(dist, dist, dist);
                var diff = vec3.create();
                vec3.subtract(diff, this.position, boids[i].position);
                vec3.normalize(diff, diff);
                vec3.divide(diff, diff, distanceVector);
                vec3.add(separationSteerVector, separationSteerVector, diff);
                count3++;
            }
        }

        var separation = this.Separate(separationSteerVector, count1);
        var alignment = this.Align(alignmentSumVector, count2);
        var cohesion = this.Cohesion(cohesionSumVector, count3);
        vec3.multiply(separation, separation, vec3.fromValues(1.5, 1.5, 1.5));
        vec3.multiply(alignment, alignment, vec3.fromValues(1.0, 1.0, 1.0));
        vec3.multiply(cohesion, cohesion, vec3.fromValues(1.0, 1.0, 1.0));
        vec3.add(this.acceleration, this.acceleration, separation);
        vec3.add(this.acceleration, this.acceleration, alignment);
        vec3.add(this.acceleration, this.acceleration, cohesion);
    }

    Borders()
    {
        if(this.position[0] > 27)
        {
            this.position[0] = -27;
        }
        else if(this.position[0] < -27)
        {
            this.position[0] = 27;
        }
        else if(this.position[1] > 15)
        {
            this.position[1] = -15;
        }
        else if(this.position[1] < -15)
        {
            this.position[1] = 15;
        }
    }

    Run(boids, shaderProgram)
    {
        this.Flock(boids);
        this.Update();
        this.Borders();
        this.Render(shaderProgram);
    }

    Separate(steerVector, count) 
    {
        if (count > 0)
        {
            var countVector = vec3.fromValues(count, count, count);
            vec3.divide(steerVector, steerVector, countVector);
        }

        if (vec3.length(steerVector) > 0)
        {
            var maxSpeedVector = vec3.fromValues(this.maxSpeed, this.maxSpeed, this.maxSpeed);
            vec3.normalize(steerVector, steerVector);
            vec3.multiply(steerVector, steerVector, maxSpeedVector);
            vec3.subtract(steerVector, steerVector, this.velocity);
            this.Limit(steerVector, this.maxSteeringForce);
        }

        return steerVector;
    }

    Align(sumVector, count)
    {
        var steerVector = vec3.create();
        if (count > 0)
        {
            var maxSpeedVector = vec3.fromValues(this.maxSpeed, this.maxSpeed, this.maxSpeed);
            var countVector = vec3.fromValues(count, count, count);
            vec3.divide(sumVector, sumVector, countVector);
            vec3.normalize(sumVector, sumVector);
            vec3.multiply(sumVector, sumVector, maxSpeedVector);
            vec3.subtract(steerVector, sumVector, this.velocity);
            this.Limit(steerVector, this.maxSteeringForce);
        }

        return steerVector;
    }

    Cohesion(sumVector, count) 
    {        
        var steerVector = vec3.create();
        if (count > 0)
        {
            var maxSpeedVector = vec3.fromValues(this.maxSpeed, this.maxSpeed, this.maxSpeed);
            var countVector = vec3.fromValues(count, count, count);
            vec3.divide(sumVector, sumVector, countVector);

            var desired = vec3.create();
            vec3.subtract(desired, sumVector, this.position);
            vec3.normalize(desired, desired);
            vec3.multiply(desired, desired, maxSpeedVector);

            vec3.subtract(steerVector, desired, this.velocity);
            this.Limit(steerVector, this.maxSteeringForce);
        }

        return steerVector;
    }

    Limit(vector, max)
    {
        if (vec3.length(vector) > max)
        {
            var scaleRatio = max / vec3.length(vector);
            vec3.scale(vector, vector, scaleRatio);
        }
    }
}

