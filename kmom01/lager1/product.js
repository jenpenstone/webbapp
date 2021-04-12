/*global warehouse*/

"use strict";

var product = (function () {
    const API_KEY = "3cb000840c1b4e98df0c9e064ae0cb89";
    const BASE_URL = "https://lager.emilfolino.se/v2";

    let showProduct = function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";
        window.navigation.innerHTML = "";

        let title = document.createElement("h1");
        let navBack = document.createElement("a");
        let prodInfo = document.createElement("div");

        title.className = "title";
        title.textContent = "Produkt";

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
        let id = event.target.id;

        //Get content from Lager API
        fetch(`${BASE_URL}/products/${id}/?api_key=${API_KEY}`)
            .then(responce => responce.json())
            .then(data => {
                console.log(data);
                prodInfo.innerHTML =   `<p><strong>${data.data.name}</strong></p>
                    <p><strong>Id: </strong>${data.data.id}</p>
                    <p><strong>Artikelnummer: </strong>${data.data.article_number}</p>
                    <p><strong>Plats: </strong>${data.data.location}</p>
                    <p><strong>Beskrivning: </strong>${data.data.description}</p>
                    <p><strong>Specifikation: </strong>${data.data.specifiers}</p>
                    <p><strong>Pris: </strong>${data.data.price}kr</p>
                    <p><strong>Antal i lager: </strong>${data.data.stock}</p>`;
            });

        window.rootElement.appendChild(window.mainContainer);
    };

    return {
        showProduct: showProduct
    };
})(product);
