"use strict";

import { products } from "../products.js";
import { warehouse } from "./warehouse.js";

var productDetails = {

    showProduct: function () {
        
        //Clean up page from old content
        window.mainContainer.innerHTML = "";
        window.navigation.innerHTML = "";

        let title = document.createElement("h1");
        let navBack = document.createElement("a");
        let prodInfo = document.createElement("div");

        title.className = "title";
        title.textContent = "Produktdetaljer";

        prodInfo.className = "product";

        window.navigation.className = "top-nav";

        navBack.className = "nav_button";
        navBack.textContent = "Tillbaka till lager";
        navBack.addEventListener("click", function () {
            window.navigation.className = "bottom-nav";
            warehouse.showProducts();
        });

        window.navigation.appendChild(navBack);
        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(prodInfo);

        //console.log(event.target.id);
        let id = parseInt(event.target.id);

        //Get product from products list
        let product = products.getProduct(id);
        
        prodInfo.innerHTML =   `<p><strong>${product.name}</strong></p>
        <p><strong>Id: </strong>${product.id}</p>
        <p><strong>Artikelnummer: </strong>${product.article_number}</p>
        <p><strong>Plats: </strong>${product.location}</p>
        <p><strong>Beskrivning: </strong>${product.description}</p>
        <p><strong>Specifikation: </strong>${product.specifiers}</p>
        <p><strong>Pris: </strong>${product.price}kr</p>
        <p><strong>Antal i lager: </strong>${product.stock}</p>`;


        window.rootElement.appendChild(window.mainContainer);
    }

};

export { productDetails };
