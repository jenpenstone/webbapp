"use strict";

import { orders } from "../orders.js";
import { orderDetails } from "./order_details.js";
import { menu } from "./menu.js";

var orderlist = {

    showOrders: function () {
        orders.getAllOrders(orderlist.renderOrders);
    },

    renderOrders: function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";

        let title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Ny order";
        window.mainContainer.appendChild(title);

        orders.allOrders.map(function (dataOrder) {
            let orderElement = document.createElement("a");

            orderElement.id = dataOrder.id;
            orderElement.textContent = `${dataOrder.name}`;
            orderElement.addEventListener("click", orderDetails.showOrder);
            orderElement.className = "listLink";

            window.mainContainer.appendChild(orderElement);
        });

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("local_shipping");
    }

};

export { orderlist };
