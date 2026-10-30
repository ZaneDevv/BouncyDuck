import { initialize, setGravityDirectionByAngle } from './simulation.js';

// ------------------------------------------------------------------
// VARIABLES
// ------------------------------------------------------------------

const mainElement = document.querySelectorAll("main")[0];

// ------------------------------------------------------------------
// METHODS
// ------------------------------------------------------------------

/**
 * Closes the menu that asks for permission to access to the phone's gyro
 * @author Álvaro Fernández Barrero
 */
function closeMenu()
{
    const accessMenu = document.getElementById("access-menu");
    accessMenu.style.display = "none";
}

/**
 * Starts running the simulation
 * @author Álvaro Fernández Barrero
 */
function startRunningSimulation()
{
    closeMenu();
    initialize();
    window.addEventListener('deviceorientation', event => setGravityDirectionByAngle(event.alpha));
}

/**
 * Attempts to enable the user's phone's gyro. Code modified from https://itnext.io/gyro-web-accessing-the-device-orientation-in-javascript-387da43eeb84
 * @author Álvaro Fernández Barrero & Oleksii Trekhleb
 */
function attemptToEnableGyro()
{
    if (typeof DeviceOrientationEvent.requestPermission === 'function')
    {
        // Handle iOS 13+ devices.
        DeviceOrientationEvent.requestPermission()
            .then((state) => {
                if (state === 'granted')
                    startRunningSimulation();

                else
                {
                    const message = "Request to access the orientation was rejected";

                    mainElement.innerHTML = message;
                    console.error(message);
                }
            })
            .catch(message => {
                mainElement.innerHTML = message;
                console.error(message);
            });
    }
    else
    {
        // Handle regular non iOS 13+ devices.
        startRunningSimulation();
    }
}

// ------------------------------------------------------------------
// EVENTS
// ------------------------------------------------------------------

window.onload = () => {
    const acceptButton = document.getElementById("accept-button");

    acceptButton.addEventListener("touchend", attemptToEnableGyro);
    acceptButton.addEventListener("click", attemptToEnableGyro);
}