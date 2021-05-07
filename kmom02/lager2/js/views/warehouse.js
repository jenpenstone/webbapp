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

        products.allProducts.map(function (dataProduct) {
            let prodElement = document.createElement("a");

            prodElement.id = dataProduct.id;
            prodElement.textContent = `${dataProduct.name}:    ${dataProduct.stock}st`;
            prodElement.addEventListener("click", productDetails.showProduct);
            prodElement.className = "listLink";

            window.mainContainer.appendChild(prodElement);
        });

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("storage");
    }

};

export { warehouse };
