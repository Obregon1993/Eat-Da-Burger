const express = require("express");

const path    = require("path");


const router = express.Router();

// communication between the model and burger.js
const burger = require(path.join(__dirname, "..", "models", "burger.js"));

// route controllers
router.get("/:id?", (req, res) => {
    function callback(results) {
        // Display a form for adding a burger
        if (!req.params.id) {
            res.render("index", {
                "title"  : "Add",
                "action" : "/",
                "id"     : undefined,
                "name"   : "",
                "burgers": results
            });

        // process for displaying the form for editing the burger
        } else {
            const id     = parseInt(req.params.id);
            const burger = results.filter(r => r.id === id)[0];

            res.render("index", {
                "title"  : "Edit",
                "action" : `/${id}/${(burger.devoured) ? "1" : "0"}?_method=PATCH`,
                "id"     : id,
                "name"   : burger.name,
                "burgers": results
            });

        }
    }

    burger.getBurgers(callback);
});

router.post("/", (req, res) => {
    function callback(results) {
        res.redirect("/");
    }

    burger.addBurger(req.body.name, false, callback);
});

router.patch("/:id/:devoured", (req, res) => {
    function callback(results) {
        res.redirect("/");
    }
    
    burger.updateBurger(parseInt(req.params.id), req.body.name, (req.params.devoured === "1"), callback);
});

router.delete("/:id", (req, res) => {
    function callback(results) {
        res.redirect("/");
    }

    burger.deleteBurger(parseInt(req.params.id), callback);
});

module.exports = router;