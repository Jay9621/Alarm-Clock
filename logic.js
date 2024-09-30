let currentTime = null;
let alarmTime = null;
let alarmTriggered = false;  // A flag to ensure the alarm plays only once
let hours = null;
let minutes = null;
let seconds = null;
let amPm = null;
let audio = null;

function showTime() {
    const time = new Date();
    
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    
    // Formatting minutes and seconds
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    // Determine AM or PM
    let amPm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;  // If hour is 0, set it to 12
    
    // Update current time in 12-hour format including seconds
    currentTime = `${hours}:${minutes}:${seconds} ${amPm}`;
    
    // Update clock display
    document.getElementById('clock').innerText = currentTime;

    // Check if it's time to trigger the alarm
    checkAlarm(hours, minutes, amPm);
}

// Function to check if the current time matches the alarm time (ignoring seconds)
function checkAlarm(hours, minutes, amPm) {
    const currentTimeWithoutSeconds = `${hours}:${minutes} ${amPm}`;
    if (alarmTime === currentTimeWithoutSeconds && !alarmTriggered) {
        console.log("Alarm triggered at", currentTimeWithoutSeconds);
        playSound();  // Play the alarm sound
        alarmTriggered = true;  // Prevent further playing of the sound

    }
}

// Function to play an alarm sound
function playSound() {
    const audio = document.getElementById('alarmAudio');  // Get the audio element
    if (audio) {
        console.log("Playing alarm sound...");  // Add a console log to confirm sound is triggered

        // Play audio and ensure it loops
        audio.play().catch(error => console.error("Error playing sound:", error));  // Catch errors related to audio playing

        // Set the audio to loop until stopped after 30 seconds
        audio.loop = true;

        // Stop the audio after 30 seconds
        setTimeout(() => {
            audio.pause();  // Pause the audio
            audio.currentTime = 0;  // Reset the audio to the start
            audio.loop = false;  // Stop looping after 30 seconds
            console.log("Alarm sound stopped.");
        }, 30000);  // 30 seconds (30000 milliseconds)
    } else {
        console.error("Audio element not found!");
    }
}

document.getElementById('closeAlarmButton').addEventListener('click', () => {
    const audio = document.getElementById('alarmAudio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;  // Reset the audio
        console.log("Alarm sound manually stopped.");
    } else {
        console.error("Audio element not found!");
    }
})


// Function to set the alarm
document.getElementById('setAlarmButton').addEventListener('click', () => {
    // Get selected hour, minute, and AM/PM
    let hrValue = document.getElementById('setHr').options[document.getElementById('setHr').selectedIndex].text;
    let minValue = document.getElementById('setMin').options[document.getElementById('setMin').selectedIndex].text;
    let ampmValue = document.getElementById('setAMPM').options[document.getElementById('setAMPM').selectedIndex].text;

    // Set the alarm time and display it
    alarmTime = `${hrValue}:${minValue} ${ampmValue}`;
    document.getElementById('AlarmValue').innerText = `Alarm Set for: ${alarmTime}`;
    
    console.log("Alarm Set for:", alarmTime);
    alarmTriggered = false;  // Reset alarm trigger flag when setting a new alarm
    checkAlarm(hours, minutes, amPm);
});

// Initialize the clock and update it every second
showTime();
setInterval(showTime, 1000);
