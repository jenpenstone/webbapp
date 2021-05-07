"use strict";

import { products } from "./products.js";
import { apiKey, baseUrl } from "./vars.js";

var orders = {

    allOrders: [],

    getAllOrders: function(callback) {
        if (orders.allOrders.length > 0) {
            return callback();
        }

        //Get content from Lager API
        fetch(`${baseUrl}orders?api_key=${apiKey}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                orders.allOrders = result.data;

                return callback();
            });
    },

    getOrder: function(orderId) {
        return orders.allOrders.find(order => order.id === orderId);
    },

    updateProducts: function(order) {
        order.forEach(product => {
            //update stock for product
            var pId = product.product_id;
            var amount = product.amount;

            products.updateStock(pId, amount);
        });
    },

    updateOrder: function(orderId) {
        //get order info
        var order = orders.getOrder(orderId);

        //update status in Lager API
        var orderData = {
            id: orderId,
            name: order.name,
            status_id: 200,
            api_key: apiKey
        };

        fetch(`${baseUrl}orders`, {
            body: JSON.stringify(orderData),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
            .then(function (response) {
                if (response) {
                    orders.updateProducts(order);
                }
            });
    }
};

export { orders };
