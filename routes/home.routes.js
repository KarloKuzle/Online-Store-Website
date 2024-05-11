const express = require("express");
const path = require('path');
const router = express.Router();

const data = require('../data/mydata');


router.get("/", (req, res) =>{
    res.render('home', {
        // category: "Dobrodošli u MYKEA-u"
    })
})




router.get("/getCategories", (req, res, next) =>{

    return res.json(data.categories);

});


router.get("/getProducts/:id([0-9]{1,10})", (req, res) =>{
    let id = parseInt(req.params.id);
    let selectedCategory = data.categories.at(id - 1);

    res.json(selectedCategory);
});


module.exports = router;