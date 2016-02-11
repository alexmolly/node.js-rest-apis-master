
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var cities = [{name: 'Delhi', country: 'India'}, {name: 'New York', country: 'USA'}, {name: 'London', country:'England'}];

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/api/cities', function(request, response){
	response.send(cities);
});

app.get('/api/cities/:name', function(request, response){
	for(var index = 0; index < cities.length; index++){
		if(cities[index].name === request.params.name){
			response.send(cities[index]);
			return;
		}
	}
});

app.post('/api/cities', function(request, response){
	var city = request.body;
	console.log(city);
	for(var index = 0; index < cities.length; index++){
		if(cities[index].name === city.name){
			response.status(409).send({error: "City already exists"});
			return;
		}
	}

	cities.push(city);
	response.send(cities);
});

app.put('/api/cities/:name', function(request, response){
	var city = request.body;
	console.log(city);
	for(var index = 0; index < cities.length; index++){
		if(cities[index].name === request.params.name){
			cities[index].country = city.country;
			response.send(cities);
			return;
		}
	}
	
	response.status(404).send({error: 'City not found'});
});

app.listen(8000, function(){
	console.log("Listening on port 8000...");
});


module.exports = app;

