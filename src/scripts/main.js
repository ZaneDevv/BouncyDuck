// ------------------------------------------------------------------
// METHODS
// ------------------------------------------------------------------

function initialize()
{
    const accessMenu = document.getElementById("access-menu");
    accessMenu.style.display = "none";
}

function attemptToEnableGyro()
{
    if (typeof DeviceMotionEvent.requestPermission === 'function')
    {
        // Handle iOS 13+ devices.
        DeviceMotionEvent.requestPermission()
            .then((state) => {
            if (state === 'granted')
            {
                window.addEventListener('devicemotion', initialize);
            }
            else
            {
                document.querySelectorAll("main")[0].innerHTML = "Request to access the orientation was rejected";
                console.error('Request to access the orientation was rejected');
            }
            })
            .catch(message => {
                console.error(message);
                document.querySelectorAll("main")[0].innerHTML = message;
            });
    }
    else
    {
        // Handle regular non iOS 13+ devices.
        window.addEventListener('devicemotion', handleOrientation);
    }
}

// ------------------------------------------------------------------
// EVENTS
// ------------------------------------------------------------------

window.onload = () => {
    const acceptButton = document.getElementById("accept-button");
    acceptButton.addEventListener("click", attemptToEnableGyro);
}