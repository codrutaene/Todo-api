var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

// {
// 		id: 1,
// 		description: "meet Bubu for LUNCH!!!",
// 		completed: false
// 	},{
// 		id: 2,
// 		description: "go to market",
// 		completed: false
// 	},{
// 		id: 3,
// 		description: "go to bed",
// 		completed: true
// 	}

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
	var foundTodo  = _.findWhere(todos, {id: todoId});
	
	if (foundTodo){
		// res.send('Asking for todo with id of ' + todoId + ' is ' + foundTodo);			
		res.json(foundTodo);
	}else{
		res.status(404).send();
	}	
});

//POST /todos
app.post('/todos', function(req, res){
	var body = _.pick(req.body, 'description', 'completed');
	
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim();

	// console.log('description ' + body.description);
	body.id = todoNextId++;
	todos.push(body);

	res.json(body);
});

//DELETE /todos/:id
app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var foundTodo  = _.findWhere(todos, {id: todoId});
	if (!foundTodo){
		res.status(404).json({"error": "no todo found with that id"});
	}
	else {
		todos = _.without(todos, foundTodo);
		res.json(foundTodo);
	}
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
})