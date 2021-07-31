const fs = require("fs");
const chalk = require("chalk");

const listNotes = () => {
	const dBuffer = fs.readFileSync(__dirname+'/data.json');
	return JSON.parse(dBuffer);
}

const itemExists = (title) => {
	const itemLength = listNotes().filter(item => item.title===title).length;
	
	if(itemLength>0) return true;
	return false;
}


const getNote = (title) =>{
	const note = listNotes().filter(item => item.title===title);
	return note;
}

const addNote = (title,body) => {
	
	if(!itemExists(title)){
		const items = listNotes();
		
		items.push({
			title:title,
			body:body
		});
	
		const data = JSON.stringify(items);
	 
		fs.writeFileSync(__dirname+"/data.json",data);
		
		console.log(chalk.green.bold("Note successfully added!"));
	}else{
		console.log(chalk.red.bold("Note with same title already exists!"));
	}
	
}

const remNote = (title) => {
	if(itemExists(title)){
	const items = listNotes();
	notesToKeep = items.filter(item => item.title !== title);
	
	const data = JSON.stringify(notesToKeep);
	fs.writeFileSync(__dirname+"/data.json",data);
	console.log(chalk.yellow.bold("Item successfully deleted!"));
	}else{
		console.log(chalk.red.bold("Item not found, so not deleted!"));
	}
}

module.exports = {getNote, addNote, remNote, listNotes};
