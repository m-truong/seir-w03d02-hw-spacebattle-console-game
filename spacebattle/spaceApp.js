let action = null;

// while (action !== "stop") {
//     action = prompt("What do you want to do", "Your action");
// }

/**
 * Actors & Actions 
 *  */

class GameState {
    // multiple instances of same game
    constructor(state) {
        this.state = state;
    }
    startGame() {
        const mothership1 = new Mothership();
        mothership1.generateShip(6);
        console.log(mothership1.spaceships);
    }
    beginRound() {
        // spaceShip attks alien
        // if alien survives
        // alien attks back
        // if spaceShip survives 
        // spaceShip attacks again
        // UNTIL 1 ship is destroyed 
    }
    continueAttackingNextShip() {
        // if alien destroyed 
        // attack next 
        // or RETREAT 
    }
    gameReset() {
        // if RETREAT
        // GAME OVER
        // etc. 
    }
    winWholeGame() {
        // if ALL aliens destroyed 
        // alert() WIN GAME!

    }
    shipDestroyedGameOver() {
        // if GAME destroyed 
        // alert() 
        // gameReset() 
    }
}

class Spaceship {
    // default properties
    constructor(hull = 20, firepower = 5, accuracy = 0.7) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    // attacks the other ship 
    shootLasers(enemyShip) {
        enemyShip.hull -= this.firepower; // this takes hitpoints AWAY from enemyShip
    }

}

class Mothership {
    constructor() {
        this.hullvalues = [3, 4, 5, 6];
        this.firepowervalues = [2, 3, 4];
        this.accuracyvalues = [0.6, 0.7, 0.8];
        this.spaceships = []; // alien spaceship array 
    }
    generateShip(num) {
        for (let k = 0; k < num; k++) {
            const randomHull = Math.floor(Math.random() * this.hullvalues.length);
            const randomFirepower = Math.floor(Math.random() * this.firepowervalues.length);
            const randomAccuracy = Math.floor(Math.random() * this.accuracyvalues.length);
            const newSpaceship = new Spaceship(this.hullvalues[randomHull], this.firepowervalues[randomFirepower],
                this.accuracyvalues[randomAccuracy]);
            this.spaceships.push(newSpaceship);
        }
    }
    findShip(index) {
        return this.spaceships[index];
    }
}

// ===== START GAME HERE ===== //
const game1 = new GameState(); 
game1.startGame(); 