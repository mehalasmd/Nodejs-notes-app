const yargs = require('yargs');
const fs = require('fs');
const database = require("./database.json");
var chalk = require('chalk');

//console.log(yargs.argv);

/* --------  ADDING A NEW NOTE  -------- */

yargs.command({
    command: 'add',
    describe: "Adding a Note",
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {

        var flag = "false";

        database.forEach((data) => {
            if (data.title.toLowerCase() == argv.title.toLowerCase()) {
                flag = true;
            }
        })
        if (flag === "false") {
            database.push({
                "title": argv.title,
                "body": argv.body
            });
            fs.writeFile("database.json", JSON.stringify(database), () => {
                console.log(chalk.bgGreen(chalk.black("Note added SUCCESSFULLY.")));
            })
        }
        else {
            console.log(chalk.bgRed(chalk.black("The title is NOT AVAILABLE.")));
        }


    }

});


/* --------  REMOVING A NOTE  -------- */


yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },

    handler: function (argv) {

        var flag = "false";

        database.forEach((data) => {
            if (data.title.toLowerCase() == argv.title.toLowerCase()) {
                flag = true;
            }
        })

        if (flag === true) {
            var dt = database.filter((data) => {
                return data.title.toLowerCase() != argv.title.toLowerCase();
            });
            fs.writeFile('database.json', JSON.stringify(dt), () => {
                console.log(chalk.bgGreen(chalk.black('Note removed SUCCESSFULLY')));
            })
        }
        else {
            console.log(chalk.bgRed(chalk.black("The note DOESN'T EXIST")));
        }
    }
});


/* --------  READING A NOTE  -------- */


yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },

    handler: function (argv) {
        var flag = "false";


        database.forEach((data, index) => {
            if (data.title.toLowerCase() == argv.title.toLowerCase()) {
                console.log(chalk.bold.blue(data.title + ':') + chalk.bold.magenta(database[index].body));

                flag = "true";
            }

        });
        if (flag == 'false') {
            console.log(chalk.bgRed(chalk.black("The note DOESN'T EXIST")));

        }
    }
});


/* --------  LISTING ALL NOTES  -------- */


yargs.command({
    command: 'list',
    describe: 'Listing all notes',
    handler(argv) {
        if (database.length != 0) {

            database.forEach((data) => {
                console.log(chalk.bold.blue('-----' + data.title));
            });
        }
        else {
            console.log(chalk.bgRed(chalk.black('NO notes to display.')));
        }
    }
});

yargs.parse();
//console.log(yargs.argv);*/