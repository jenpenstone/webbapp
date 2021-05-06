"use strict";

import { api_key, base_url } from "./vars.js";

var orders = {

    allOrders: [],

    getAllOrders: function(callback) {
        if (orders.allOrders.length > 0) {
            return callback();
        }

        //Get content from Lager API
        fetch(`${base_url}orders?api_key=${api_key}`)
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

    updateOrder: function(orderId) {

        return;
    }

};

export { orders };
