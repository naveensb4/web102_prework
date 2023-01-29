/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

        for (let i = 0; i < games.length; i++) {
            // create a new div element, which will become the game card
            const gameCard = document.createElement('div');
            // add the class game-card to the list
            gameCard.classList.add("game-card");
            // set the inner HTML using a template literal to display some info 
            // about each game
            gameCard.innerHTML = `
                    <img src=${games[i].img} class="game-img" alt="${games[i].name}">
                    <h2>${games[i].name}</h2>
                    <p>Goal: $${games[i].goal.toLocaleString()}</p>
                    <p>Backers: ${games[i].backers}</p>
                    `;
            // append the game to the games-container
            gamesContainer.appendChild(gameCard);
        }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
// set inner HTML using template literal
raisedCard.innerHTML = "$"+totalPledged.toLocaleString();

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have met or exceeded their goal

    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    addGamesToPage(GAMES_JSON);
    
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const totalUnfunded = unfundedGames.reduce((acc, game) => acc + 1, 0);
console.log(totalUnfunded);

// create a string that explains the number of unfunded games using the ternary operator

const totalPledged1 = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
const totalGames1 = GAMES_JSON.length;

const p = document.createElement("p");
p.innerHTML = `A total of $${totalPledged1.toLocaleString()} has been raised for ${totalGames1} games. ${totalUnfunded} game${totalUnfunded === 1 ? '' : 's'} currently remain unfunded.`;
// create a new DOM element containing the template string and append it to the description container
descriptionContainer.appendChild(p);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// // use destructuring and the spread operator to grab the first and second games
const [topFundedGame, secondTopFundedGame] = sortedGames;

// // create a new element to hold the name of the top pledge game, then append it to the correct element
// const firstGameName = document.createElement("p");
// firstGameName.innerText = firstGame.name;
// firstGameContainer.appendChild(firstGameName);

// const secondGameName = document.createElement("p");
// secondGameName.innerText = secondGame.name;
// secondGameContainer.appendChild(secondGameName);

// do the same for the runner up item

const topPledgeGame = sortedGames[0];
const topPledgeGameName = topPledgeGame.name;
const topPledgeGameElement = document.createElement('p');
topPledgeGameElement.innerHTML = topPledgeGameName;
firstGameContainer.appendChild(topPledgeGameElement);

const secondPledgeGame = sortedGames[1];
const secondPledgeGameName = secondPledgeGame.name;
const secondPledgeGameElement = document.createElement('p');
secondPledgeGameElement.innerHTML = secondPledgeGameName;
secondGameContainer.appendChild(secondPledgeGameElement);


const searchBar = document.getElementById("search-bar");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchBar.value.toLowerCase();
  const filteredGames = GAMES_JSON.filter((game) => game.name.toLowerCase().includes(searchValue));
  deleteChildElements(gamesContainer);
  addGamesToPage(filteredGames);
});
