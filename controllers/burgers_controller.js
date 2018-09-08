var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

var undevouredData = [];
var devouredData = [];

router.get("/", function(req, res) {
    burger.all(function(data) {
        undevouredData = [];
        devouredData = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i].devoured == false) {
                undevouredData.push(data[i]);
            }
        }

        for (var i = 0; i < data.length; i++) {
            if (data[i].devoured == true) {
                devouredData.push(data[i]);
            }
        }
        var burgersObject = {
            burger: data,
            uneatenBurger: undevouredData,
            eatenBurger: devouredData
        };
        console.log(burgersObject);
        res.render("index", burgersObject);
    });
});

router.post("/api/burgers", function(req, res) {
    cat.create("burger_name", req.body.burger_name, function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update(
        {
            devoured: true
        },
        condition,
        function(result) {
            if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
            }
            res.status(200).end();

        }
    );
});

module.exports = router;