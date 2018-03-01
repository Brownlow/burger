// Require express
var express = require("express");

// Setup express router
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Get route to return all burgers
router.get('/', function(req, res){
    burger.all(function(data){
        var hbars = {
            burgers: data
        };
        console.log(hbars);
        res.render("index", hbars);
    });
})


// Post route to create new burgers
router.post('/api/burgers/', function(req, res){
    burger.create(
        ['name'],[req.body.name],
        function(result){
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        }
    );
});


// Post route to update burgers
router.put('/api/burgers/:id', function(req, res){
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    
    burger.update(
        {eaten: req.body.eaten}, 
        condition, function(result) {
            if (result.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    );
});

// Delete burger
router.delete('/api/burgers/:id', function(req, res){
	var condition = "id = " + req.params.id;
	burger.delete({
		condition, function(result) {
			if (result.changedRows == 0) {
					// If no rows were changed, then the ID must not exist, so 404
					return res.status(404).end();
			} else {
					res.status(200).end();
			}
		}
	})
})


// Export routes for server.js to use.
module.exports = router;

