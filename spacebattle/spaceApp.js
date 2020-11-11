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
    constructor() {
        this.userAction = null;
        this.state = true;
        this.iterable = 0;
        this.alienships = new Mothership();
        this.nova = new Spaceship();

    }
    startGame() {
        this.alienships.generateShip(6);
        console.log('%c Space Battle', 'font-size: 40px'); 
        alert(`There are ${this.alienships.spaceships.length - this.iterable} alien ships remaining!`);


        while (this.userAction !== "s" && this.state === true && this.alienships.spaceships[this.iterable].hull > 0 && this.nova.hull > 0) {


            this.userAction = prompt("Do you want to attack the alien ship?", "Type 'y' to attack or 'n' to retreat");

            // if yes attack...
            if (this.userAction === "y") {

                this.nova.shootLasers(this.alienships.spaceships[this.iterable]);

                if (this.alienships.spaceships[this.iterable].hull > 0) {
                    alert(`The alien ship is attacking back!`);
                    this.alienships.spaceships[this.iterable].shootLasers(this.nova);
                    alert(`The USS Nova ship now has ${this.nova.hull} hitpoints remaining!`)

                } else if (this.alienships.spaceships[this.iterable].hull <= 0) {
                    alert(`The alien ship has been destroyed! Great Work!`);
                }

            } else if (this.userAction === "n") {
                console.log(`Thank you for playing! You've ended the game!`);
                alert(`Thank you for playing! You've ended the game!`);
                this.state = false;
            }

            this.checkNovaDestroyed(); 

            if (this.alienships.spaceships[this.iterable].hull <= 0) { // executes IF spaceship destroyed! 

                userAction = prompt("Do you want to continue attacking the next alien ship in Thanos' alien fleet?", "Type 'y' to attack or 'n' to retreat");

                if (userAction === "y") {

                    this.iterable++;
                    alert(`There are ${this.alienships.spaceships.length - this.iterable} alien ships remaining!`);

                } else if (userAction === "n") {
                    console.log(`Thank you for playing! You've ended the game!`);
                    alert("Thank you for playing! You've ended the game!");
                    this.state = false;
                }
            }
            this.checkGameVictory();
        }
    }

    /**
     * The checkGameVictory() is a function that checks if the player has reached 
     * the end of the alien spaceships array and the Nova's hitpoints are above 0. 
     * If so, the player is shown a winning message, and the game concludes. 
     */
    checkGameVictory() {
        if (this.iterable === (this.alienships.spaceships.length-1) && this.nova.hull > 0) {
            alert("Congratulations! You've destroyed Thanos' invading alien army and saved Earth!");
        }
    }

    checkNovaDestroyed() {
        if (this.nova.hull <= 0) {
            console.log('%c Oh no! The USSNova ship went ka-blooey and has been destroyed! But you can still save Earth! Would you like to play again?', 'font-style: italic; background: azure; border: 1px solid grey;');
            const tempUserAction = prompt("Oh no! The USSNova ship went ka-blooey and has been destroyed! But you can still save Earth! Would you like to play again?", "Type 'y' to play again or 'n' to stop playing");
            if (tempUserAction === "y") {
                // refreshes page
                location.reload();
            } else if (tempUserAction === "n") {
                // stops game
                window.stop();
            }
        }
    }
    shipDestroyedGameOver() {}
    continueAttack() {}
    continueAttackingNextShip() {}
    continuesBattleOnSingleShip() {
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