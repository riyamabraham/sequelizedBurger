
// Requiring our models
var db = require("../models");

// Routes =============================================================
module.exports = function(app) {

  // GET route for getting 
  app.get("/api/burgers", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.burger.findAll({}).then(function(ans) {
    res.json(ans);
    });

  });

  // POST route for saving
  app.post("/api/burgers", function(req, res) {
    // create takes an argument of an object describing the item we want to insert
    // into our table. In this case we just we pass in an object with a text and
    // complete property
    db.burger.create({
      text: req.body.text,
      devour: req.body.devour
    }).then(function(ans) {
       res.json(ans);
    });

  });

  // DELETE route for deleting. We can get the id of the burger to be deleted
  // from req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    // Destroy takes in one argument: a "where object describing the burgers we want to destroy
    db.burger.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(ans) {
        res.json(ans);
      });

  });

  // PUT route for devouring. We can get the updated  data from req.body
  app.put("/api/burgers/:id", function(req, res) {
    // Update takes in two arguments, an object describing the properties we want to update,
    // and another "where" object describing the todos we want to update
    db.burger.update({
      devour: true
    },{
      where: {
        id: req.params.id
      }
    })
      .then(function(ans) {
        console.log('we hit .then update!!!!', ans)
        res.json(ans);
      });

  });
};

