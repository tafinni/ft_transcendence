const socket = io()

const startbutton = document.getElementById('startb')
const loginform = document.getElementById('login')
const loginbutton = document.getElementById('loginbutton')
const logoffbutton = document.getElementById('logoffbutton')
const userfield = document.getElementById('username')
const info = document.getElementById('info')
const loginresult = document.getElementById('loginresult')
const chanform = document.getElementById('chanform')
const chanfield = document.getElementById('chan')
const addbtn = document.getElementById('addchanbtn')
const rmvbtn = document.getElementById('rmvchanbtn')
const chanlist = document.getElementById('chanlist')
const casttext = document.getElementById('casttext')
const castbtn = document.getElementById('castbtn')

/**
 * Event listeners
 */
startbutton.addEventListener("click", function() {
    socket.emit('startbutton');
});

loginform.addEventListener("submit", function(event) {
    event.preventDefault()
    socket.emit('login', userfield.value)
})

logoffbutton.addEventListener("click", function() {
    socket.emit('logoff', userfield.value);
});

chanform.addEventListener("submit", function(event) {
    event.preventDefault()
    console.log('break addchan:', chanfield.value)
    socket.emit('addchan', chanfield.value)
})

rmvbtn.addEventListener("click", function() {
    socket.emit('rmvchan', chanfield.value)
})

castbtn.addEventListener('click', function() {
    socket.emit('broadcast', chanlist.value, casttext.value)
})

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
    info.textContent = 'Client id: ' + socket.id + ' User: ' + user + ' Total connections: ' + total
})

socket.on('users', (users) => {
    const element = document.getElementById("users")
    element.textContent = users.left + " - " + users.right
})

socket.on('chanlistupdate', (channel, toggle) => {
    if (!toggle) {
        document.getElementById(channel).remove()
        return
    }
    const listElement = document.createElement('option')
    listElement.setAttribute('value', channel)
    listElement.setAttribute('id', channel)
    listElement.textContent = channel
    document.getElementById('chanlist').appendChild(listElement)
})

socket.on('logmsg', (msg) => { logMessage(msg) })
socket.on('broadcast', (msg) => { broadCast(msg) })
socket.on('loginresult', (msg) => { loginresult.textContent =msg })

function requestUpdate() { socket.emit('requeststatus') }

/**
 * Other stuff
 */

function broadCast(msg) {
    const messageLog2 = document.getElementById('messageLog2');
    const messageElement2 = document.createElement('span');
    const breakElement2 = document.createElement('br')
    messageElement2.textContent = msg;
    messageElement2.appendChild(breakElement2);
    messageLog2.appendChild(messageElement2);
}

function logMessage(message) {
    const messageLog = document.getElementById('messageLog');
    const messageElement = document.createElement('span');
    const breakElement = document.createElement('br')
    messageElement.textContent = message;
    messageElement.appendChild(breakElement);
    messageLog.appendChild(messageElement);
    
  }

setInterval(requestUpdate, 1000 / 2)
