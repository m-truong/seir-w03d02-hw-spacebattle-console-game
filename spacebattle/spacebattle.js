/**
 * Spaceship Class
 */
class Spaceship {
    constructor(hull = 20, firepower = 5, accuracy = 0.7) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    /** 
     * The shootLasers() method calculates the chance of hitting the enemy ship. 
     * It alerts the player if it is successful or if it misses. 
     */
    shootLasers(enemyShip) {
        const chanceHit = Math.random();
        if (chanceHit <= this.accuracy) {
            enemyShip.hull -= this.firepower;
            console.log(`%c The attack was a direct hit! It did ${this.firepower} damage, and it was super effective!`, 'font-style: italic; color: green; border: 1px solid grey;');
            alert(`The attack was a direct hit! It did ${this.firepower} damage, and it was super effective!`);
        } else {
            console.log('%c The attack missed', 'font-style: italic; color: red; border: 1px solid grey;');
            alert(`The attack missed!`);
        }
    }
}
/**
 * Mothership Factory Class 
 */
class Mothership {
    /**
     * The Mothership Factory contains an array of values for the hull, firepower and accuracy of the alien ships. 
     * It also contains an array of the alien Spaceship objects. 
     */
    constructor() {
        this.hullvalues = [3, 4, 5, 6];
        this.firepowervalues = [2, 3, 4];
        this.accuracyvalues = [0.6, 0.7, 0.8];
        this.spaceships = [];
    }
    /**
     * The generateShip() method takes in a number parameter that will generate the specified number of Spaceship objects
     * and pushes them into the this.spaceship array property. It also generates a random index to randomly assign each of the
     * hull, firepower, and accuracy properties from their respective arrays to the alien Spaceship object.
     */
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
}
/**  
 * GameState Class
 */
class GameState {
    /**  The GameState constructor is instantiated with the userAction property which stores the user's input from the prompt().
     * It has a this.state property which will be toggled to turn on or off the current game state.
     * It has a this.iterable property which will be used to iterate through the alien array on the this.alienships property.
     */
    constructor() {
        this.userAction = null;
        this.state = true;
        this.iterable = 0;
        this.alienships = new Mothership();
        this.nova = new Spaceship();
    }
    /**
     * The startGame() method starts the game on the GameState object.
     */
    startGame() {
        this.displayWelcomeMsg();
        this.continueBattle();
    }
    /**
     * The displayWelcomeMsg() function displays the instructions for playing the game in an alert. 
     */
    displayWelcomeMsg() {
        // Game start message
        console.log('%c Space Battle', 'color: white; font-size: 40px; border;');
        alert(`You have now begun playing Space Battle! The instructions are simple. Keep playing until you've destroyed all the enemy alien ships! You must save Earth from Thanos' invading alien army!`);
        // Generates 6 alien ships
        this.alienships.generateShip(6);
        alert(`There are ${this.alienships.spaceships.length - (this.iterable)} alien ships remaining!`);
    }
    /**
     * The contiueBattle() method uses a while-loop to continuously prompt the user to keep attacking or retreat from the current battle with the alien ship.
     */
    continueBattle() {
        while (this.userAction !== "s" && this.state === true && this.alienships.spaceships[this.iterable].hull > 0 && this.nova.hull > 0) {
            this.userAction = prompt("Attack the current alien ship?", "Type 'y' to attack or 'n' to retreat");
            // If player's input is 'y', the USS Nova attacks the alien ship.
            if (this.userAction === "y") {
                this.nova.shootLasers(this.alienships.spaceships[this.iterable]);
                // If the alien ship survives, it attacks back.
                if (this.alienships.spaceships[this.iterable].hull > 0) {
                    alert(`The alien ship is attacking back!`);
                    this.alienships.spaceships[this.iterable].shootLasers(this.nova);
                    alert(`The USS Nova ship has ${this.nova.hull} hitpoints.`)
                    // Else, if the alien ship has been destroyed, the user gets an alert that says the ship has been destroyed.
                } else if (this.alienships.spaceships[this.iterable].hull <= 0) {
                    console.log(`%c The alien ship has been destroyed! Great Work!`, 'font-style: italic; color: gold; font-size: 10px; border: 1px solid grey;');
                    alert(`The alien ship has been destroyed! Great Work!`);
                }
                // If the player's input is 'n', the game ends.
            } else if (this.userAction === "n") {
                console.log(`%c Thank you for playing! You've ended the game!`, 'font-style: italic; color: gold; font-size: 10px; border: 1px solid grey;');
                alert(`Thank you for playing! You've ended the game!`);
                this.state = false;
            }
            this.checkNovaDestroyed();
            this.checkAlienShipDefeated();
            this.checkGameVictory();
        }
    }
    /**
     * The checkNovaDestroyed() is a function that checks if the player's ship has been destroyed. 
     * If so, it prompts the user to restart the game or to quit. 
     */
    checkNovaDestroyed() {
        if (this.nova.hull <= 0) {
            console.log('%c Oh no! The USSNova ship went ka-blooey and has been destroyed! But you can still save Earth! Would you like to play again?', 'font-style: italic; border: 1px solid grey; color: red; font-size: 20px;');
            const tempUserAction = prompt("Oh no! The USSNova ship went ka-blooey and has been destroyed! But you can still save Earth! Would you like to play again?", "Type 'y' to play again or 'n' to stop playing");
            if (tempUserAction === "y") {
                // refreshes page 
                location.reload();
            } else if (tempUserAction === "n") {
                // stops game
                this.state = false;
                window.stop();
            }
        }
    }
    /**
     * The checkAlienShipDefeated() checks to see if the current alien ship's hull is less than or equal to zero.
     * If so, it prompts the user to continue playing and increments the this.interable property to access the next alien ship in the alien array. 
     */
    checkAlienShipDefeated() {
        if (this.alienships.spaceships[this.iterable].hull <= 0 && this.state === true) {
            this.userAction = prompt("There are still more ships left! Do you want to continue battling the next alien ship in Thanos' alien fleet?", "Type 'y' to attack or 'n' to retreat");
            if (this.userAction === "y") {
                this.iterable++;
                alert(`There are ${5 - this.iterable} alien ships remaining!`);
            } else if (this.userAction === "n") {
                console.log(`%c Thank you for playing! You've ended the game!`, 'font-style: italic; color: gold; font-size: 10px; border: 1px solid grey;');
                alert("Thank you for playing! You've ended the game!");
                this.state = false;
            }
        }
    }
    /**
     * The checkGameVictory() is a function that checks if the player has reached 
     * the end of the alien spaceships array and the Nova's hitpoints are still above 0. 
     * If so, the player is shown a winning message, and the game concludes. 
     */
    checkGameVictory() {
        if (this.iterable === (this.alienships.spaceships.length - 1) && this.nova.hull > 0) {
            console.log('%c Congratulations! You\'ve destroyed Thanos\' invading alien army and saved Earth!', 'font-size: 20px; font-style: italic; border: 1px solid grey; color: gold;');
            alert("Congratulations! You've destroyed Thanos' invading alien army and saved Earth!");
            this.state = false;
            window.stop();
        }
    }
}
// ====== START GAME HERE ====== //
const game1 = new GameState();
game1.startGame();