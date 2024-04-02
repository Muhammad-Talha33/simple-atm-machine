#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 50000;
const myPin = 3389;
let userName = await inquirer.prompt([
    {
        name: "name",
        message: chalk.gray.italic("Enter your name"),
        type: "string",
    },
]);
console.log(chalk.whiteBright.italic(`${userName.name} your pin code is {${myPin}}`));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.gray.italic("Enter your pin?"),
        type: "number",
    },
]);
if (pinAnswer.pin === myPin) {
    // console.log(chalk.green.italic("Correct pin code"));
    console.log(chalk.italic(`(WELCOME TO OUR ATM SERVICE)`));
    console.log(chalk
        .rgb(255, 136, 0)
        .italic(`${userName.name} your current balance is: $${myBalance}`));
    let operationAnswer = await inquirer.prompt([
        {
            name: "operation",
            message: chalk.magenta.italic("Please select a transaction:"),
            type: "list",
            choices: ["Withdrawal", "Check Balance", "Fast Cash"],
        },
    ]);
    if (operationAnswer.operation === "Withdrawal") {
        let amountAnswer = await inquirer.prompt([
            {
                name: "amount",
                message: chalk.gray.italic("Enter your amount"),
                type: "number",
            },
        ]);
        if (amountAnswer.amount > myBalance) {
            console.log(chalk.redBright.italic("Insufficient balance! You cannot withdraw more than your current balance."));
        }
        else {
            myBalance -= amountAnswer.amount;
            console.log(chalk.yellow.italic(`${userName.name} your remaining balance is: $${myBalance}`));
        }
    }
    else if (operationAnswer.operation === "Check Balance") {
        console.log(chalk.yellow.italic(`${userName.name} your current balance is: $${myBalance}`));
    }
    else if (operationAnswer.operation === "Fast Cash") {
        let fastCashAmount = await inquirer.prompt([
            {
                name: "amount",
                message: chalk.gray.italic("Select your fast cash amount"),
                type: "list",
                choices: [1000, 2000, 5000, 10000, 15000, 20000, 25000],
            },
        ]);
        if (fastCashAmount.amount > myBalance) {
            console.log(chalk.redBright.italic("Insufficient balance! You cannot withdraw more than your current balance."));
        }
        else {
            myBalance -= fastCashAmount.amount;
            console.log(chalk.yellow.italic(`${userName.name} your remaining balance is: $${myBalance}`));
        }
    }
}
else {
    console.log(chalk.redBright.italic("Incorrect pin number!"));
}
