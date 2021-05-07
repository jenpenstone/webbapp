"use strict";

import { orders } from "../orders.js";
import { orderlist } from "./orderlist.js";
import { products } from "../products.js";

var orderDetails = {

    showOrder: function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";
        window.navigation.innerHTML = "";

        let title = document.createElement("h1");
        let navBack = document.createElement("a");
        let orderInfo = document.createElement("div");

        title.className = "title";
        title.textContent = "Plocklista";

        orderInfo.className = "order";

        window.navigation.className = "top-nav";

        navBack.className = "nav_button";
        navBack.textContent = "Tillbaka till order";
        navBack.addEventListener("click", function () {
            window.navigation.className = "bottom-nav";
            orderlist.showOrders();
        });

        window.navigation.appendChild(navBack);
        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(orderInfo);

        //console.log(event.target.id);
        var id = parseInt(event.target.id);
        var inStock = true;

        //Get order from orders
        var order = orders.getOrder(id);
        var orderProducts = order.order_items;
        //console.log(order);

        orderInfo.innerHTML =   `<h3><strong>${order.id} ${order.name}</strong></h3>`;
        orderProducts.forEach(product => {
            //Add product to view
            var pId = product.product_id;

            orderInfo.innerHTML += `<div class='picklist'><p><strong>Produkt: 
                                    </strong>${product.product_id} - ${product.name}</p>
                                    <p><strong>Lagerplats: </strong>${product.location}</p>
                                     <p><strong>Antal: </strong>${product.amount}</p></div`;
            //Check if product in stock
            if (product.amount > products.getStock(pId)) {
                inStock = false;
            }
            console.log(`Order: ${product.amount} & Stock: ${products.getStock(pId)}`);
        });

        window.mainContainer.appendChild(orderInfo);

        //Check if all products are in stock, if true show button for changing status
        if (inStock) {
            let changeStatus = document.createElement("div");

            changeStatus.className = "button";
            changeStatus.textContent = "Markera order som packad";
            changeStatus.addEventListener("click", function () {
                orders.updateOrder(order.id);

                console.log("Ordern har packats");
            });

            window.mainContainer.appendChild(changeStatus);
        }

        window.rootElement.appendChild(window.mainContainer);
    }

};

export { orderDetails };
