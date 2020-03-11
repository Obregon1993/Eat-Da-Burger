const path = require("path");

// communication between burger.js an the ORM previously created
const orm = require(path.join(__dirname, "..", "config", "orm.js"));

// Convert JS Date to MySQL Timestamp
function getDate() {
    // current time
    let time = new Date();

    // converting the input to local time
    time -= time.getTimezoneOffset() * 60000;

    // changing the format of the time stamp
    return new Date(time).toISOString().slice(0, 19).replace("T", " ");
}

const burger = {
    "getBurgers": function(callback) {
        orm.selectAll("burgers", callback);
    },

    "addBurger": function(name, devoured, callback) {
        const object = {
            name,
            devoured,
            "date": getDate()
        }

        orm.insertOne("burgers", object, callback);
    },

    "updateBurger": function(id, name, devoured, callback) {
        const id_object = {
            "name" : "id",
            "value": id
        };

        const object = {
            name,
            devoured,
            "date": getDate()
        }
        
        orm.updateOne("burgers", id_object, object, callback);
    },

    "deleteBurger": function(id, callback) {
        const id_object = {
            "name" : "id",
            "value": id
        };
        
        orm.deleteOne("burgers", id_object, callback);
    }
};

module.exports = burger;