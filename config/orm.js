var connection = require("./connection.js");

var orm = {
    selectAll: function(tableInput, callback) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },
    insertOne: function(table, columns, values, callback) {
        var queryString = "INSERT INTO " + table + " (" + columns.toString() + ") VALUES ( " + printQuestionMarks(values.length) + ") ";
        // console.log(queryString);
        connection.query(queryString, values, function(err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },
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

module.exports = orm;