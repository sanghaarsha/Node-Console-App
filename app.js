const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
const yargs = require("yargs");

const utils = require("./utils.js");
const notes = require("./notes.js");

// Using Validator
// console.log(validator.isEmail("john@gmail.com")) 
// -> True

// Using process.argv
// process.argv = command line arguments
// const command = process.argv[2]; // 0 = node path, 1 = file path, G.T. 2 = args
// if(command.toLowerCase()==="add") console.log(chalk.green.bold("Add"));

// Using yargs to parse args : 

yargs.version('0.0.1'); // setting yargs version

// console.log(yargs.argv);
// Running the program : 
// ➜ node app.js add  --title=test
// ➜ { _: [ 'add' ], title: 'test', '$0': 'app.js' }

// setting args commands
yargs.command({
	command: 'add',
	describe: 'add a new note',
	builder:{
		title:{
			describe: 'Note Title',
			type:'string',
			demandOption: true
		},
		body:{
			describe: 'Note Body Content',
			type:'string',
			demandOption: true
		}
	},
	handler: (argv)=>{
		notes.addNote(argv.title,argv.body);
	}
})


yargs.command({
	command: 'read',
	describe: 'read a note',
	builder:{
		title:{
			describe: 'Note Title',
			type:'string',
			demandOption: true
		}
	},
	handler: (argv)=>{
		const note = notes.getNote(argv.title)[0];
		if(note){
			console.log(note.title,"\n",note.body);
		}else{
			console.log(chalk.red.bold("Note not found!"));
		}
	}
})

yargs.command({
	command: 'list',
	describe: 'list all notes',
	handler: ()=>{
		const allNotes = notes.listNotes();
		 allNotes.forEach(item => {
			console.log(item.title,"\n",item.body,"\n");
		});
	}
})

yargs.command({
	command: 'rem',
	describe: 'remove a note',
	builder:{
		title:{
			describe: 'Note Title',
			type:'string',
			demandOption: true
		}
	},
	handler: (argv)=>{
		notes.remNote(argv.title);
	}
})

// must use this to parse args from yargs
yargs.parse()