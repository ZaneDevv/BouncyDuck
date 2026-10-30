// ------------------------------------------------------------------
// METHODS
// ------------------------------------------------------------------

export function run(event)
{
    const alpha = event.alpha;
    document.querySelectorAll("main")[0].innerHTML = alpha;
}