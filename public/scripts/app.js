
const lista = document.getElementById('kategorije_lista');




window.addEventListener('pageshow', function(event) {
    var historyTraversal = event.persisted || (typeof window.performance != 'undefined' && window.performance.navigation.type === 2);
    
    if (historyTraversal) {
      // Reload the page
      window.location.reload();
    }
});

let counterData;

window.onload = async function(){
    const totalCounter = document.getElementById('sum');
    const res = await fetch('/cart/getAll');
    counterData = await res.json();

    console.log(counterData);
    const cartTotal = counterData.find((item) => item.name === 'total');
    console.log(cartTotal);
    console.log(cartTotal.ammount)
    totalCounter.textContent = `${cartTotal.ammount}`;
};






async function getCategories(){
    
    const response = await fetch('/home/getCategories');
    let categoryNames = await response.json();
    
    
    categoryNames.forEach(category =>{
        const li = document.createElement('li');
        li.setAttribute('id', category.name);
        li.textContent = category.name;
        lista.appendChild(li);
    })
    const categories = lista.children;
    Array.from(categories).forEach((kategorija,indeks) =>{
        kategorija.addEventListener('click', async function(){
            
            function deleteProducts(){
            const elementsToDelete = document.getElementsByClassName('product_div'); 
            const elementsArray = Array.from(elementsToDelete);

            elementsArray.forEach(element => {
                element.remove();
            });
            }
            
            const response = await fetch(`/home/getProducts/${indeks + 1}`);
    
            
            let category = await response.json();
            let products = category.products;

            const tr_kategorija = document.getElementById('tr_kat');
            tr_kategorija.textContent = category.name;
            tr_kategorija.style.fontSize = "40px";
            tr_kategorija.style.paddingTop = "60px";

            let pozz = document.getElementById("pozdravna_scena");
            pozz.src = category.image;
            pozz.style.objectFit = "contain";

            deleteProducts();

            const main = document.getElementById('main');
            document.getElementById('main').innerHTML = "";
            document.getElementById('main').classList.add("product_list")


            products.forEach(element => {
                let icon = document.createElement('i');
                icon.className = "fa fa-shopping-basket";
                let productDiv = document.createElement('div');
                productDiv.classList.add("product_div");
                let productImage = document.createElement('img');
                productImage.src = element.image;
                let label = document.createElement('label');
                label.textContent = element.name;

                let counter = document.createElement('div');
                counter.classList.add('counter');

                counterData.forEach(el =>{
                    if(el.name === element.name){
                        counter.textContent = el.ammount;
                    }
                })
                if(counter.textContent == 0){
                    counter.style.opacity = 0;
                }

                // counter.textContent = cart.get(label.textContent);
                // if(cart.get(label.textContent) === 0){
                //     counter.style.opacity = 0;
                // }
                


                productDiv.appendChild(productImage);
                productDiv.appendChild(icon);
                productDiv.appendChild(label);
                productDiv.appendChild(counter);
                
                main.appendChild(productDiv);

                icon.addEventListener("click", async function(){
                    // cart.set(label.textContent, cart.get(label.textContent) + 1);
                    // counter.textContent = cart.get(label.textContent);
                    // if(cart.get(label.textContent) !== 0){
                    //     counter.style.opacity = 1;
                    // }
                    // const JSONmap = JSON.stringify(Array.from(cart.entries()));
                    // localStorage.setItem("mapa", JSONmap);
                    // document.getElementById("sum").style.opacity = 1;
                    // sum = sum + 1;
                    // document.getElementById("sum").textContent = sum;
                    
                    const res = await fetch(`/cart/getItem/${element.name}`);

                    const ammount = await res.json();

                    counter.textContent = ammount;

                    if(ammount !== 0){
                        counter.style.opacity = 1;
                    }

                });
            })


        });
        
    });












}
getCategories();












function deleteProducts(){
    const elementsToDelete = document.getElementsByClassName('product_div'); 
    const elementsArray = Array.from(elementsToDelete);

    elementsArray.forEach(element => {
    element.remove();
});
}

async function kreveti(){
    console.log("Radim");
    const response = await fetch('/home/getProducts/1');
    
    
    let category = await response.json();
    let products = category.products;

    const tr_kategorija = document.getElementById('tr_kat');
    tr_kategorija.textContent = category.name;
    tr_kategorija.style.fontSize = "40px";
    tr_kategorija.style.paddingTop = "60px";

    let pozz = document.getElementById("pozdravna_scena");
    pozz.src = category.image;
    pozz.style.objectFit = "contain";

    deleteProducts();

    const main = document.getElementById('main');
    document.getElementById('main').innerHTML = "";
    document.getElementById('main').classList.add("product_list")


    products.forEach(element =>{
        let icon = document.createElement('i');
        icon.className = "fa fa-shopping-basket";
        let productDiv = document.createElement('div');
        productDiv.classList.add("product_div");
        let productImage = document.createElement('img');
        productImage.src = element.image;
        let label = document.createElement('label');
        label.textContent = element.name;

        // let counter = document.createElement('div');
        // counter.classList.add('counter');
        // counter.textContent = cart.get(label.textContent);
        // if(cart.get(label.textContent) === 0){
        //     counter.style.opacity = 0;
        // }

        productDiv.appendChild(productImage);
        productDiv.appendChild(icon);
        productDiv.appendChild(label);
        // productDiv.appendChild(counter);
        
        main.appendChild(productDiv);

        icon.addEventListener("click", () =>{
            // /home/add/:id
        });
    })

}

  