/* global menu, product */

"use strict";

var warehouse = (function () {
    const API_KEY = "3cb000840c1b4e98df0c9e064ae0cb89";
    const BASE_URL = "https://lager.emilfolino.se/v2";

    let showProducts = function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";

        let title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Lager";
        window.mainContainer.appendChild(title);

        //Get content from Lager API
        fetch(`${BASE_URL}/products?api_key=${API_KEY}`)
            .then(responce => responce.json())
            .then(data => {
                //console.log(data)
                data.data.forEach(function(dataProduct) {
                    let prodElement = document.createElement("a");

                    prodElement.id = dataProduct.id;
                    prodElement.textContent = `${dataProduct.name}:    ${dataProduct.stock}st`;
                    prodElement.addEventListener("click", product.showProduct);
                    prodElement.className = "productLink";

                    window.mainContainer.appendChild(prodElement);
                });
            });

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("storage");
    };

    return {
        showProducts: showProducts
    };
})(warehouse);
