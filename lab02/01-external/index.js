// Importing third party modules
import chalk from "chalk";
import validator from "validator";
import ora from "ora";

// Chalk is used for styling terminal string output
console.log("Normal Text")
console.log(chalk.bgRed("Red Text"))
console.log(chalk.underline.yellow("Underlined Yellow Text"))

// Validator is used for validating 
const email1 = "ctis256@gmail.com"
const email2 = "ctis256@bilkent"
console.log(email1 + " : " + chalk.green(validator.isEmail(email1)));
console.log(email2 + " : " + chalk.red(validator.isEmail(email2)));

// Ora is used for showing spinners in the terminal
const spinner = ora("Processing...").start();

setTimeout(() => {
  spinner.succeed("Done!");
}, 3000);