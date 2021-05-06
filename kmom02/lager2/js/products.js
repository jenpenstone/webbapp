"use strict";

import { api_key, base_url } from "./vars.js";

var products = {

    allProducts: [],

    getAllProducts: function(callback) {
        if (products.allProducts.length > 0) {
            return callback();
        }

        //Get content from Lager API
        fetch(`${base_url}products?api_key=${api_key}`)
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

    getStock: function(productId) {
        let prod = products.getProduct(productId);
        return prod.stock;
    }

};

export { products };
