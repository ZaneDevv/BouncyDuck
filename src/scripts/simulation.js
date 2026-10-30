// ------------------------------------------------------------------
// CONSTANTS
// ------------------------------------------------------------------

const DELTA_TIME = 1 / 45;

const GRAVITY_FORCE = 12;
const COLLISION_FORCE = 17;
const FRICTION_FORCE = 0.01;

// ------------------------------------------------------------------
// VARIABLES
// ------------------------------------------------------------------

const gravity = {x: 0, y: GRAVITY_FORCE};

const size = 100;
const velocity = {x: 0, y: 0};
const position = {x: 0, y: 0};

// ------------------------------------------------------------------
// METHODS
// ------------------------------------------------------------------

/**
 * 
 * @returns 
 * @author Álvaro Fernández Barrero
 */
function getHorizontalCollisionDetection()
{
    return position.x < 0 ? 1 : position.x > (screen.width - size) ? -1 : 0;
}

/**
 * 
 * @returns 
 * @author Álvaro Fernández Barrero
 */
function getVerticalCollisionDetection()
{
    return position.y < 0 ? 1 : position.y > (screen.height - size) ? -1 : 0;
}

/**
 * Applies the impulses to the duck
 * @author Álvaro Fernández Barrero
 */
function applyImpulses()
{
    velocity.x += getHorizontalCollisionDetection() * COLLISION_FORCE;
    velocity.y += getVerticalCollisionDetection() * COLLISION_FORCE;
}

/**
 * Apply friction to the duck
 * @author Álvaro Fernández Barrero
 */
function applyFriction()
{
    velocity.x -= velocity.x * FRICTION_FORCE * DELTA_TIME;
    velocity.y -= velocity.y * FRICTION_FORCE * DELTA_TIME;
}

/**
 * Computes the new gravity's direction according to the given angle
 * @param {Number} angle Gravity's direction angle
 * @author Álvaro Fernández Barrero
 */
export function setGravityDirectionByAngle(angle)
{
    gravity.x = GRAVITY_FORCE * Math.cos(angle);
    gravity.y = GRAVITY_FORCE * Math.sin(angle);
}

/**
 * Initializes the simulation
 * @author Álvaro Fernández Barrero
 */
export function initialize()
{
    duck.style.display = "block";
    setInterval(update, DELTA_TIME);
}

/**
 * Updates the duck's transform
 * @author Álvaro Fernández Barrero
 */
function updateTransform()
{
    velocity.x += gravity.x * DELTA_TIME;
    velocity.y += gravity.y * DELTA_TIME;

    position.x += velocity.x * DELTA_TIME;
    position.y += velocity.y * DELTA_TIME;

    duck.style.left = `${position.x}px`;
    duck.style.top = `${position.y}px`;
}

/**
 * Updates the simulation. This method will be fired automatically once per frame
 * @author Álvaro Fernández Barrero
 */
function update()
{
    applyFriction();
    applyImpulses();
    updateTransform();
}