#!/usr/bin/env node
import inquirer from "inquirer";

class Hero {
    name: string;
    health = 100;

    constructor(name: string) {
        this.name = name;
    }

    decreaseHealth() {
        this.health -= 20;
    }

    increaseHealth() {
        this.health = 100;
    }
}

class Enemy {
    name: string;
    health = 200;

    constructor(name: string) {
        this.name = name;
    }

    decreaseHealth() {
        this.health -= 50;
    }

    increaseHealth() {
        this.health = 200;
    }
}

async function main() {
    const { heroName } = await inquirer.prompt([
        {
            type: "input",
            name: "heroName",
            message: "Enter your hero name:"
        }
    ]);

    const { enemyType } = await inquirer.prompt([
        {
            type: "list",
            name: "enemyType",
            choices: ["Thanos", "Hella", "Ultron"],
            message: "Select the enemy you fight with:"
        }
    ]);

    const hero = new Hero(heroName);
    const enemy = new Enemy(enemyType);

    console.log(`${enemy.name} vs ${hero.name}`);

    do {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                choices: ["attack", "defend", "range target", "run"],
                message: "Choose the attack type to perform action",
            }
        ]);

        switch (action.toLowerCase()) {
            case "attack":
                const randomNumber = Math.random();
                if (randomNumber > 0.5) {
                    hero.decreaseHealth();
                } else {
                    enemy.decreaseHealth();
                }
                console.log(`${heroName} health: ${hero.health}`);
                console.log(`${enemy.name} health: ${enemy.health}`);
                if (hero.health <= 0) {
                    console.log("You lose! Try again.");
                    return;
                }
                if (enemy.health <= 0) {
                    console.log("Congratulations! You win!");
                    return;
                }
                break;
        }
    } while (true);
}

main();
