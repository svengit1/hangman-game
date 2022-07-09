const game = JSON.parse(localStorage.getItem("game"))
const player = JSON.parse(localStorage.getItem("player"))
const quote = JSON.parse(localStorage.getItem("quote"))
const package = {"quoteId": quote.quoteId, "length": quote.length, "uniqueCharacters": quote.uniqueCharacters, "userName": player.userName, "errors": player.errors, "duration": game.duration}

fetch("https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores", {
    method: "POST", 
    body: JSON.stringify(package)
  }).then(res => {
    console.log("Request complete! response:", res);
  });

highscores = [[player.name, 100 / (player.errors + 1)]]
fetch("https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores").then(res => res.json())
  .then(data => {
        for([key, val] of Object.entries(data)) {
            highscores.push([val.userName, Math.round(100 / (val.errors + 1))])
        }
        highscores.sort((a, b) => b[1] - a[1])
        var score_board = document.getElementById("score_board")
        for (let e of highscores){
            var entry = document.createElement('li')
            entry.appendChild(document.createTextNode(e))
            score_board.appendChild(entry)
        }
  })


