var orm = require("../config/orm.js");

var burger = {
    all: function(callback) {
      orm.selectAll("burgers", function(response) {
        callback(response);
      });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, callback) {
      orm.insertOne("burgers", cols, vals, function(response) {
        callback(response);
      });
    },
    update: function(value, condition, callback) {
      orm.updateOne("burgers", value, condition, function(response) {
        callback(response);
      });
    }
  };

// Export the database functions for the controller (burger_controller.js).
module.exports = burger;