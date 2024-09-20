import { getCookie } from "./csrf";
import { updateContent } from "./i18n";
import { loadContent } from "./router";
import { showAlert } from "./index.js";
import { startGame } from "./game.js";

var matchInfo = { match: 1, player1: '', player2: '', reset: function() { 
    this.match = 1
    this.player1 = ''
    this.player2 = ''
}, checkNext: function() {
    if (this.player1 !== '' && this.player2 !== '') { 
        this.player1 = this.player2 = ''
        this.match++
    }
}}
var player_list = []

function generateElements(players) {
    function generateMatchPair(id1, id2) {
        return `<div class="hasNextStep">
            <div class="match" id="` + id1 + `"></div>
            <div class="link"></div>
            <div class="match" id="` + id2 + `"></div>
        </div>`
    }
    var result = `<div class="col-md-6 mx-auto mt-5">
        <div class="local-t-container mt-5 justify-content-center" id="localtournament">
            <div class="tournament-bracket centered">`
    var phasewidth = 100
    var localtourwidth = 400
    if (players === 16) {
        phasewidth /= 2
        localtourwidth += 200
        result += `<div id="ro16" class="phase">` +
            generateMatchPair("ro16-1", "ro16-2") + generateMatchPair("ro16-3", "ro16-4") +
            generateMatchPair("ro16-5", "ro16-6") + generateMatchPair("ro16-7", "ro16-8") + `</div>`
        players /= 2
    }
    if (players === 8) {
        phasewidth /= 1.5
        localtourwidth += 200
        result += `<div id="quartFinales" class="phase">` +
            generateMatchPair("quart-1", "quart-2") + generateMatchPair("quart-3", "quart-4") + `</div>`
        players /= 2
    }
    if (players === 4) {
        phasewidth /= 2
        //localtourwidth += 200
        result += `<div id="demiFinales" class="phase">` + generateMatchPair("semi-1", "semi-2") + `</div>`
        players /= 2
    }
    console.log(phasewidth, localtourwidth)
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = result + `<div id="finale" class="phase">
                    <div class="match" id="final"></div>
                </div>
            </div>
        </div>
    </div><div class="container-fluid" id="playerselectdiv">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <form id="playerSelectForm" class="bg-light p-4 rounded mt-5">
        <h4 class="text-center mb-4">Player Selection</h4>
        <div class="form-group">
          <label for="username" class="sr-only">Player Name:</label>
          <input type="text" id="username" name="username" class="form-control" placeholder="Player Name" required>
          <div class="invalid-feedback">Please enter a player name.</div>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Select Player</button>
        <button type="reset" class="btn btn-secondary btn-block mt-2">Reset</button>
      </form>
    </div>
  </div>
</div>`
    const localtour = document.getElementById("localtournament");
    localtour.style.width = localtourwidth + 'px'
    const phaseElements = document.querySelectorAll('.phase');
    phaseElements.forEach(function(phaseElement) {
        //console.log(phaseElement);
        phaseElement = phasewidth + '%'
    });
    updateContent();
}

function namePlayers(match, p1_name, p2_name, status) {
    const selectedmatch = document.getElementById(match)
    if (!selectedmatch) console.log('namePlayers failed to select match:', match)
    if (selectedmatch) {
        selectedmatch.textContent = ''
        // selectedmatch.innerHTML = p1_name + `<br>` + p2_name
        // if (play) selectedmatch.innerHTML += `<br><button class="btn btn-dark mx-0 mt-0 mb-0" id="` + match +`-btn">Play</button>`
        if (status !== 'input') {
            const player1 = document.createElement('div')
            if (status === 'p1won')
                player1.style.color = 'green'
            else if (status === 'p2won')
                player1.style.color = 'red'
            player1.id = match + '-p1'
            console.log(player1.id)
            player1.textContent = p1_name
            selectedmatch.appendChild(player1)
            const player2 = document.createElement('div')
            if (status === 'p1won')
                player2.style.color = 'red'
            else if (status === 'p2won')
                player2.style.color = 'green'
            player2.id = match + '-p2'
            player2.textContent = p2_name
            selectedmatch.append(player2)
        } else {
            const p1input = document.createElement('input')
            p1input.type = 'text'
            p1input.id = match + '-input1'
            p1input.placeholder = "Player " + p1_name
            p1input.style.width = '160px'
            selectedmatch.appendChild(p1input)
            const p2input = document.createElement('input')
            p1input.type = "text"
            p2input.id = match + '-input2'
            p2input.placeholder = "Player " + (p1_name + 1)
            p2input.style.width = '160px'
            selectedmatch.appendChild(p2input)
        }
        if (status === 'ready') {
            const playbutton = document.createElement('button')
            playbutton.className = "btn btn-dark mx-0 mt-0 mb-0"
            playbutton.id = match + '-btn'
            playbutton.textContent = 'Play'
            selectedmatch.append(playbutton)
        }
    }
    else
        console.log('error selecting match')
}

function generatePlayerFields(players) {
    var pnbr = 0
    if (players === 16) {
        const m_pre = 'ro16-'
        for (let i = 1; i <= 8; i++) {
            namePlayers(m_pre + i, ++pnbr, ++pnbr, '')
        }
        players /= 2
    }
    if (players === 8) {
        const m_pre = 'quart-'
        for (let i = 1; i <= 4; i++) {
            namePlayers(m_pre + i, ++pnbr, ++pnbr, '')
        }
        players /= 2
    }
    if (players === 4) {
        const m_pre = 'semi-'
        for (let i = 1; i <= 2; i++) {
            namePlayers(m_pre + i, ++pnbr, ++pnbr, '')
        }
        players /= 2
    }
    namePlayers('final', ++pnbr, ++pnbr, '')
}

function enterName(players, p1, p2, match_nbr, is_ready) {
    var m_prefix = 'ro16-' + match_nbr
    if (players === 8) m_prefix = 'quart-' + match_nbr
    if (players === 4) m_prefix = 'semi-' + match_nbr
    if (players === 2) m_prefix = 'final'

    const p1Element = document.getElementById(m_prefix + '-p1')
    const p2Element = document.getElementById(m_prefix + '-p2')
    if (p1 !== '') p1Element.textContent = p1
    if (p2 !== '') p2Element.textContent = p2
    if (is_ready) {
        namePlayers(m_prefix, p1, p2, 'ready')
    }
}

export async function loadLocalTournament(players) {
    matchInfo.reset()
    if (!players) {
        loadContent('home')
        return
    }
    if (players !== 2 && players !== 4 && players !== 8 && players !== 16) {
        showAlert('Invalid number of players for local tournament', 'danger')
        console.log('localtourn invalid players:', players)
        loadContent('home')
        return
    }
    generateElements(players);
    generatePlayerFields(players);
    //setTimeout(() => { namePlayers('final', 'fb', 'fb2', 'p1won')
    //}, 2000); // Adjust timeout as needed
    const playerform = document.getElementById('playerSelectForm')
    playerform.addEventListener("submit", (event) => {
        event.preventDefault()
        const enteredname = document.getElementById('username')
        if (matchInfo.player1 === '') matchInfo.player1 = enteredname.value.trim()
        else matchInfo.player2 = enteredname.value.trim()
        enterName(players, matchInfo.player1, matchInfo.player2, matchInfo.match, false)
        matchInfo.checkNext()
        player_list.push(enteredname.value.trim())
        enteredname.value = ''
        if (players / 2 < matchInfo.match) {
            document.getElementById('playerselectdiv').textContent = ''
            shuffleArray(player_list)
            console.log(player_list)
            matchInfo.reset()
            while (matchInfo.match * 2 <= players) {
                const plrname = player_list.pop()
                if (matchInfo.player1 === '') matchInfo.player1 = plrname
                else matchInfo.player2 = plrname
                enterName(players, matchInfo.player1, matchInfo.player2, matchInfo.match, true)
                matchInfo.checkNext()
            }
        }
        console.log(matchInfo)
    })
}

//export async function loadLocalTournament2(players) {
    // if (!players) {
    //     loadContent('home')
    //     return
    // }
    // if (players !== 2 && players !== 4 && players !== 8 && players !== 16) {
    //     showAlert('Invalid number of players for local tournament', 'danger')
    //     console.log('localtour invalid players:', players)
    //     loadContent('home')
    //     return
    // }
    // var localtourwidth = '400px'
    // var phasewidth = '100%'
    // var localtourHTML = `<div class="col-md-6 mx-auto mt-5">
    //     <div class="local-t-container mt-5 justify-content-center" id="localtournament">
    //         <div class="tournament-bracket centered">`
    // const matchpair = `<div class="hasNextStep">
    //     <div class="match">first</div>
    //     <div class="link"></div>
    //     <div class="match">first</div>
    // </div>`
    // const ro16 = `<div id="ro16" class="phase">` + matchpair + matchpair + matchpair + matchpair + `</div>`
    // const quarters = `<div id="quartFinales" class="phase">` + matchpair + matchpair + `</div>`
    // const demis = `<div id="demiFinales" class="phase">` + matchpair + `</div>`
    // var localtourtailHTML = `<div id="finale" class="phase">
    //                 <div class="match">final</div>
    //             </div>
    //         </div>
    //     </div>
    // </div>`
    // switch (players) {
    //     case 2:
    //         break;
    //     case 4:
    //         phasewidth = '50%'
    //         localtourHTML += demis
    //         break;
    //     case 8:
    //         localtourwidth = '600px'
    //         phasewidth = '33.33%'
    //         localtourHTML += quarters + demis
    //         break;
    //     case 16:
    //         localtourwidth = '800px'
    //         phasewidth = '16.66%'
    //         localtourHTML += ro16 + quarters + demis
    //         break;
    //     case false:
    //         loadContent('home')
    //         return
    //     default:
    //         showAlert('Invalid number of players for local tournament', 'danger')
    //         //console.log('localtournament invalid number of players:', players)
    //         loadContent('home')
    //         return
    // }
    // localtourHTML += localtourtailHTML
    // const contentElement = document.getElementById('content');
    // //contentElement.innerHTML = `Local tournament`
    // const staticHTMLbox = `<div class="col-md-6 mx-auto mt-5">
    //     <div class="local-t-container mt-5 justify-content-center" id="localtournament">
    //         <div class="tournament-bracket centered">
    //             ` + demis + `
    //             <div id="finale" class="phase">
    //                 <div class="match">final</div>
    //             </div>
    //         </div>
    //     </div>
    // </div>`
    //generateElements(players);
    // const localtour = document.getElementById("localtournament");
    // //const bracketDiv = document.querySelector(".tournament-bracket.centered");
    // //console.log(localtour)
    // localtour.style.width = localtourwidth
    // //console.log(localtour.style)
    // const phaseElements = document.querySelectorAll('.phase');
    // phaseElements.forEach(function(phaseElement) {
    //     console.log(phaseElement);
    //     phaseElement = phasewidth
    // });
    // updateContent();
//}

const staticHTML = `<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <h2 class="text-white bg-primary p-3 mb-3">Tournament Bracket</h2>
      
      <!-- Round 1 -->
      <div class="bg-light p-3 mb-3 rounded">
        <h3 class="text-dark">Round 1</h3>
        <div class="d-flex align-items-center mb-2">
          <span class="badge bg-success mr-2">Player 1</span>
          <i class="fas fa-arrow-right mx-2"></i>
          <span class="badge bg-danger">Player 2</span>
        </div>
        <div class="d-flex align-items-center mb-2">
          <span class="badge bg-success mr-2">Player 3</span>
          <i class="fas fa-arrow-right mx-2"></i>
          <span class="badge bg-danger">Player 4</span>
        </div>
      </div>

      <!-- Round 2 -->
      <div class="bg-light p-3 mb-3 rounded">
        <h3 class="text-dark">Round 2</h3>
        <div class="d-flex align-items-center mb-2">
          <span class="badge bg-success mr-2">Winner R1</span>
          <i class="fas fa-arrow-right mx-2"></i>
          <span class="badge bg-danger">Winner R1</span>
        </div>
      </div>

      <!-- Final -->
      <div class="bg-light p-3 mb-3 rounded">
        <h3 class="text-dark">Final</h3>
        <div class="d-flex align-items-center mb-2">
          <span class="badge bg-success mr-2">Winner R2</span>
          <i class="fas fa-trophy mx-2"></i>
          <span class="badge bg-danger">Winner R2</span>
        </div>
      </div>
    </div>
  </div>
</div>`
function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}