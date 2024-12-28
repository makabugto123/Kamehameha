document.addEventListener('DOMContentLoaded', function () {
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const submitButton = document.getElementById('submitButton');
    const form = document.getElementById('json-form');

    agreeCheckbox.addEventListener('change', function () {
        submitButton.disabled = !agreeCheckbox.checked;
    });

    function showWaitingAlert() {
        Swal.fire({
            title: 'Please wait...',
            text: 'Processing your request',
            icon: 'info',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

    function showSuccessAlert() {
        Swal.fire({
            title: 'Success!',
            text: 'Your submission was successful.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const jsonData = document.getElementById("json-data").value;
        const adminUID = document.getElementById("inputOfAdmin").value;

        // Check if adminUID or jsonData is missing
        if (!jsonData || !adminUID) {
            Swal.fire({
                title: 'Error',
                text: 'Admin UID and AppState (JSON data) are required!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (agreeCheckbox.checked) {
            showWaitingAlert();

            setTimeout(function () {
                Swal.close();
                showSuccessAlert();
            }, 5000);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Please agree to the terms and policies.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
});

function submitForm(event) {
    event.preventDefault();
    console.log('Form submitted');
}

let Commands = [{
    'commands': []
}, {
    'handleEvent': []
}];

function autoSelectAll() {
    fetch('/commands')
        .then(response => response.json())
        .then(data => {
            const { commands, handleEvent } = data;
            Commands[0].commands = commands;
            Commands[1].handleEvent = handleEvent;
            console.log("Auto-selected commands and events:", Commands);
        })
        .catch(error => console.error('Error fetching commands:', error));
}

document.addEventListener('DOMContentLoaded', autoSelectAll);

function measurePing() {
            const xhr = new XMLHttpRequest();
            let startTime, endTime;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    endTime = Date.now();
                    const pingTime = endTime - startTime;
                    const pingElement = document.getElementById("ping");
                    if (pingElement) {
                        pingElement.textContent = pingTime + " ms";
                    }
                }
            };
            xhr.open("GET", location.href + "?t=" + new Date().getTime());
            startTime = Date.now();
            xhr.send();
        }
        setInterval(measurePing, 1000);

        function updateTime() {
            const now = new Date();
            const options = {
                timeZone: 'Asia/Manila',
                hour12: false,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            const formattedTime = now.toLocaleString('en-US', options);
            const timeElement = document.getElementById('time');
            if (timeElement) {
                timeElement.textContent = formattedTime;
            }
        }
        updateTime();
        setInterval(updateTime, 1000);

async function State() {
    const jsonInput = document.getElementById('json-data');
    const button = document.getElementById('submitButton');
    try {
        button.style.display = 'none';
        const State = JSON.parse(jsonInput.value);
        if (State && typeof State === 'object') {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    state: State,
                    commands: Commands,
                    prefix: document.getElementById('inputOfPrefix').value,
                    admin: document.getElementById('inputOfAdmin').value,
                }),
            });
            const data = await response.json();
            if (data.success) {
                jsonInput.value = '';
                showResult(data.message);
            } else {
                jsonInput.value = '';
                showResult(data.message);
            }
        } else {
            jsonInput.value = '';
            showResult('Invalid JSON data. Please check your input.');
        }
    } catch (parseError) {
        jsonInput.value = '';
        console.error('Error parsing JSON:', parseError);
        showResult('Error parsing JSON. Please check your input.');
    } finally {
        setTimeout(() => {
            button.style.display = 'block';
        }, 4000);
    }
}

function showResult(message) {
    const resultContainer = document.getElementById('result');
    if (resultContainer) {
        resultContainer.innerHTML = `<h5>${message}</h5>`;
        resultContainer.style.display = 'block';
    }
}

function toggleSubmitButton() {
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = !agreeCheckbox.checked;
}

function submitForm(event) {
    event.preventDefault();
    const jsonData = document.getElementById("json-data").value;
    const prefix = document.getElementById("inputOfPrefix").value;
    const adminUID = document.getElementById("inputOfAdmin").value;

    if (!jsonData || !prefix || !adminUID) {
        showResult('All fields are required!');
        return;
    }

    showResult('Your bot is being processed.');
}

// Array of music tracks
const musicTracks = [
    'https://sf16-ies-music-va.tiktokcdn.com/obj/musically-maliva-obj/7418923836214692613.mp3',
    'https://a.top4top.io/m_3272915y00.mp3',
    '',
    ''
];

function getRandomTrack() {
    const randomIndex = Math.floor(Math.random() * musicTracks.length);
    return musicTracks[randomIndex];
}

const audio = new Audio(getRandomTrack());
let isPlayed = false;

document.body.addEventListener('click', () => {
    if (!isPlayed) {
        audio.play();
        isPlayed = true;
    }
});

window.onload = function() {
    Swal.fire({
        title: 'Notice',
        html: `
            Upon deployment or login, your chatbot connection remains active unless you personally access the bot's account or modify the password. 
            This measure ensures seamless operation and security.<br><br>
            We respect your privacy and will not share your personal information with third parties without your consent.<br>
            We may collect and store certain information such as your Facebook public profile and interactions with the bot for improving user experience.<br><br>
            Contact the developer: <a href="https://www.facebook.com/jaymar.dev.00" style="color: #3182ce;" target="_blank">Facebook</a>
        `,
        icon: 'info',
        confirmButtonText: 'Okay',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-html',
            confirmButton: 'custom-swal-confirm'
        }
    });
};
        
function toggleSubmitButton() {
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = !agreeCheckbox.checked;
        }
        function onCaptchaSuccess() {
            document.getElementById("agreeCheckbox").disabled = false;
        }

let infoVisible = false;

        function toggleInfo() {
            const infoContainer = document.getElementById('infoContainer');
            const infoButton = document.getElementById('infoButton');
            
            if (!infoVisible) {
                fetchInfo();
                infoContainer.style.display = 'block';
                infoButton.textContent = 'Close';
            } else {
                infoContainer.style.display = 'none';
                infoButton.textContent = 'Show Online';
            }
            infoVisible = !infoVisible;
        }

// time

function timeFormat(currentTime) {
    const days = Math.floor(currentTime / (3600 * 24));
    const hours = Math.floor((currentTime % (3600 * 24)) / 3600);
    const minutes = Math.floor((currentTime % 3600) / 60);
    const seconds = currentTime % 60;

    let timeFormat = '';

    switch (true) {
        case days > 0:
            timeFormat += `${days} Day${days > 1 ? 's' : ''} | `;
        case hours > 0:
            timeFormat += `${hours} Hour${hours > 1 ? 's' : ''} | `;
        case minutes > 0:
            timeFormat += `${minutes} Minute${minutes > 1 ? 's' : ''} | `;
        default:
            timeFormat += `${seconds} Second${seconds > 1 ? 's' : ''}`;
    }

    return timeFormat.trim();
}

function fetchInfo() {
    fetch('/info')
        .then(response => response.json())
        .then(data => {
            renderInfo(data);
        })
        .catch(error => {
            console.error('Error fetching info:', error);
            Swal.fire('Error', 'Could not fetch info', 'error');
        });
}

function renderInfo(data) {
    const infoElement = document.getElementById('info');
    infoElement.innerHTML = data.map(item => {
        const formattedTime = timeFormat(item.time);
        return `
            <div class="info-item">
                <strong>Name:</strong> H I D D E N<br>
                <img 
                    src="${item.thumbSrc}" 
                    alt="User Thumbnail" 
                    style="width:50px; height:50px; object-fit:cover; image-rendering:auto;">
                <br>
                <small><strong>Time:</strong> ${formattedTime}</small>
            </div><hr>
        `;
    }).join('');
}
