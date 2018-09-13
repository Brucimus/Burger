// Import MySQL connection.
var connection = require("./connection.js");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

//ORM Variable
var orm = {

    //Select All Function Object
    selectAll: function(tableInput, callback) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },

    //Insert One Item into table Function Object
    insertOne: function(table, columns, values, callback) {
        // console.log(columns.toString());
        // console.log(values);
        var queryString = "INSERT INTO " + table + " (" + columns + ") VALUES (?) ";
        // console.log(queryString);
        connection.query(queryString, values, function(err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },

    //Update One Item on table Function Object
    updateOne: function(table, value, condition, callback) {
        var queryString = "UPDATE " + table + " SET " + objToSql(value) + " WHERE " + condition;
        // console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    }
}

//Export ORM Object
module.exports = orm;