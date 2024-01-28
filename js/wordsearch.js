
let search = {};
let wordlist = [];


var number = prompt("How many copies do you want to print?");
var gridsize = prompt("What size of grid do you want?");
var wordlistsize = prompt("What is the maximum size of word?");
var wordlistmin = prompt("What is the minimum size of word?");

var dom = ``;

for(var i = 0; i < number; i++) {
  if(i == 0){
    dom += `
    <div class="m-auto p-2 max-w-4xl">
        <h1 class="text-2xl m-auto text-center mb-4"> Word Search </h1>
        <div class="m-auto" id="grid-${i}">
        </div>
        <div class="p-4">
            <h1 class="text-2xl m-auto text-center mb-4"> WordList </h1>
            <div id="wordlist-${i}">

            </div>
        </div>
    <div>`;
    }
    if(i > 0){
      dom += `
    <div class="m-auto p-2 max-w-4xl mt-64">
        <h1 class="text-2xl m-auto text-center mb-4"> Word Search </h1>
        <div class="m-auto" id="grid-${i}">
        </div>
        <div class="p-4">
            <h1 class="text-2xl m-auto text-center mb-4"> WordList </h1>
            <div id="wordlist-${i}">

            </div>
        </div>
    </div>`;
    }
}


var scratchpad = document.getElementById("scratchpad");
scratchpad.innerHTML = dom;

fetch("js/wordlist.json")
  .then((response) => response.json())
  .then((data) => {
    wordlist = data.words;
    for(var i = 0; i < number; i++) {
      makeGrid(i);
    }
  });


function makeGrid(number){
  var grid = document.getElementById("grid-"+number);
  var wordlistGrid = document.getElementById("wordlist-"+number);
  filtered_words = [];
    wordlist.forEach((word) => {
        //   console.log(word);
          if (word.length < wordlistsize && word.length > wordlistmin) {
            // console.log(word);
            filtered_words.push(word);
          }
        });
    // from there we select 48 words at random
    filtered_words.sort(() => Math.random() - 0.5);
    filtered_words = filtered_words.slice(0, 48);
    // console.log(filtered_words);
    search = wordsearch(filtered_words, gridsize, gridsize);
    // console.log(search);
    for(var i = 0; i < gridsize; i++) {
        // create a row
        var row = document.createElement("div");
        row.className = "row flex";
    
        // create 13 columns
        for(var j = 0; j < gridsize; j++) {
            var cell = document.createElement("div");
            cell.className = "h-8 w-8 flex justify-center items-center text-lg";
            // in each cell we need to add a letter
            // for now we just add a random letter
            var l = search.grid[i][j];
            // capitalize the first letter
            l = l.toUpperCase();
            var letter = document.createTextNode(l);
            cell.appendChild(letter);
            row.appendChild(cell);
        }
        grid.appendChild(row);
        // grid2.appendChild(row.cloneNode(true));
    }
    // add border to the grid
    grid.className = "border-4 border-black flex flex-col justify-center items-center m-auto";
    grid.style = "height: "+gridsize*2+"rem; width: "+gridsize*2+"rem;";
    filtered_words.forEach((word) => {
      var index = search.unplaced.indexOf(word);
      if(index > -1) {
          // filtered_words.splice(index, 1);
          // remove the word from the filtered_words
          filtered_words.splice(index, 1);
      }
    });
    for(var i = 0; i < 48; i += 6) {
    var row = document.createElement("div");
    row.className = "row flex";
    // from search.unplaced we need to remove the words that are not in filtered_words
    // create 6 columns
    for(var j = 0; j < 6; j++) {
        var cell = document.createElement("div");
        cell.className = "h-8 w-32 flex justify-center items-center text-xl";
        // in each cell we need to add a word
        // if the length of filtered_words is less than i + j we add an empty cell
        if (filtered_words.length - 1 < i + j) {
            var word = document.createTextNode("");
            cell.appendChild(word);
            row.appendChild(cell);
            continue;
        }else{
            var word = document.createTextNode(filtered_words[i + j].toLowerCase());
            cell.appendChild(word);
            row.appendChild(cell);
        }
    }
    wordlistGrid.appendChild(row);
    }
    // show the print dialog
    window.print();
}


