"use strict";

import { apiKey, baseUrl } from "./vars.js";

var products = {

    allProducts: [],

    getAllProducts: function(callback) {
        if (products.allProducts.length > 0) {
            return callback();
        }

        //Get content from Lager API
        fetch(`${baseUrl}products?api_key=${apiKey}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                products.allProducts = result.data;

                return callback();
            });
    },

    getProduct: function(productId) {
        return products.allProducts.find(product => product.id === productId);
    },

    upDateProduct: function(productId, amount) {
        var product = products.getProduct(productId);
        var newStock = product.id - amount;

        var prodData = {
            id: product.id,
            name: product.name,
            stock: newStock,
            api_key: apiKey
        };

        fetch(`${baseUrl}products`, {
            body: JSON.stringify(prodData),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
            .then(function (response) {
                if (response) {
                    return true;
                }
            });
    },

    getStock: function(productId) {
        let prod = products.getProduct(productId);

        return prod.stock;
    }

};

export { products };
