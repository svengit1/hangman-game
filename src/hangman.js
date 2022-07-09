import { getQuoteMaskForCharacter } from ".//get_quote_mask_for_char.js";
import { is_a_letter } from ".//is_a_letter";
import { uniqueCharacters } from ".//unique_characters.js";

let quote = {
    'text': '',
    'quoteId': 0,
    'length': 0,
    'uniqueCharacters': 0,
}
let player = {
    'name': '',
    'errors': 0
}
let game = {
    'duration': 0,
    'guesed_letters': [],
    'visable_letters': ''
}
let start = 0
const el = document.getElementById("main")
const submit_letter_btn = document.getElementById("submit_letter_btn")
const restart_btn = document.getElementById("restart_btn")
submit_letter_btn.addEventListener("click", submit_letter_handler)
restart_btn.addEventListener("click", restart_handler)
let paragraph = document.createElement("pre")
paragraph.setAttribute("id", "paragraph")
fech_quote()
function fech_quote() {
    fetch("http://api.quotable.io/random").then(res => res.json())
        .then(data => {

            setup_quote(data)
            player.name = localStorage.getItem('name')
            console.log(player.name)
            console.log(quote.text)
            run()
        })
}


function setup_quote(data) {
    quote.text = data.content
    quote.quoteId = data._id
    quote.length = data.length
    quote.uniqueCharacters = uniqueCharacters(quote.text)
}

function run() {
    for (let c of quote.text) {
        if (is_a_letter(c)) {
            game.visable_letters += "_ "
        } else {
            game.visable_letters += c
        }
    }
    render(game.visable_letters)
    start = Date.now();
}


function check_if_finished() {
    if (!game.visable_letters.includes("_")) {
        return true
    } else {
        return false
    }
}

function render() {
    paragraph.textContent = ""
    paragraph.textContent += game.visable_letters
    el.appendChild(paragraph)
}


function submit_letter_handler() {
    let selected_letter = document.getElementById("letter").value
    document.getElementById("letter").value = ""
    if (!game.guesed_letters.includes(selected_letter)) {
        game.guesed_letters.push(selected_letter)
    }
    let new_visable_letters = ""
    if (!quote.text.includes(selected_letter.toLowerCase()) && !quote.text.includes(selected_letter.toUpperCase())) {
        player.errors++

        var err = document.getElementById("error_num")
        err.textContent = ""
        err.textContent = "Number of errors:" + player.errors
        el.appendChild(err)
    }
    for (let c of quote.text) {
        new_visable_letters += getQuoteMaskForCharacter(c, game.guesed_letters);
    }
    let used_letters = ""
    for (let c of game.guesed_letters) {
        used_letters += c
    }
    console.log(player.errors)
    game.visable_letters = new_visable_letters
    if (check_if_finished()) {
        game.duration = Date.now() - start;
        console.log(game.duration)
        localStorage.setItem("game", JSON.stringify(game))
        localStorage.setItem("player", JSON.stringify(player))
        localStorage.setItem("quote", JSON.stringify(quote))
        location.href = "score_page.html";
    }
    document.getElementById('used_letters').innerHTML = used_letters

    render(new_visable_letters)
}

function restart_handler() {
    document.getElementById('used_letters').innerHTML = ''
    game.guesed_letters = []
    quote.text = ""
    game.visable_letters = ""
    player.errors = 0
    var err = document.getElementById("error_num")
    err.textContent = ""
    err.textContent = "Number of errors:" + player.errors
    start = Date.now();
    fech_quote()
}