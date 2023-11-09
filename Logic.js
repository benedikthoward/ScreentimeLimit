// Array to hold the number of seconds in the past 30 minutes (1800 seconds)
let pastHalfHour = new Array(1800).fill(0);
let currentIndex = 0; // Start at the first index

setInterval(() => {
  // Shift the array every second to make room for the new second
  currentIndex = (currentIndex + 1) % 1800;
  pastHalfHour[currentIndex] = 0; // Reset the current second count

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0] && tabs[0].url) {
      let url = new URL(tabs[0].url);

      // Check if the user is on a restricted site
      if (url.host.includes("instagram.com") || url.host.includes("youtube.com")) {
        // Increment the counter for the current second
        pastHalfHour[currentIndex] = 1;
      }

      // Calculate the sum of seconds spent on the restricted site in the last 30 minutes
      let sum = pastHalfHour.reduce((a, b) => a + b, 0);

      // Get the current time in the correct format
      const currentTimeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

      if (sum >= 5 * 60 ||
          isTimeInRange('22:30', '02:00', currentTimeStr) ||
          url.pathname.includes("reels") || 
          url.pathname.includes("shorts")) {
        blockSite(tabs[0].id);
      }
    }
  });
}, 1000);

function blockSite(tabId) {
  // Implementation to block the site
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['blocker.js']
  });
}

function isTimeInRange(startTime, endTime, currentTimeStr) {
  // Convert times to "minutes since midnight" for easy comparison
  function convertToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startMinutes = convertToMinutes(startTime);
  const endMinutes = convertToMinutes(endTime);
  const currentMinutes = convertToMinutes(currentTimeStr);

  // Check if the time range crosses midnight
  if (endMinutes < startMinutes) {
    // The time range crosses midnight, e.g., 22:30-02:00
    return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
  } else {
    // Normal time range, e.g., 09:00-17:00
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }
}

