// ------------------------------------------------------------------
// CONSTANTS
// ------------------------------------------------------------------

const DELTA_TIME = 1 / 45;

// ------------------------------------------------------------------
// VARIABLES
// ------------------------------------------------------------------

const gravity = {x: 0, y: 1};

const velocity = {x: 0, y: 0};
const position = {x: 0, y: 0};

// ------------------------------------------------------------------
// METHODS
// ------------------------------------------------------------------

/**
 * Computes the new gravity's direction according to the given angle
 * @param {Number} angle Gravity's direction angle
 * @author Álvaro Fernández Barrero
 */
export function setGravityDirectionByAngle(angle)
{
    gravity.x = Math.cos(angle);
    gravity.y = Math.sin(angle);
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
 * Updates the simulation. This method will be fired automatically once per frame
 * @author Álvaro Fernández Barrero
 */
function update()
{
    velocity.x += gravity.x * DELTA_TIME;
    velocity.y += gravity.y * DELTA_TIME;

    position.x += velocity.x * DELTA_TIME;
    position.y += velocity.y * DELTA_TIME;

    duck.style.left = `${position.x}px`;
    duck.style.top = `${position.y}px`;
}