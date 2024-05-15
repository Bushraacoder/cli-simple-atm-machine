#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

async function main() {
    let myBalance = 10000;
    let myPassword = 12345;
    console.log(chalk.blue ("\n \tWelcome to Code with Bushra - ATM Machine\n"));

    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            type: "number",
            message: chalk.yellow("Enter your pin code:")
        }
    ]);
    if (pinAnswer.pin === myPassword) {
        console.log(chalk.green("\nYour pin is correct, login successful.\n"));
        console.log(`Current account balance is ${myBalance}`);

        let operationAns = await inquirer.prompt([
            {
                name: "operation",
                type: "list",
                message: chalk.yellow("Select an operation"),
                choices: ["Cash withdraw", "Check balance", "Exit"]
            }
        ]);

        if (operationAns.operation === "Cash withdraw") {
            let withdrawAns=await inquirer.prompt([
                {
                    name:"withdrawmethod",
                    type:"list",
                    message:chalk.yellow("select a withdrawl method:"),
                    choices:["fast cash","enter amount"]
                }
            ])
            if(withdrawAns.withdrawmethod === "fast cash"){
                let fastcashAns =await inquirer.prompt([
                    {
                        name:"fastcash",
                        type:"list",
                        message:chalk.blue("select amount"),
                        choices:[1000,2000,4000,5000,6000,10000,20000]
                    }
                ])
                if(fastcashAns.fastcash > myBalance){
                    console.log(chalk.red("insufficient balance"));

                }
                else{
                    myBalance-=fastcashAns.fastcash
                    console.log(chalk.green(`${fastcashAns.fastcash} withdraw successfully`));
                    console.log(`your remaing balance is:${myBalance}`);
                }

            }
            else if(withdrawAns.withdrawmethod === "enter amount"){
                let amountans = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message:chalk.yellow( "Enter the amount to withdraw:")
                    }
                ]);
    
                if (amountans.amount > myBalance) {
                    console.log(chalk.red("Insufficient balance"));
                } else {
                    myBalance -= amountans.amount;
                    console.log(chalk.green(`${amountans.amount} withdrawn successfully`));
                    console.log(`Your remaining balance is ${myBalance}`);
                }
            }
            
        } else if (operationAns.operation === "Check balance") {
            console.log(`Your account balance is ${myBalance}`);
        } else {
            console.log(chalk.blue("Exiting..."));
        }
    } else {
        console.log(chalk.red("Incorrect pin. Please try again."));
    }
}

main();
