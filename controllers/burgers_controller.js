//requirements
var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

//initialize devoured and not yet devoured burger arrays
var undevouredData = [];
var devouredData = [];

//data listed on index page
router.get("/", function(req, res) {
    burger.all(function(data) {
        
        //empy out devoured and uneaten burger arrays
        undevouredData = [];
        devouredData = [];

        //create list of yet to be eaten burger data
        for (var i = 0; i < data.length; i++) {
            if (data[i].devoured == false) {
                undevouredData.push(data[i]);
            }
        }

        //create list of devoured burger data
        for (var i = 0; i < data.length; i++) {
            if (data[i].devoured == true) {
                devouredData.push(data[i]);
            }
        }

        //create burgers object with overall, eaten, and uneaten burger data
        var burgersObject = {
            burger: data,
            uneatenBurger: undevouredData,
            eatenBurger: devouredData
        };
        console.log(burgersObject);
        res.render("index", burgersObject);
    });
});

//api info for overall burgers
router.post("/api/burgers", function(req, res) {
    console.log(req.body.burger_name);
    burger.create("burger_name", req.body.burger_name, function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

//api info for specific burger
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

//export router
module.exports = router;