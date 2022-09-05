//jshint esversion6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function (req, res) {
    let day = date.getDate();

    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", (req, res) => {

    let item = req.body.newItem;
    console.log(req.body.list);

    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on the port 3000");
});