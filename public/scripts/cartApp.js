

window.addEventListener('pageshow', function(event) {
    var historyTraversal = event.persisted || (typeof window.performance != 'undefined' && window.performance.navigation.type === 2);
    
    if (historyTraversal) {
      // Reload the page
      window.location.reload();
    }
  });



window.onload = async function(){
    const res = await fetch('/cart/getAll');
    const data = await res.json();

    const main = document.getElementById("product_list");
    data.forEach(el =>{
        if(el.name !== 'total' && el.ammount !== 0){
            let productDiv = document.createElement('div');
            productDiv.classList.add('product_div');
            let nameLabel = document.createElement('label');
            nameLabel.textContent = el.name;
            nameLabel.classList.add("product_name");
            let minus = document.createElement('i');
            minus.className = "fa fa-minus";
            minus.classList.add("icon");
            let ammountLabel = document.createElement('label');
            ammountLabel.textContent = el.ammount;
            let plus = document.createElement('i');
            plus.className = "fa fa-plus";
            plus.classList.add("icon");

            productDiv.appendChild(nameLabel);
            productDiv.appendChild(minus);
            productDiv.appendChild(ammountLabel);
            productDiv.appendChild(plus);

            main.appendChild(productDiv);

            minus.addEventListener("click", async function() {
                console.log(el.name);
                const encodedString = encodeURIComponent(el.name);
                const response = await fetch(`/cart/remove/${encodedString}`, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache", 
                    credentials: "same-origin",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                if(ammountLabel.textContent === '1'){
                    productDiv.remove();
                }else{
                    ammountLabel.textContent = `${parseInt(ammountLabel.textContent) - 1}`;

                }

                // cart.set(nameLabel.textContent, cart.get(nameLabel.textContent) - 1);
                // if(cart.get(nameLabel.textContent) === 0){
                //     productDiv.remove();
                //     // cart.set(nameLabel.textContent, 0);
                // }
                // ammountLabel.textContent = cart.get(nameLabel.textContent);
                // const JSONmap = JSON.stringify(Array.from(cart.entries()));
                // localStorage.setItem("mapa", JSONmap);
            });
            plus.addEventListener("click", async function() {
                console.log(el.name);
                const encodedString = encodeURIComponent(el.name);
                await fetch(`/cart/add/${encodedString}`, {
                method: 'POST'
                });

                ammountLabel.textContent = `${parseInt(ammountLabel.textContent) + 1}`
                
                // cart.set(nameLabel.textContent, cart.get(nameLabel.textContent) + 1);
                // ammountLabel.textContent = cart.get(nameLabel.textContent);
    
                // const JSONmap = JSON.stringify(Array.from(cart.entries()));
                // localStorage.setItem("mapa", JSONmap);
            });

        }
    })
}





