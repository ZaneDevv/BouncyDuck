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
                const p = document.createElement("p");
                p.innerHTML = "Request rejected";
                document.querySelectorAll("body")[0].appendChild(p);

                console.error('Request to access the orientation was rejected');
            }
            })
            .catch(console.error);
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