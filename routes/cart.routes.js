const express = require('express');
const router = express.Router();
const session = require('express-session');

// middleware
router.use((req, res, next) =>{
    if(!req.session.cart){
        req.session.cart = []
        req.session.cart.push({name:'total', ammount: 0});
    }
    next();
});


router.get('/', (req, res) =>{
    return res.render('cart');
})



router.post("/add/:id", (req, res, next) => {
    
    const productName = req.params.id;

    let cartProduct;
    req.session.cart.forEach(element => {
        if(element.name == productName){
            cartProduct = element;
        }
    });
    if(cartProduct === undefined){
        req.session.cart.push({'name': productName, 'ammount': 1});
    }else{
        cartProduct.ammount++;
    }

    const total = req.session.cart.find((element) => 
        element.name === 'total'
    );

    total.ammount++;

    return res.status(200).send('add complete');


})

router.post('/remove/:id', (req, res) =>{

    const productName = req.params.id;

    let cartProduct;
    req.session.cart.forEach(element =>{
        if(element.name == productName){
            cartProduct = element;
        }
    })
    
    const total = req.session.cart.find((element) => 
        element.name === 'total'
    );

    if(cartProduct !== undefined){
        cartProduct.ammount--;
        total.ammount--;

        if(cartProduct.ammount === 0){
            const idx = req.session.cart.findIndex(el => el.name === cartProduct.name);
            req.session.cart.splice(idx, 1);
        }
    }

    return res.status(200).send('removal complete')
});




router.get("/getAll", (req, res, next) =>{
    return res.json(req.session.cart);
});

router.get("/getItem/:id", function(req, res, next){
    const productName = req.params.id;

    const cartProduct = req.session.cart.find((el) => el.name === productName);
    const total = req.session.cart.find((el) => el.name === 'total');

    if(cartProduct){
        cartProduct.ammount++;
        total.ammount++;
        return res.json(cartProduct.ammount);
    }else{
        req.session.cart.push({'name': productName, 'ammount': 1});
        total.ammount++;
        return res.json(1);
    }
});


module.exports = router;