var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
		id: 1,
		description: "meet Bubu for lunch",
		completed: false
	},{
		id: 2,
		description: "go to market",
		completed: false
	},{
		id: 3,
		description: "go to bed",
		completed: true
	}
];

app.get('/', function(req, res) {
	res.send('todo API root');
});

// GET /todos
app.get('/todos', function(req, res){
	res.json(todos);
})
// GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var foundTodo;

	// for(var i=0; i<todos.length; i++){
	// 	if (todos[i].id == todoId) {
	// 		foundTodo = todos[i].description;
	// 		break;
	// 	}
	// }

	todos.forEach(function(todo){
		if (todoId === todo.id){
			foundTodo = todo;
		}
	});

	if (foundTodo){
		// res.send('Asking for todo with id of ' + todoId + ' is ' + foundTodo);			
		res.json(foundTodo);
	}else{
		res.status(404).send();
	}	
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
})