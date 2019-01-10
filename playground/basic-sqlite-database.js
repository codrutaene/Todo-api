var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined,{
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
})

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING, 
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN, 
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync(/*{force:true}*/).then(function(){
	// console.log('Everithing is synced');
	
	Todo.findById(2).then(function(elem){
		if (elem)
			console.log(elem.toJSON());
		else
			console.log('not found');
	}).catch(function(e){
		console.log(e);
	});

	// Todo.create({
	// 	description: 'sing your heart out'//,
	// 	// completed: false
	// }).then(function(todo){
	// 	return Todo.create({
	// 		description: 'read more books'
	// 	})
	// }).then(function(){
	// 	// return Todo.findById(1);
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like: '%out%'
	// 			}
	// 		}
	// 	})
	// }).then(function(todos){
	// 	if (todos){
	// 		todos.forEach(function(todo){
	// 			console.log(todo.toJSON());
	// 		});
	// 	}else{
	// 		console.log('not found');
	// 	}
	// }).catch(function(error){
	// 	console.log('error '  + error);
	// })
});