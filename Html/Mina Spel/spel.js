const ADMIN_USERNAME = "Ebrone";
const ADMIN_PASSWORD = "1234";

function login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        alert("Inloggning lyckades!");
        localStorage.setItem("loggedIn", "true");
        document.getElementById("adminPanel").style.display = "block";
        document.querySelector("section").style.display = "none";
    } else {
        alert("Felaktigt användarnamn eller lösenord.");
    }
}

function checkLogin() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
        alert("Du måste logga in för att se denna sida.");
        window.location.href = "index.html";
    }
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(username, password);
}

function logout() {
    localStorage.removeItem("loggedIn");
    alert("Du har loggat ut.");
    window.location.href = "index.html";
}

function getGame() {
    const game = localStorage.getItem("game");
    return game ? JSON.parse(game) : [];
}

function saveGame(game) {
    localStorage.setItem("game", JSON.stringify(game));
}

function addGame (name, imgURL, link, description) {
    const game = getGame();
    game.push({ name, imgURL, link, description });
    saveGame(game);
    alert("Spelet har lagts till!");
}

function handleAddGame() {
    const name = document.getElementById("name").value;
    const imgURL = document.getElementById("imgURL").value;
    const link = document.getElementById("link").value;
    const description = document.getElementById("description").value;
    addGame(name, imgURL, link, description);
}

function removeGame(index) {
    const game = getGame();
    if (index >= 0 && index < game.length) {
        game.splice(index, 1);
        saveGame(game);
        alert("Spelet har tagits bort!");
    } else {
        alert("Ogiltigt index.");
    }
}

function displayGames() {
    const game = getGame();
    const gameList = document.getElementById("game-list");
    gameList.innerHTML = "";
    game.forEach((g, index) => {
        const gameItem = document.createElement("div");
        gameItem.className = "game-item";
        gameItem.innerHTML = `
            <h3>${g.name}</h3>
            <img src="${g.imgURL}" alt="${g.name}" class="game-image">
            <p>${g.description}</p>
            <a href="${g.link}" target="_blank">Spela nu</a>
        `;
        gameList.appendChild(gameItem);
    });
}