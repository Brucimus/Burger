//import orm requirement
var orm = require("../config/orm.js");

//create burger model
var burger = {

  //select all from burgers table
  all: function(callback) {
    orm.selectAll("burgers", function(response) {
      callback(response);
    });
  },
  
  //create one record in burgers table
  create: function(cols, vals, callback) {
    orm.insertOne("burgers", cols, vals, function(response) {
      callback(response);
    });
  },

  //update specific record in burgers table
  update: function(value, condition, callback) {
    orm.updateOne("burgers", value, condition, function(response) {
      callback(response);
    });
  }
};

// Export the database functions for the controller (burger_controller.js).
module.exports = burger;