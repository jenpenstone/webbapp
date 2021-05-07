/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/orders.js":
/*!**********************!*\
  !*** ./js/orders.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orders": () => (/* binding */ orders)
/* harmony export */ });
/* harmony import */ var _products_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./products.js */ "./js/products.js");
/* harmony import */ var _vars_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vars.js */ "./js/vars.js");





var orders = {

    allOrders: [],

    getAllOrders: function(callback) {
        if (orders.allOrders.length > 0) {
            return callback();
        }

        //Get content from Lager API
        fetch(`${_vars_js__WEBPACK_IMPORTED_MODULE_1__.base_url}orders?api_key=${_vars_js__WEBPACK_IMPORTED_MODULE_1__.api_key}`)
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
        //get order info
        var order = orders.getOrder(orderId);

        //update status in Lager API
        var orderData = {
            id: orderId,
            name: order.name,
            status_id: 200,
            api_key: _vars_js__WEBPACK_IMPORTED_MODULE_1__.api_key
        };

        fetch("https://lager.emilfolino.se/v2/orders", {
            body: JSON.stringify(orderData),
            headers: {
            'content-type': 'application/json'
            },
            method: 'PUT'
        })
        .then(function (response) {
            updateProducts(order);
        });
    },

    updateProducts: function(order) {
        order.forEach(product => {
            //update stock for product
            var p_id = product.product_id;
            var amount = product.amount;
           
            _products_js__WEBPACK_IMPORTED_MODULE_0__.products.updateStock(p_id, amount);
        });
        
    }

};




/***/ }),

/***/ "./js/products.js":
/*!************************!*\
  !*** ./js/products.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "products": () => (/* binding */ products)
/* harmony export */ });
/* harmony import */ var _vars_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars.js */ "./js/vars.js");




var products = {

    allProducts: [],

    getAllProducts: function(callback) {
        if (products.allProducts.length > 0) {
            return callback();
        }

        //Get content from Lager API
        fetch(`${_vars_js__WEBPACK_IMPORTED_MODULE_0__.base_url}products?api_key=${_vars_js__WEBPACK_IMPORTED_MODULE_0__.api_key}`)
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
            api_key: _vars_js__WEBPACK_IMPORTED_MODULE_0__.api_key
        };

        fetch("https://lager.emilfolino.se/v2/products", {
            body: JSON.stringify(prodData),
            headers: {
            'content-type': 'application/json'
            },
            method: 'PUT'
        })
        .then(function (response) {
            return true;
        });
    },

    getStock: function(productId) {
        let prod = products.getProduct(productId);
        return prod.stock;
    }

};




/***/ }),

/***/ "./js/vars.js":
/*!********************!*\
  !*** ./js/vars.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "api_key": () => (/* binding */ api_key),
/* harmony export */   "base_url": () => (/* binding */ base_url)
/* harmony export */ });


const api_key = "3cb000840c1b4e98df0c9e064ae0cb89";
const base_url = "https://lager.emilfolino.se/v2/";




/***/ }),

/***/ "./js/views/home.js":
/*!**************************!*\
  !*** ./js/views/home.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "home": () => (/* binding */ home)
/* harmony export */ });
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.js */ "./js/views/menu.js");




var home = {
    showHome: function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";

        let title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Start";

        let greeting = document.createElement("p");

        greeting.textContent = `Välkommen till lager-appen! Här kan du hantera butikens produkter.`;

        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(greeting);

        window.rootElement.appendChild(window.mainContainer);

        _menu_js__WEBPACK_IMPORTED_MODULE_0__.menu.showMenu("home");
    }

};




/***/ }),

/***/ "./js/views/menu.js":
/*!**************************!*\
  !*** ./js/views/menu.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menu": () => (/* binding */ menu)
/* harmony export */ });
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ "./js/views/home.js");
/* harmony import */ var _warehouse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./warehouse.js */ "./js/views/warehouse.js");
/* harmony import */ var _orderlist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./orderlist.js */ "./js/views/orderlist.js");






var menu = {
    showMenu: function (selected) {
        //Clean up navigation from old content
        window.navigation.innerHTML = "";

        //create menu and add style-class and function for when nav is clicked on.
        let navElements = [
            {name: "Start", class: "home", nav: _home_js__WEBPACK_IMPORTED_MODULE_0__.home.showHome},
            {name: "Lager", class: "storage", nav: _warehouse_js__WEBPACK_IMPORTED_MODULE_1__.warehouse.showProducts},
            {name: "Order", class: "local_shipping", nav: _orderlist_js__WEBPACK_IMPORTED_MODULE_2__.orderlist.showOrders}
        ];

        navElements.forEach(function (element) {
            let navElement = document.createElement("a");

            if (selected === element.class) {
                navElement.className = "active";
            }

            navElement.addEventListener("click", element.nav);

            let icon = document.createElement("i");

            icon.className = "material-icons";
            icon.textContent = element.class;
            navElement.appendChild(icon);

            let text = document.createElement("span");

            text.className = "icon-text";
            text.textContent = element.name;
            navElement.appendChild(text);

            window.navigation.appendChild(navElement);
        });

        window.rootElement.appendChild(window.navigation);
    }

};




/***/ }),

/***/ "./js/views/order_details.js":
/*!***********************************!*\
  !*** ./js/views/order_details.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orderDetails": () => (/* binding */ orderDetails)
/* harmony export */ });
/* harmony import */ var _orders_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../orders.js */ "./js/orders.js");
/* harmony import */ var _orderlist_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orderlist.js */ "./js/views/orderlist.js");
/* harmony import */ var _products_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../products.js */ "./js/products.js");






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
            _orderlist_js__WEBPACK_IMPORTED_MODULE_1__.orderlist.showOrders();
        });

        window.navigation.appendChild(navBack);
        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(orderInfo);

        //console.log(event.target.id);
        var id = parseInt(event.target.id);
        var inStock = true;

        //Get order from orders
        var order = _orders_js__WEBPACK_IMPORTED_MODULE_0__.orders.getOrder(id);
        var orderProducts = order.order_items;
        //console.log(order);
        
        orderInfo.innerHTML =   `<h3><strong>${order.id} ${order.name}</strong></h3>`;
        orderProducts.forEach(product => {
            //Add product to view
            var p_id = product.product_id;
            orderInfo.innerHTML += `<div class='picklist'><p><strong>Produkt: </strong>${product.product_id} - ${product.name}</p>
                                    <p><strong>Lagerplats: </strong>${product.location}</p>
                                     <p><strong>Antal: </strong>${product.amount}</p></div`;
            //Check if product in stock
            if (product.amount > _products_js__WEBPACK_IMPORTED_MODULE_2__.products.getStock(p_id)) {
                inStock = false;
            }
            console.log(`Order: ${product.amount} & Stock: ${_products_js__WEBPACK_IMPORTED_MODULE_2__.products.getStock(product.product_id)}`);
            
        });
        
        window.mainContainer.appendChild(orderInfo);

        //Check if all products are in stock, if true show button for changing status
        if (inStock) {
            let changeStatus = document.createElement("div");
            changeStatus.className = "button";
            changeStatus.textContent = "Markera order som packad";
            changeStatus.addEventListener("click", function () {
                _orders_js__WEBPACK_IMPORTED_MODULE_0__.orders.updateOrder(order.id);
            
                console.log("Ordern har packats");
            });
            
            window.mainContainer.appendChild(changeStatus);
        }

        window.rootElement.appendChild(window.mainContainer);
    }

};




/***/ }),

/***/ "./js/views/orderlist.js":
/*!*******************************!*\
  !*** ./js/views/orderlist.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orderlist": () => (/* binding */ orderlist)
/* harmony export */ });
/* harmony import */ var _orders_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../orders.js */ "./js/orders.js");
/* harmony import */ var _order_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order_details.js */ "./js/views/order_details.js");
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu.js */ "./js/views/menu.js");






var orderlist = {

    showOrders: function () {
        _orders_js__WEBPACK_IMPORTED_MODULE_0__.orders.getAllOrders(orderlist.renderOrders);
    },
    
    renderOrders: function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";

        let title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Ny order";
        window.mainContainer.appendChild(title);

        _orders_js__WEBPACK_IMPORTED_MODULE_0__.orders.allOrders.map(function (dataOrder) {
            let orderElement = document.createElement("a");

            orderElement.id = dataOrder.id;
            orderElement.textContent = `${dataOrder.name}`;
            orderElement.addEventListener("click", _order_details_js__WEBPACK_IMPORTED_MODULE_1__.orderDetails.showOrder);
            orderElement.className = "listLink";

            window.mainContainer.appendChild(orderElement);

        });

        window.rootElement.appendChild(window.mainContainer);

        _menu_js__WEBPACK_IMPORTED_MODULE_2__.menu.showMenu("local_shipping");
    }

};




/***/ }),

/***/ "./js/views/product_details.js":
/*!*************************************!*\
  !*** ./js/views/product_details.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productDetails": () => (/* binding */ productDetails)
/* harmony export */ });
/* harmony import */ var _products_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../products.js */ "./js/products.js");
/* harmony import */ var _warehouse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./warehouse.js */ "./js/views/warehouse.js");





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
            _warehouse_js__WEBPACK_IMPORTED_MODULE_1__.warehouse.showProducts();
        });

        window.navigation.appendChild(navBack);
        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(prodInfo);

        //console.log(event.target.id);
        let id = parseInt(event.target.id);

        //Get product from products list
        let product = _products_js__WEBPACK_IMPORTED_MODULE_0__.products.getProduct(id);
        
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




/***/ }),

/***/ "./js/views/warehouse.js":
/*!*******************************!*\
  !*** ./js/views/warehouse.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "warehouse": () => (/* binding */ warehouse)
/* harmony export */ });
/* harmony import */ var _products_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../products.js */ "./js/products.js");
/* harmony import */ var _product_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product_details.js */ "./js/views/product_details.js");
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu.js */ "./js/views/menu.js");






var warehouse = {

    showProducts: function () {
        _products_js__WEBPACK_IMPORTED_MODULE_0__.products.getAllProducts(warehouse.renderProducts);
    },
    
    renderProducts: function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";

        let title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Lager";
        window.mainContainer.appendChild(title);

        _products_js__WEBPACK_IMPORTED_MODULE_0__.products.allProducts.map(function (dataProduct) {
            let prodElement = document.createElement("a");

            prodElement.id = dataProduct.id;
            prodElement.textContent = `${dataProduct.name}:    ${dataProduct.stock}st`;
            prodElement.addEventListener("click", _product_details_js__WEBPACK_IMPORTED_MODULE_1__.productDetails.showProduct);
            prodElement.className = "listLink";

            window.mainContainer.appendChild(prodElement);

        });

        window.rootElement.appendChild(window.mainContainer);

        _menu_js__WEBPACK_IMPORTED_MODULE_2__.menu.showMenu("storage");
    }

};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _views_home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/home.js */ "./js/views/home.js");




//IIFE (Immediately-Invoked Function Expression)
(function () {
    window.rootElement = document.getElementById("root");
    window.mainContainer = document.createElement("main");
    window.navigation = document.createElement("nav");

    window.mainContainer.className = "container";
    window.navigation.className = "bottom-nav";

    _views_home_js__WEBPACK_IMPORTED_MODULE_0__.home.showHome();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9vcmRlcnMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvcHJvZHVjdHMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvdmFycy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy92aWV3cy9ob21lLmpzIiwid2VicGFjazovL2xhZ2VyMi8uL2pzL3ZpZXdzL21lbnUuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvdmlld3Mvb3JkZXJfZGV0YWlscy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy92aWV3cy9vcmRlcmxpc3QuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvdmlld3MvcHJvZHVjdF9kZXRhaWxzLmpzIiwid2VicGFjazovL2xhZ2VyMi8uL2pzL3ZpZXdzL3dhcmVob3VzZS5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGFnZXIyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBYTs7QUFFNEI7QUFDSzs7QUFFOUM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsOENBQVEsQ0FBQyxpQkFBaUIsNkNBQU8sQ0FBQztBQUNuRDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2IsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2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QUFFQTtBQUNBOztBQUVBLElBQUkseURBQWE7QUFDakIsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiLi9wcm9kdWN0cy5qc1wiO1xuaW1wb3J0IHsgYXBpX2tleSwgYmFzZV91cmwgfSBmcm9tIFwiLi92YXJzLmpzXCI7XG5cbnZhciBvcmRlcnMgPSB7XG5cbiAgICBhbGxPcmRlcnM6IFtdLFxuXG4gICAgZ2V0QWxsT3JkZXJzOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBpZiAob3JkZXJzLmFsbE9yZGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2V0IGNvbnRlbnQgZnJvbSBMYWdlciBBUElcbiAgICAgICAgZmV0Y2goYCR7YmFzZV91cmx9b3JkZXJzP2FwaV9rZXk9JHthcGlfa2V5fWApXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgb3JkZXJzLmFsbE9yZGVycyA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0T3JkZXI6IGZ1bmN0aW9uKG9yZGVySWQpIHtcbiAgICAgICAgcmV0dXJuIG9yZGVycy5hbGxPcmRlcnMuZmluZChvcmRlciA9PiBvcmRlci5pZCA9PT0gb3JkZXJJZCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZU9yZGVyOiBmdW5jdGlvbihvcmRlcklkKSB7XG4gICAgICAgIC8vZ2V0IG9yZGVyIGluZm9cbiAgICAgICAgdmFyIG9yZGVyID0gb3JkZXJzLmdldE9yZGVyKG9yZGVySWQpO1xuXG4gICAgICAgIC8vdXBkYXRlIHN0YXR1cyBpbiBMYWdlciBBUElcbiAgICAgICAgdmFyIG9yZGVyRGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiBvcmRlcklkLFxuICAgICAgICAgICAgbmFtZTogb3JkZXIubmFtZSxcbiAgICAgICAgICAgIHN0YXR1c19pZDogMjAwLFxuICAgICAgICAgICAgYXBpX2tleTogYXBpX2tleVxuICAgICAgICB9O1xuXG4gICAgICAgIGZldGNoKFwiaHR0cHM6Ly9sYWdlci5lbWlsZm9saW5vLnNlL3YyL29yZGVyc1wiLCB7XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvcmRlckRhdGEpLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB1cGRhdGVQcm9kdWN0cyhvcmRlcik7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGVQcm9kdWN0czogZnVuY3Rpb24ob3JkZXIpIHtcbiAgICAgICAgb3JkZXIuZm9yRWFjaChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgIC8vdXBkYXRlIHN0b2NrIGZvciBwcm9kdWN0XG4gICAgICAgICAgICB2YXIgcF9pZCA9IHByb2R1Y3QucHJvZHVjdF9pZDtcbiAgICAgICAgICAgIHZhciBhbW91bnQgPSBwcm9kdWN0LmFtb3VudDtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBwcm9kdWN0cy51cGRhdGVTdG9jayhwX2lkLCBhbW91bnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBvcmRlcnMgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcGlfa2V5LCBiYXNlX3VybCB9IGZyb20gXCIuL3ZhcnMuanNcIjtcblxudmFyIHByb2R1Y3RzID0ge1xuXG4gICAgYWxsUHJvZHVjdHM6IFtdLFxuXG4gICAgZ2V0QWxsUHJvZHVjdHM6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChwcm9kdWN0cy5hbGxQcm9kdWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2V0IGNvbnRlbnQgZnJvbSBMYWdlciBBUElcbiAgICAgICAgZmV0Y2goYCR7YmFzZV91cmx9cHJvZHVjdHM/YXBpX2tleT0ke2FwaV9rZXl9YClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cy5hbGxQcm9kdWN0cyA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0UHJvZHVjdDogZnVuY3Rpb24ocHJvZHVjdElkKSB7XG4gICAgICAgIHJldHVybiBwcm9kdWN0cy5hbGxQcm9kdWN0cy5maW5kKHByb2R1Y3QgPT4gcHJvZHVjdC5pZCA9PT0gcHJvZHVjdElkKTtcbiAgICB9LFxuXG4gICAgdXBEYXRlUHJvZHVjdDogZnVuY3Rpb24ocHJvZHVjdElkLCBhbW91bnQpIHtcbiAgICAgICAgdmFyIHByb2R1Y3QgPSBwcm9kdWN0cy5nZXRQcm9kdWN0KHByb2R1Y3RJZCk7XG4gICAgICAgIHZhciBuZXdTdG9jayA9IHByb2R1Y3QuaWQgLSBhbW91bnQ7XG4gICAgICAgIFxuICAgICAgICB2YXIgcHJvZERhdGEgPSB7XG4gICAgICAgICAgICBpZDogcHJvZHVjdC5pZCxcbiAgICAgICAgICAgIG5hbWU6IHByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgIHN0b2NrOiBuZXdTdG9jayxcbiAgICAgICAgICAgIGFwaV9rZXk6IGFwaV9rZXlcbiAgICAgICAgfTtcblxuICAgICAgICBmZXRjaChcImh0dHBzOi8vbGFnZXIuZW1pbGZvbGluby5zZS92Mi9wcm9kdWN0c1wiLCB7XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwcm9kRGF0YSksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0U3RvY2s6IGZ1bmN0aW9uKHByb2R1Y3RJZCkge1xuICAgICAgICBsZXQgcHJvZCA9IHByb2R1Y3RzLmdldFByb2R1Y3QocHJvZHVjdElkKTtcbiAgICAgICAgcmV0dXJuIHByb2Quc3RvY2s7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBwcm9kdWN0cyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGFwaV9rZXkgPSBcIjNjYjAwMDg0MGMxYjRlOThkZjBjOWUwNjRhZTBjYjg5XCI7XG5jb25zdCBiYXNlX3VybCA9IFwiaHR0cHM6Ly9sYWdlci5lbWlsZm9saW5vLnNlL3YyL1wiO1xuXG5leHBvcnQge2FwaV9rZXksIGJhc2VfdXJsfVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG1lbnUgfSBmcm9tIFwiLi9tZW51LmpzXCI7XG5cbnZhciBob21lID0ge1xuICAgIHNob3dIb21lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vQ2xlYW4gdXAgcGFnZSBmcm9tIG9sZCBjb250ZW50XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gICAgICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlN0YXJ0XCI7XG5cbiAgICAgICAgbGV0IGdyZWV0aW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgICAgICAgZ3JlZXRpbmcudGV4dENvbnRlbnQgPSBgVsOkbGtvbW1lbiB0aWxsIGxhZ2VyLWFwcGVuISBIw6RyIGthbiBkdSBoYW50ZXJhIGJ1dGlrZW5zIHByb2R1a3Rlci5gO1xuXG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoZ3JlZXRpbmcpO1xuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgbWVudS5zaG93TWVudShcImhvbWVcIik7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBob21lIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgaG9tZSB9IGZyb20gXCIuL2hvbWUuanNcIjtcbmltcG9ydCB7IHdhcmVob3VzZSB9IGZyb20gXCIuL3dhcmVob3VzZS5qc1wiO1xuaW1wb3J0IHsgb3JkZXJsaXN0IH0gZnJvbSBcIi4vb3JkZXJsaXN0LmpzXCI7XG5cbnZhciBtZW51ID0ge1xuICAgIHNob3dNZW51OiBmdW5jdGlvbiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgLy9DbGVhbiB1cCBuYXZpZ2F0aW9uIGZyb20gb2xkIGNvbnRlbnRcbiAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICAvL2NyZWF0ZSBtZW51IGFuZCBhZGQgc3R5bGUtY2xhc3MgYW5kIGZ1bmN0aW9uIGZvciB3aGVuIG5hdiBpcyBjbGlja2VkIG9uLlxuICAgICAgICBsZXQgbmF2RWxlbWVudHMgPSBbXG4gICAgICAgICAgICB7bmFtZTogXCJTdGFydFwiLCBjbGFzczogXCJob21lXCIsIG5hdjogaG9tZS5zaG93SG9tZX0sXG4gICAgICAgICAgICB7bmFtZTogXCJMYWdlclwiLCBjbGFzczogXCJzdG9yYWdlXCIsIG5hdjogd2FyZWhvdXNlLnNob3dQcm9kdWN0c30sXG4gICAgICAgICAgICB7bmFtZTogXCJPcmRlclwiLCBjbGFzczogXCJsb2NhbF9zaGlwcGluZ1wiLCBuYXY6IG9yZGVybGlzdC5zaG93T3JkZXJzfVxuICAgICAgICBdO1xuXG4gICAgICAgIG5hdkVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCA9PT0gZWxlbWVudC5jbGFzcykge1xuICAgICAgICAgICAgICAgIG5hdkVsZW1lbnQuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmF2RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWxlbWVudC5uYXYpO1xuXG4gICAgICAgICAgICBsZXQgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gICAgICAgICAgICBpY29uLmNsYXNzTmFtZSA9IFwibWF0ZXJpYWwtaWNvbnNcIjtcbiAgICAgICAgICAgIGljb24udGV4dENvbnRlbnQgPSBlbGVtZW50LmNsYXNzO1xuICAgICAgICAgICAgbmF2RWxlbWVudC5hcHBlbmRDaGlsZChpY29uKTtcblxuICAgICAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgICAgICAgICAgdGV4dC5jbGFzc05hbWUgPSBcImljb24tdGV4dFwiO1xuICAgICAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IGVsZW1lbnQubmFtZTtcbiAgICAgICAgICAgIG5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dCk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmFwcGVuZENoaWxkKG5hdkVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod2luZG93Lm5hdmlnYXRpb24pO1xuICAgIH1cblxufTtcblxuZXhwb3J0IHsgbWVudSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG9yZGVycyB9IGZyb20gXCIuLi9vcmRlcnMuanNcIjtcbmltcG9ydCB7IG9yZGVybGlzdCB9IGZyb20gXCIuL29yZGVybGlzdC5qc1wiO1xuaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiLi4vcHJvZHVjdHMuanNcIjtcblxudmFyIG9yZGVyRGV0YWlscyA9IHtcblxuICAgIHNob3dPcmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgLy9DbGVhbiB1cCBwYWdlIGZyb20gb2xkIGNvbnRlbnRcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGxldCBuYXZCYWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGxldCBvcmRlckluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlBsb2NrbGlzdGFcIjtcblxuICAgICAgICBvcmRlckluZm8uY2xhc3NOYW1lID0gXCJvcmRlclwiO1xuXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmNsYXNzTmFtZSA9IFwidG9wLW5hdlwiO1xuXG4gICAgICAgIG5hdkJhY2suY2xhc3NOYW1lID0gXCJuYXZfYnV0dG9uXCI7XG4gICAgICAgIG5hdkJhY2sudGV4dENvbnRlbnQgPSBcIlRpbGxiYWthIHRpbGwgb3JkZXJcIjtcbiAgICAgICAgbmF2QmFjay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uY2xhc3NOYW1lID0gXCJib3R0b20tbmF2XCI7XG4gICAgICAgICAgICBvcmRlcmxpc3Quc2hvd09yZGVycygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5hcHBlbmRDaGlsZChuYXZCYWNrKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChvcmRlckluZm8pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmlkKTtcbiAgICAgICAgdmFyIGlkID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkKTtcbiAgICAgICAgdmFyIGluU3RvY2sgPSB0cnVlO1xuXG4gICAgICAgIC8vR2V0IG9yZGVyIGZyb20gb3JkZXJzXG4gICAgICAgIHZhciBvcmRlciA9IG9yZGVycy5nZXRPcmRlcihpZCk7XG4gICAgICAgIHZhciBvcmRlclByb2R1Y3RzID0gb3JkZXIub3JkZXJfaXRlbXM7XG4gICAgICAgIC8vY29uc29sZS5sb2cob3JkZXIpO1xuICAgICAgICBcbiAgICAgICAgb3JkZXJJbmZvLmlubmVySFRNTCA9ICAgYDxoMz48c3Ryb25nPiR7b3JkZXIuaWR9ICR7b3JkZXIubmFtZX08L3N0cm9uZz48L2gzPmA7XG4gICAgICAgIG9yZGVyUHJvZHVjdHMuZm9yRWFjaChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgIC8vQWRkIHByb2R1Y3QgdG8gdmlld1xuICAgICAgICAgICAgdmFyIHBfaWQgPSBwcm9kdWN0LnByb2R1Y3RfaWQ7XG4gICAgICAgICAgICBvcmRlckluZm8uaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPSdwaWNrbGlzdCc+PHA+PHN0cm9uZz5Qcm9kdWt0OiA8L3N0cm9uZz4ke3Byb2R1Y3QucHJvZHVjdF9pZH0gLSAke3Byb2R1Y3QubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkxhZ2VycGxhdHM6IDwvc3Ryb25nPiR7cHJvZHVjdC5sb2NhdGlvbn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5BbnRhbDogPC9zdHJvbmc+JHtwcm9kdWN0LmFtb3VudH08L3A+PC9kaXZgO1xuICAgICAgICAgICAgLy9DaGVjayBpZiBwcm9kdWN0IGluIHN0b2NrXG4gICAgICAgICAgICBpZiAocHJvZHVjdC5hbW91bnQgPiBwcm9kdWN0cy5nZXRTdG9jayhwX2lkKSkge1xuICAgICAgICAgICAgICAgIGluU3RvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBPcmRlcjogJHtwcm9kdWN0LmFtb3VudH0gJiBTdG9jazogJHtwcm9kdWN0cy5nZXRTdG9jayhwcm9kdWN0LnByb2R1Y3RfaWQpfWApO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQob3JkZXJJbmZvKTtcblxuICAgICAgICAvL0NoZWNrIGlmIGFsbCBwcm9kdWN0cyBhcmUgaW4gc3RvY2ssIGlmIHRydWUgc2hvdyBidXR0b24gZm9yIGNoYW5naW5nIHN0YXR1c1xuICAgICAgICBpZiAoaW5TdG9jaykge1xuICAgICAgICAgICAgbGV0IGNoYW5nZVN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjaGFuZ2VTdGF0dXMuY2xhc3NOYW1lID0gXCJidXR0b25cIjtcbiAgICAgICAgICAgIGNoYW5nZVN0YXR1cy50ZXh0Q29udGVudCA9IFwiTWFya2VyYSBvcmRlciBzb20gcGFja2FkXCI7XG4gICAgICAgICAgICBjaGFuZ2VTdGF0dXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBvcmRlcnMudXBkYXRlT3JkZXIob3JkZXIuaWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcmRlcm4gaGFyIHBhY2thdHNcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY2hhbmdlU3RhdHVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBvcmRlckRldGFpbHMgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBvcmRlcnMgfSBmcm9tIFwiLi4vb3JkZXJzLmpzXCI7XG5pbXBvcnQgeyBvcmRlckRldGFpbHMgfSBmcm9tIFwiLi9vcmRlcl9kZXRhaWxzLmpzXCI7XG5pbXBvcnQgeyBtZW51IH0gZnJvbSBcIi4vbWVudS5qc1wiO1xuXG52YXIgb3JkZXJsaXN0ID0ge1xuXG4gICAgc2hvd09yZGVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICBvcmRlcnMuZ2V0QWxsT3JkZXJzKG9yZGVybGlzdC5yZW5kZXJPcmRlcnMpO1xuICAgIH0sXG4gICAgXG4gICAgcmVuZGVyT3JkZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vQ2xlYW4gdXAgcGFnZSBmcm9tIG9sZCBjb250ZW50XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gICAgICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIk55IG9yZGVyXCI7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgICAgICBvcmRlcnMuYWxsT3JkZXJzLm1hcChmdW5jdGlvbiAoZGF0YU9yZGVyKSB7XG4gICAgICAgICAgICBsZXQgb3JkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cbiAgICAgICAgICAgIG9yZGVyRWxlbWVudC5pZCA9IGRhdGFPcmRlci5pZDtcbiAgICAgICAgICAgIG9yZGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGAke2RhdGFPcmRlci5uYW1lfWA7XG4gICAgICAgICAgICBvcmRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9yZGVyRGV0YWlscy5zaG93T3JkZXIpO1xuICAgICAgICAgICAgb3JkZXJFbGVtZW50LmNsYXNzTmFtZSA9IFwibGlzdExpbmtcIjtcblxuICAgICAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQob3JkZXJFbGVtZW50KTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod2luZG93Lm1haW5Db250YWluZXIpO1xuXG4gICAgICAgIG1lbnUuc2hvd01lbnUoXCJsb2NhbF9zaGlwcGluZ1wiKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IG9yZGVybGlzdCB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHByb2R1Y3RzIH0gZnJvbSBcIi4uL3Byb2R1Y3RzLmpzXCI7XG5pbXBvcnQgeyB3YXJlaG91c2UgfSBmcm9tIFwiLi93YXJlaG91c2UuanNcIjtcblxudmFyIHByb2R1Y3REZXRhaWxzID0ge1xuXG4gICAgc2hvd1Byb2R1Y3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIC8vQ2xlYW4gdXAgcGFnZSBmcm9tIG9sZCBjb250ZW50XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBsZXQgbmF2QmFjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICBsZXQgcHJvZEluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlByb2R1a3RkZXRhbGplclwiO1xuXG4gICAgICAgIHByb2RJbmZvLmNsYXNzTmFtZSA9IFwicHJvZHVjdFwiO1xuXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmNsYXNzTmFtZSA9IFwidG9wLW5hdlwiO1xuXG4gICAgICAgIG5hdkJhY2suY2xhc3NOYW1lID0gXCJuYXZfYnV0dG9uXCI7XG4gICAgICAgIG5hdkJhY2sudGV4dENvbnRlbnQgPSBcIlRpbGxiYWthIHRpbGwgbGFnZXJcIjtcbiAgICAgICAgbmF2QmFjay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uY2xhc3NOYW1lID0gXCJib3R0b20tbmF2XCI7XG4gICAgICAgICAgICB3YXJlaG91c2Uuc2hvd1Byb2R1Y3RzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmFwcGVuZENoaWxkKG5hdkJhY2spO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2RJbmZvKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50LnRhcmdldC5pZCk7XG4gICAgICAgIGxldCBpZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZCk7XG5cbiAgICAgICAgLy9HZXQgcHJvZHVjdCBmcm9tIHByb2R1Y3RzIGxpc3RcbiAgICAgICAgbGV0IHByb2R1Y3QgPSBwcm9kdWN0cy5nZXRQcm9kdWN0KGlkKTtcbiAgICAgICAgXG4gICAgICAgIHByb2RJbmZvLmlubmVySFRNTCA9ICAgYDxwPjxzdHJvbmc+JHtwcm9kdWN0Lm5hbWV9PC9zdHJvbmc+PC9wPlxuICAgICAgICA8cD48c3Ryb25nPklkOiA8L3N0cm9uZz4ke3Byb2R1Y3QuaWR9PC9wPlxuICAgICAgICA8cD48c3Ryb25nPkFydGlrZWxudW1tZXI6IDwvc3Ryb25nPiR7cHJvZHVjdC5hcnRpY2xlX251bWJlcn08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+UGxhdHM6IDwvc3Ryb25nPiR7cHJvZHVjdC5sb2NhdGlvbn08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+QmVza3Jpdm5pbmc6IDwvc3Ryb25nPiR7cHJvZHVjdC5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+U3BlY2lmaWthdGlvbjogPC9zdHJvbmc+JHtwcm9kdWN0LnNwZWNpZmllcnN9PC9wPlxuICAgICAgICA8cD48c3Ryb25nPlByaXM6IDwvc3Ryb25nPiR7cHJvZHVjdC5wcmljZX1rcjwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5BbnRhbCBpIGxhZ2VyOiA8L3N0cm9uZz4ke3Byb2R1Y3Quc3RvY2t9PC9wPmA7XG5cblxuICAgICAgICB3aW5kb3cucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod2luZG93Lm1haW5Db250YWluZXIpO1xuICAgIH1cblxufTtcblxuZXhwb3J0IHsgcHJvZHVjdERldGFpbHMgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuLi9wcm9kdWN0cy5qc1wiO1xuaW1wb3J0IHsgcHJvZHVjdERldGFpbHMgfSBmcm9tIFwiLi9wcm9kdWN0X2RldGFpbHMuanNcIjtcbmltcG9ydCB7IG1lbnUgfSBmcm9tIFwiLi9tZW51LmpzXCI7XG5cbnZhciB3YXJlaG91c2UgPSB7XG5cbiAgICBzaG93UHJvZHVjdHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJvZHVjdHMuZ2V0QWxsUHJvZHVjdHMod2FyZWhvdXNlLnJlbmRlclByb2R1Y3RzKTtcbiAgICB9LFxuICAgIFxuICAgIHJlbmRlclByb2R1Y3RzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vQ2xlYW4gdXAgcGFnZSBmcm9tIG9sZCBjb250ZW50XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gICAgICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkxhZ2VyXCI7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgICAgICBwcm9kdWN0cy5hbGxQcm9kdWN0cy5tYXAoZnVuY3Rpb24gKGRhdGFQcm9kdWN0KSB7XG4gICAgICAgICAgICBsZXQgcHJvZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcblxuICAgICAgICAgICAgcHJvZEVsZW1lbnQuaWQgPSBkYXRhUHJvZHVjdC5pZDtcbiAgICAgICAgICAgIHByb2RFbGVtZW50LnRleHRDb250ZW50ID0gYCR7ZGF0YVByb2R1Y3QubmFtZX06ICAgICR7ZGF0YVByb2R1Y3Quc3RvY2t9c3RgO1xuICAgICAgICAgICAgcHJvZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2R1Y3REZXRhaWxzLnNob3dQcm9kdWN0KTtcbiAgICAgICAgICAgIHByb2RFbGVtZW50LmNsYXNzTmFtZSA9IFwibGlzdExpbmtcIjtcblxuICAgICAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvZEVsZW1lbnQpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgbWVudS5zaG93TWVudShcInN0b3JhZ2VcIik7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyB3YXJlaG91c2UgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGhvbWUgfSBmcm9tIFwiLi92aWV3cy9ob21lLmpzXCI7XG5cbi8vSUlGRSAoSW1tZWRpYXRlbHktSW52b2tlZCBGdW5jdGlvbiBFeHByZXNzaW9uKVxuKGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XG4gICAgd2luZG93Lm1haW5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgICB3aW5kb3cubmF2aWdhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIik7XG5cbiAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNvbnRhaW5lclwiO1xuICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmNsYXNzTmFtZSA9IFwiYm90dG9tLW5hdlwiO1xuXG4gICAgaG9tZS5zaG93SG9tZSgpO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=