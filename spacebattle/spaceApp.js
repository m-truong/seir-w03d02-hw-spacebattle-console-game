let userAction = null;
alert("You have now begun playing Space Battle! The instructions are simple. Keep playing until you've destroyed all the enemy alien ships! You must save Earth from Thanos' invading alien army!");

/**
 * Spaceship Class
 */
class Spaceship {
    // default properties
    constructor(hull = 20, firepower = 5, accuracy = 0.7) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    // attacks the other ship 
    shootLasers(enemyShip) {
        const chanceHit = Math.random();
        console.log(chanceHit);
        if (chanceHit <= this.accuracy) {
            enemyShip.hull -= this.firepower;
            console.log(`The attack was a direct hit! It was super effective!`);
            alert(`The attack was a direct hit! It was super effective!`);
        } else {
            console.log("The attack missed!");
            alert(`The attack missed!`);
        }
    }
}
/**
 * Spaceship Factory Class 
 */
class Mothership {
    constructor() {
        this.hullvalues = [3, 4, 5, 6];
        this.firepowervalues = [2, 3, 4];
        this.accuracyvalues = [0.6, 0.7, 0.8];
        this.spaceships = []; // 6 alien spaceship array 
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
class GameState {
    constructor(state) {
        this.state = state;
        this.alienships = new Mothership();
        this.nova = new Spaceship();
        this.iterable = 0;
    }

    startGame() {
        // ** changes gamestate to true
        this.state = true;
        this.alienships.generateShip(6);
    }
    beginGame() {
        // let currAlien = this.alienships.spaceships[k];
        while (userAction !== "s" && this.alienships.spaceships[this.iterable].hull > 0 && this.nova.hull > 0) {
            alert(`There are ${this.alienships.spaceships.length - this.iterable} alien ships remaining!`);
            // prompt user to attack //////// then alert() this is how many ships that are in front you
            userAction = prompt("Do you want to attack the alien ship?", "Type 'y' to attack or 'n' to retreat");

            // if yes attack...
            if (userAction === "y") {

                this.nova.shootLasers(this.alienships.spaceships[this.iterable]);

                if (this.alienships.spaceships[this.iterable].hull <= 0) {
                    alert(`The alien ship has been destroyed! Great Work!`);
                } else if (this.alienships.spaceships[this.iterable].hull > 0) {
                    alert(`The alien ship is attacking back!`);
                    this.alienships.spaceships[this.iterable].shootLasers(this.nova);
                    alert(`The USS Nova ship now has ${this.nova.hull} hitpoints remaining!`)
                }

            } else if (userAction === "n" || this.nova.hull <= 0) {
                console.log(`Thank you for playing! You've ended the game!`);
                alert("Game Over!");
                location.reload();
            }

            if (this.alienships.spaceships[this.iterable].hull <= 0) { // executes IF spaceship destroyed! 

                userAction = prompt("Do you want to continue attacking the next alien ship in Thanos' alien fleet?", "Type 'y' to attack or 'n' to retreat");

                if (userAction === "y") {

                    this.iterable++;
                    alert(`There are ${this.alienships.spaceships.length - this.iterable} alien ships remaining!`);

                } else if (userAction === "n") {
                    console.log(`Thank you for playing! You've ended the game!`);
                    alert("Game Over!");
                    location.reload();
                }
            }
        }
    }

    getNextShip() {
    }
    shipDestroyedGameOver() {
    }
    continueAttack() {
    }
    continueAttackingNextShip() {
    }
    continuesBattleOnSingleShip(alien) {
        // too many helper functions or a loop 
    }
    gameReset() {
        console.log("You have lost the game!")
        this.state = false;
        // location.reload(); 
        // if RETREAT
        // GAME OVER
        // etc. 
    }
}

// ====== START GAME HERE ====== //
const game1 = new GameState();
game1.startGame();
game1.beginGame();