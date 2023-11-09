(function() {
  // Check if the overlay already exists
  if (document.getElementById('time-limit-overlay')) {
    return;
  }

  // Create the overlay
  const overlay = document.createElement('div');
  overlay.id = 'time-limit-overlay';
  overlay.style.position = 'fixed';
  overlay.style.left = 0;
  overlay.style.top = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  overlay.style.zIndex = '2147483647'; // Use a high z-index to ensure it's on top
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.textAlign = 'center';
  overlay.style.flexDirection = 'column';
  overlay.style.overflowY = 'scroll'; // In case your content is bigger than the screen

  // Inner HTML structure for the overlay
  overlay.innerHTML = `
    <div style="background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h1>Time Limit Reached</h1>
      <h2>You Lazy Cunt, get back to work</h2>
      <img src="DavidGoggins1.gif" alt="Trying my best to motivate myself" style="max-width: 100%; height: auto;">
    </div>
  `;

  // Append the overlay to the body
  document.body.appendChild(overlay);

  // Optionally, prevent scrolling on the body
  document.body.style.overflow = 'hidden';
})();

