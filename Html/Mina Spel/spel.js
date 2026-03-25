const ADMIN_USERNAME = "Ebrone";
const ADMIN_PASSWORD = "1234";
let editIndex = -1;

function login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        alert("Inloggning lyckades!");
        localStorage.setItem("loggedIn", "true");
        document.getElementById("adminPanel").style.display = "block";
        document.querySelector("section").style.display = "none";
        displayGames();
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
    window.location.href = "Mina_spel.html";
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
    
    if (editIndex != -1) {
        const game = getGame();
        game[editIndex] = {
            name: document.getElementById("name").value,    
            imgURL: document.getElementById("imgURL").value,
            link: document.getElementById("link").value,
            description: document.getElementById("description").value,
        };
        editIndex = -1;
        saveGame(game);
        document.getElementById("addGameForm").reset();
        alert("Spelet har uppdaterats!");
        displayGames();
        
    }else {

    const name = document.getElementById("name").value;
    const imgURL = document.getElementById("imgURL").value;
    const link = document.getElementById("link").value;
    const description = document.getElementById("description").value;
    addGame(name, imgURL, link, description);
        document.getElementById("addGameForm").reset();
        displayGames(); 
    }  
     
}

function removeGame(index) {
    const game = getGame();
    if (index >= 0 && index < game.length) {
        game.splice(index, 1);
        saveGame(game);
        alert("Spelet har tagits bort!");
        displayGames();
    } else {
        alert("Ogiltigt index.");
    }
}

function editGame(index) {
    const game = getGame();
    if (index >= 0 && index < game.length) {
        document.getElementById("name").value = game[index].name;
        document.getElementById("imgURL").value = game[index].imgURL;
        document.getElementById("link").value = game[index].link;
        document.getElementById("description").value = game[index].description;
        
        editIndex = index;

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
            <h5>${g.name}</h5>
            <button onclick="removeGame(${index})">Ta bort</button>
            <button onclick="editGame(${index})">Redigera</button>
            <hr>
        `;
        gameList.appendChild(gameItem);
    });
}

function gameGallery () {
    const game = getGame();
    const gallery = document.getElementById("game-gallery");
    gallery.innerHTML = "";

    game.forEach((g) => {
        const gameItem = document.createElement("div");
        gameItem.className = "game-item";
        gameItem.innerHTML = `
            <h3>${g.name}</h3>
            <a href="${g.link}" class = "image" target="_blank">
            <img src="${g.imgURL}" alt="${g.name}"></a>
            <p>${g.description}</p>
        `;
        gallery.appendChild(gameItem);
    });
}