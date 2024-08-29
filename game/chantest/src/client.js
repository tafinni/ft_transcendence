const socket = io();

const startbutton = document.getElementById('start');
const loginform = document.getElementById('login');
const loginbutton = document.getElementById('loginbutton')
const logoffbutton = document.getElementById('logoffbutton')
const userfield = document.getElementById('username')
const info = document.getElementById('info')
const loginresult = document.getElementById('loginresult')

/**
 * Event listeners
 */
startbutton.addEventListener("click", function() {
    socket.emit('startbutton');
});

loginform.addEventListener("submit", function(event) {
    event.preventDefault()
    //console.log('event: ', event)
    //console.log(document.getElementById('username').value)
    socket.emit('login', userfield.value)
})

// loginbutton.addEventListener("click", function() {
//     socket.emit('login', userfield.value)
// })

logoffbutton.addEventListener("click", function() {
    socket.emit('logoff', userfield.value);
});

/**
 * MAIN: Socket
*/
socket.on('requestlogin', () => {
    socket.emit('login', userfield.value)
})

socket.on('logged', (onoff, username) => {
    console.log('logged bool: ', onoff)
    console.log('logged user: [', username, ']')
    if (username === '') console.log('username is \'\'')
    logoffbutton.disabled = onoff;
    if (onoff && username !== '') loginbutton.disabled = !onoff;
    userfield.value = username;
})

socket.on('startbutton', () => {
    console.log('starting game')
    socket.emit('requeststatus')
  });

socket.on('info', (id, user, total) => {
    //console.log(socket.id)
    info.textContent = 'Client id: ' + socket.id + ' User: ' + user + ' Total connections: ' + total
})


socket.on('users', (users) => {
    //console.log('users: ', users.left, "-", users.right)
    const element = document.getElementById("users")
    element.textContent = users.left + " - " + users.right
})

socket.on('logmsg', (msg) => { logMessage(msg) })
socket.on('loginresult', (msg) => { loginresult.textContent =msg })

function requestUpdate() {
    socket.emit('requeststatus')
}

/**
 * Other stuff
 */

function logMessage(message) {
    const messageLog = document.getElementById('messageLog');
    const messageElement = document.createElement('span');
    const breakElement = document.createElement('br')
    messageElement.textContent = message;
    messageElement.appendChild(breakElement);
    messageLog.appendChild(messageElement);
    const messageLog2 = document.getElementById('messageLog2');
    const messageElement2 = document.createElement('span');
    const breakElement2 = document.createElement('br')
    messageElement2.textContent = message;
    messageElement2.appendChild(breakElement2);
    messageLog2.appendChild(messageElement2);
  }

setInterval(requestUpdate, 1000 / 2)
