"use strict";

import { products } from "../products.js";
import { productDetails } from "./product_details.js";
import { menu } from "./menu.js";

var warehouse = {

    showProducts: function () {
        products.getAllProducts(warehouse.renderProducts);
    },

    renderProducts: function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";

        let title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Lager";
        window.mainContainer.appendChild(title);

        let prodHeader = document.createElement("div");

        prodHeader.className = "listHeader";
        prodHeader.innerHTML = `<h4>Namn</h4><h4>Antal i lager</h4>`;

        window.mainContainer.appendChild(prodHeader);

        products.allProducts.map(function (dataProduct) {
            let prodElement = document.createElement("div");

            prodElement.innerHTML = `<p>${dataProduct.name}</p><p>${dataProduct.stock}</p>`;
            prodElement.addEventListener("click", function() {
                productDetails.showProduct(dataProduct.id);
            });
            prodElement.className = "listLink";

            window.mainContainer.appendChild(prodElement);
        });

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("storage");
    }

};

export { warehouse };
