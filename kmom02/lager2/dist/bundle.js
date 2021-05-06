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
/* harmony import */ var _vars_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars.js */ "./js/vars.js");




var orders = {

    allOrders: [],

    getAllOrders: function(callback) {
        if (orders.allOrders.length > 0) {
            return callback();
        }

        //Get content from Lager API
        fetch(`${_vars_js__WEBPACK_IMPORTED_MODULE_0__.base_url}orders?api_key=${_vars_js__WEBPACK_IMPORTED_MODULE_0__.api_key}`)
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
        let id = parseInt(event.target.id);
        let inStock = true;

        //Get order from orders
        let order = _orders_js__WEBPACK_IMPORTED_MODULE_0__.orders.getOrder(id);
        let orderProducts = order.order_items;
        //console.log(order);
        
        orderInfo.innerHTML =   `<h3><strong>${order.id} ${order.name}</strong></h3>`;
        orderProducts.forEach(product => {
            //Add product to view
            orderInfo.innerHTML += `<div class='picklist'><p><strong>Produkt: </strong>${product.product_id} - ${product.name}</p>
                                    <p><strong>Lagerplats: </strong>${product.location}</p>
                                     <p><strong>Antal: </strong>${product.amount}</p></div`;
            //Check if product in stock
            if (product.amount > _products_js__WEBPACK_IMPORTED_MODULE_2__.products.getStock(product.product_id)) {
                inStock = false;
            }
            console.log(`Order: ${product.amount} & Stock: ${_products_js__WEBPACK_IMPORTED_MODULE_2__.products.getStock(product.product_id)}`)
            
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9vcmRlcnMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvcHJvZHVjdHMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvdmFycy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy92aWV3cy9ob21lLmpzIiwid2VicGFjazovL2xhZ2VyMi8uL2pzL3ZpZXdzL21lbnUuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvdmlld3Mvb3JkZXJfZGV0YWlscy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy92aWV3cy9vcmRlcmxpc3QuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvdmlld3MvcHJvZHVjdF9kZXRhaWxzLmpzIiwid2VicGFjazovL2xhZ2VyMi8uL2pzL3ZpZXdzL3dhcmVob3VzZS5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGFnZXIyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFhOztBQUVpQzs7QUFFOUM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsOENBQVEsQ0FBQyxpQkFBaUIsNkNBQU8sQ0FBQztBQUNuRDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2IsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDTDs7QUFFaUM7O0FBRTlDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLDhDQUFRLENBQUMsbUJBQW1CLDZDQUFPLENBQUM7QUFDckQ7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRW9COzs7Ozs7Ozs7Ozs7Ozs7O0FDcENQOztBQUViO0FBQ0E7O0FBRTBCOzs7Ozs7Ozs7Ozs7Ozs7O0FDTGI7O0FBRW9COztBQUVqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUSxtREFBYTtBQUNyQjs7QUFFQTs7QUFFZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCSDs7QUFFb0I7QUFDVTtBQUNBOztBQUUzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUMsbURBQWEsQ0FBQztBQUM5RCxhQUFhLHNDQUFzQyxpRUFBc0IsQ0FBQztBQUMxRSxhQUFhLDZDQUE2QywrREFBb0I7QUFDOUU7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9DSDs7QUFFeUI7QUFDSztBQUNEOztBQUUxQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLCtEQUFvQjtBQUNoQyxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsdURBQWU7QUFDbkM7QUFDQTs7QUFFQSwrQ0FBK0MsU0FBUyxHQUFHLFdBQVc7QUFDdEU7QUFDQTtBQUNBLHlGQUF5RixtQkFBbUIsS0FBSyxhQUFhO0FBQzlILHNFQUFzRSxpQkFBaUI7QUFDdkYsa0VBQWtFLGVBQWU7QUFDakY7QUFDQSxpQ0FBaUMsMkRBQWlCO0FBQ2xEO0FBQ0E7QUFDQSxrQ0FBa0MsZUFBZSxZQUFZLDJEQUFpQixxQkFBcUI7O0FBRW5HLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDBEQUFrQjs7QUFFbEM7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFd0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGWDs7QUFFeUI7QUFDWTtBQUNqQjs7QUFFakM7O0FBRUE7QUFDQSxRQUFRLDJEQUFtQjtBQUMzQixLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSw0REFBb0I7QUFDNUI7O0FBRUE7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RCxtREFBbUQscUVBQXNCO0FBQ3pFOztBQUVBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUEsUUFBUSxtREFBYTtBQUNyQjs7QUFFQTs7QUFFcUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekNSOztBQUU2QjtBQUNDOztBQUUzQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlFQUFzQjtBQUNsQyxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLDZEQUFtQjs7QUFFekMsNkNBQTZDLGFBQWE7QUFDMUQsa0NBQWtDLFdBQVc7QUFDN0MsNkNBQTZDLHVCQUF1QjtBQUNwRSxxQ0FBcUMsaUJBQWlCO0FBQ3RELDJDQUEyQyxvQkFBb0I7QUFDL0QsNkNBQTZDLG1CQUFtQjtBQUNoRSxvQ0FBb0MsY0FBYztBQUNsRCw2Q0FBNkMsY0FBYzs7O0FBRzNEO0FBQ0E7O0FBRUE7O0FBRTBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RGI7O0FBRTZCO0FBQ1k7QUFDckI7O0FBRWpDOztBQUVBO0FBQ0EsUUFBUSxpRUFBdUI7QUFDL0IsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQVEsa0VBQXdCO0FBQ2hDOztBQUVBO0FBQ0EseUNBQXlDLGlCQUFpQixPQUFPLGtCQUFrQjtBQUNuRixrREFBa0QsMkVBQTBCO0FBQzVFOztBQUVBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUEsUUFBUSxtREFBYTtBQUNyQjs7QUFFQTs7QUFFcUI7Ozs7Ozs7VUN6Q3JCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRTBCOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSx5REFBYTtBQUNqQixDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcGlfa2V5LCBiYXNlX3VybCB9IGZyb20gXCIuL3ZhcnMuanNcIjtcblxudmFyIG9yZGVycyA9IHtcblxuICAgIGFsbE9yZGVyczogW10sXG5cbiAgICBnZXRBbGxPcmRlcnM6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChvcmRlcnMuYWxsT3JkZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HZXQgY29udGVudCBmcm9tIExhZ2VyIEFQSVxuICAgICAgICBmZXRjaChgJHtiYXNlX3VybH1vcmRlcnM/YXBpX2tleT0ke2FwaV9rZXl9YClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBvcmRlcnMuYWxsT3JkZXJzID0gcmVzdWx0LmRhdGE7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBnZXRPcmRlcjogZnVuY3Rpb24ob3JkZXJJZCkge1xuICAgICAgICByZXR1cm4gb3JkZXJzLmFsbE9yZGVycy5maW5kKG9yZGVyID0+IG9yZGVyLmlkID09PSBvcmRlcklkKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlT3JkZXI6IGZ1bmN0aW9uKG9yZGVySWQpIHtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBvcmRlcnMgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcGlfa2V5LCBiYXNlX3VybCB9IGZyb20gXCIuL3ZhcnMuanNcIjtcblxudmFyIHByb2R1Y3RzID0ge1xuXG4gICAgYWxsUHJvZHVjdHM6IFtdLFxuXG4gICAgZ2V0QWxsUHJvZHVjdHM6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChwcm9kdWN0cy5hbGxQcm9kdWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2V0IGNvbnRlbnQgZnJvbSBMYWdlciBBUElcbiAgICAgICAgZmV0Y2goYCR7YmFzZV91cmx9cHJvZHVjdHM/YXBpX2tleT0ke2FwaV9rZXl9YClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cy5hbGxQcm9kdWN0cyA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0UHJvZHVjdDogZnVuY3Rpb24ocHJvZHVjdElkKSB7XG4gICAgICAgIHJldHVybiBwcm9kdWN0cy5hbGxQcm9kdWN0cy5maW5kKHByb2R1Y3QgPT4gcHJvZHVjdC5pZCA9PT0gcHJvZHVjdElkKTtcbiAgICB9LFxuXG4gICAgZ2V0U3RvY2s6IGZ1bmN0aW9uKHByb2R1Y3RJZCkge1xuICAgICAgICBsZXQgcHJvZCA9IHByb2R1Y3RzLmdldFByb2R1Y3QocHJvZHVjdElkKTtcbiAgICAgICAgcmV0dXJuIHByb2Quc3RvY2s7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBwcm9kdWN0cyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGFwaV9rZXkgPSBcIjNjYjAwMDg0MGMxYjRlOThkZjBjOWUwNjRhZTBjYjg5XCI7XG5jb25zdCBiYXNlX3VybCA9IFwiaHR0cHM6Ly9sYWdlci5lbWlsZm9saW5vLnNlL3YyL1wiO1xuXG5leHBvcnQge2FwaV9rZXksIGJhc2VfdXJsfVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG1lbnUgfSBmcm9tIFwiLi9tZW51LmpzXCI7XG5cbnZhciBob21lID0ge1xuICAgIHNob3dIb21lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vQ2xlYW4gdXAgcGFnZSBmcm9tIG9sZCBjb250ZW50XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gICAgICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlN0YXJ0XCI7XG5cbiAgICAgICAgbGV0IGdyZWV0aW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgICAgICAgZ3JlZXRpbmcudGV4dENvbnRlbnQgPSBgVsOkbGtvbW1lbiB0aWxsIGxhZ2VyLWFwcGVuISBIw6RyIGthbiBkdSBoYW50ZXJhIGJ1dGlrZW5zIHByb2R1a3Rlci5gO1xuXG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoZ3JlZXRpbmcpO1xuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgbWVudS5zaG93TWVudShcImhvbWVcIik7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBob21lIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgaG9tZSB9IGZyb20gXCIuL2hvbWUuanNcIjtcbmltcG9ydCB7IHdhcmVob3VzZSB9IGZyb20gXCIuL3dhcmVob3VzZS5qc1wiO1xuaW1wb3J0IHsgb3JkZXJsaXN0IH0gZnJvbSBcIi4vb3JkZXJsaXN0LmpzXCI7XG5cbnZhciBtZW51ID0ge1xuICAgIHNob3dNZW51OiBmdW5jdGlvbiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgLy9DbGVhbiB1cCBuYXZpZ2F0aW9uIGZyb20gb2xkIGNvbnRlbnRcbiAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICAvL2NyZWF0ZSBtZW51IGFuZCBhZGQgc3R5bGUtY2xhc3MgYW5kIGZ1bmN0aW9uIGZvciB3aGVuIG5hdiBpcyBjbGlja2VkIG9uLlxuICAgICAgICBsZXQgbmF2RWxlbWVudHMgPSBbXG4gICAgICAgICAgICB7bmFtZTogXCJTdGFydFwiLCBjbGFzczogXCJob21lXCIsIG5hdjogaG9tZS5zaG93SG9tZX0sXG4gICAgICAgICAgICB7bmFtZTogXCJMYWdlclwiLCBjbGFzczogXCJzdG9yYWdlXCIsIG5hdjogd2FyZWhvdXNlLnNob3dQcm9kdWN0c30sXG4gICAgICAgICAgICB7bmFtZTogXCJPcmRlclwiLCBjbGFzczogXCJsb2NhbF9zaGlwcGluZ1wiLCBuYXY6IG9yZGVybGlzdC5zaG93T3JkZXJzfVxuICAgICAgICBdO1xuXG4gICAgICAgIG5hdkVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCA9PT0gZWxlbWVudC5jbGFzcykge1xuICAgICAgICAgICAgICAgIG5hdkVsZW1lbnQuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmF2RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWxlbWVudC5uYXYpO1xuXG4gICAgICAgICAgICBsZXQgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gICAgICAgICAgICBpY29uLmNsYXNzTmFtZSA9IFwibWF0ZXJpYWwtaWNvbnNcIjtcbiAgICAgICAgICAgIGljb24udGV4dENvbnRlbnQgPSBlbGVtZW50LmNsYXNzO1xuICAgICAgICAgICAgbmF2RWxlbWVudC5hcHBlbmRDaGlsZChpY29uKTtcblxuICAgICAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgICAgICAgICAgdGV4dC5jbGFzc05hbWUgPSBcImljb24tdGV4dFwiO1xuICAgICAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IGVsZW1lbnQubmFtZTtcbiAgICAgICAgICAgIG5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dCk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmFwcGVuZENoaWxkKG5hdkVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod2luZG93Lm5hdmlnYXRpb24pO1xuICAgIH1cblxufTtcblxuZXhwb3J0IHsgbWVudSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG9yZGVycyB9IGZyb20gXCIuLi9vcmRlcnMuanNcIjtcbmltcG9ydCB7IG9yZGVybGlzdCB9IGZyb20gXCIuL29yZGVybGlzdC5qc1wiO1xuaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiLi4vcHJvZHVjdHMuanNcIjtcblxudmFyIG9yZGVyRGV0YWlscyA9IHtcblxuICAgIHNob3dPcmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgLy9DbGVhbiB1cCBwYWdlIGZyb20gb2xkIGNvbnRlbnRcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGxldCBuYXZCYWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGxldCBvcmRlckluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlBsb2NrbGlzdGFcIjtcblxuICAgICAgICBvcmRlckluZm8uY2xhc3NOYW1lID0gXCJvcmRlclwiO1xuXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmNsYXNzTmFtZSA9IFwidG9wLW5hdlwiO1xuXG4gICAgICAgIG5hdkJhY2suY2xhc3NOYW1lID0gXCJuYXZfYnV0dG9uXCI7XG4gICAgICAgIG5hdkJhY2sudGV4dENvbnRlbnQgPSBcIlRpbGxiYWthIHRpbGwgb3JkZXJcIjtcbiAgICAgICAgbmF2QmFjay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uY2xhc3NOYW1lID0gXCJib3R0b20tbmF2XCI7XG4gICAgICAgICAgICBvcmRlcmxpc3Quc2hvd09yZGVycygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5hcHBlbmRDaGlsZChuYXZCYWNrKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChvcmRlckluZm8pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmlkKTtcbiAgICAgICAgbGV0IGlkID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkKTtcbiAgICAgICAgbGV0IGluU3RvY2sgPSB0cnVlO1xuXG4gICAgICAgIC8vR2V0IG9yZGVyIGZyb20gb3JkZXJzXG4gICAgICAgIGxldCBvcmRlciA9IG9yZGVycy5nZXRPcmRlcihpZCk7XG4gICAgICAgIGxldCBvcmRlclByb2R1Y3RzID0gb3JkZXIub3JkZXJfaXRlbXM7XG4gICAgICAgIC8vY29uc29sZS5sb2cob3JkZXIpO1xuICAgICAgICBcbiAgICAgICAgb3JkZXJJbmZvLmlubmVySFRNTCA9ICAgYDxoMz48c3Ryb25nPiR7b3JkZXIuaWR9ICR7b3JkZXIubmFtZX08L3N0cm9uZz48L2gzPmA7XG4gICAgICAgIG9yZGVyUHJvZHVjdHMuZm9yRWFjaChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgIC8vQWRkIHByb2R1Y3QgdG8gdmlld1xuICAgICAgICAgICAgb3JkZXJJbmZvLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz0ncGlja2xpc3QnPjxwPjxzdHJvbmc+UHJvZHVrdDogPC9zdHJvbmc+JHtwcm9kdWN0LnByb2R1Y3RfaWR9IC0gJHtwcm9kdWN0Lm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5MYWdlcnBsYXRzOiA8L3N0cm9uZz4ke3Byb2R1Y3QubG9jYXRpb259PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+QW50YWw6IDwvc3Ryb25nPiR7cHJvZHVjdC5hbW91bnR9PC9wPjwvZGl2YDtcbiAgICAgICAgICAgIC8vQ2hlY2sgaWYgcHJvZHVjdCBpbiBzdG9ja1xuICAgICAgICAgICAgaWYgKHByb2R1Y3QuYW1vdW50ID4gcHJvZHVjdHMuZ2V0U3RvY2socHJvZHVjdC5wcm9kdWN0X2lkKSkge1xuICAgICAgICAgICAgICAgIGluU3RvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBPcmRlcjogJHtwcm9kdWN0LmFtb3VudH0gJiBTdG9jazogJHtwcm9kdWN0cy5nZXRTdG9jayhwcm9kdWN0LnByb2R1Y3RfaWQpfWApXG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChvcmRlckluZm8pO1xuXG4gICAgICAgIC8vQ2hlY2sgaWYgYWxsIHByb2R1Y3RzIGFyZSBpbiBzdG9jaywgaWYgdHJ1ZSBzaG93IGJ1dHRvbiBmb3IgY2hhbmdpbmcgc3RhdHVzXG4gICAgICAgIGlmIChpblN0b2NrKSB7XG4gICAgICAgICAgICBsZXQgY2hhbmdlU3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNoYW5nZVN0YXR1cy5jbGFzc05hbWUgPSBcImJ1dHRvblwiO1xuICAgICAgICAgICAgY2hhbmdlU3RhdHVzLnRleHRDb250ZW50ID0gXCJNYXJrZXJhIG9yZGVyIHNvbSBwYWNrYWRcIjtcbiAgICAgICAgICAgIGNoYW5nZVN0YXR1cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG9yZGVycy51cGRhdGVPcmRlcihvcmRlci5pZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9yZGVybiBoYXIgcGFja2F0c1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGFuZ2VTdGF0dXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdpbmRvdy5tYWluQ29udGFpbmVyKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IG9yZGVyRGV0YWlscyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG9yZGVycyB9IGZyb20gXCIuLi9vcmRlcnMuanNcIjtcbmltcG9ydCB7IG9yZGVyRGV0YWlscyB9IGZyb20gXCIuL29yZGVyX2RldGFpbHMuanNcIjtcbmltcG9ydCB7IG1lbnUgfSBmcm9tIFwiLi9tZW51LmpzXCI7XG5cbnZhciBvcmRlcmxpc3QgPSB7XG5cbiAgICBzaG93T3JkZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9yZGVycy5nZXRBbGxPcmRlcnMob3JkZXJsaXN0LnJlbmRlck9yZGVycyk7XG4gICAgfSxcbiAgICBcbiAgICByZW5kZXJPcmRlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9DbGVhbiB1cCBwYWdlIGZyb20gb2xkIGNvbnRlbnRcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgICAgICAgdGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiTnkgb3JkZXJcIjtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gICAgICAgIG9yZGVycy5hbGxPcmRlcnMubWFwKGZ1bmN0aW9uIChkYXRhT3JkZXIpIHtcbiAgICAgICAgICAgIGxldCBvcmRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcblxuICAgICAgICAgICAgb3JkZXJFbGVtZW50LmlkID0gZGF0YU9yZGVyLmlkO1xuICAgICAgICAgICAgb3JkZXJFbGVtZW50LnRleHRDb250ZW50ID0gYCR7ZGF0YU9yZGVyLm5hbWV9YDtcbiAgICAgICAgICAgIG9yZGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3JkZXJEZXRhaWxzLnNob3dPcmRlcik7XG4gICAgICAgICAgICBvcmRlckVsZW1lbnQuY2xhc3NOYW1lID0gXCJsaXN0TGlua1wiO1xuXG4gICAgICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChvcmRlckVsZW1lbnQpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgbWVudS5zaG93TWVudShcImxvY2FsX3NoaXBwaW5nXCIpO1xuICAgIH1cblxufTtcblxuZXhwb3J0IHsgb3JkZXJsaXN0IH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiLi4vcHJvZHVjdHMuanNcIjtcbmltcG9ydCB7IHdhcmVob3VzZSB9IGZyb20gXCIuL3dhcmVob3VzZS5qc1wiO1xuXG52YXIgcHJvZHVjdERldGFpbHMgPSB7XG5cbiAgICBzaG93UHJvZHVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgLy9DbGVhbiB1cCBwYWdlIGZyb20gb2xkIGNvbnRlbnRcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGxldCBuYXZCYWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGxldCBwcm9kSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgdGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiUHJvZHVrdGRldGFsamVyXCI7XG5cbiAgICAgICAgcHJvZEluZm8uY2xhc3NOYW1lID0gXCJwcm9kdWN0XCI7XG5cbiAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uY2xhc3NOYW1lID0gXCJ0b3AtbmF2XCI7XG5cbiAgICAgICAgbmF2QmFjay5jbGFzc05hbWUgPSBcIm5hdl9idXR0b25cIjtcbiAgICAgICAgbmF2QmFjay50ZXh0Q29udGVudCA9IFwiVGlsbGJha2EgdGlsbCBsYWdlclwiO1xuICAgICAgICBuYXZCYWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5jbGFzc05hbWUgPSBcImJvdHRvbS1uYXZcIjtcbiAgICAgICAgICAgIHdhcmVob3VzZS5zaG93UHJvZHVjdHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uYXBwZW5kQ2hpbGQobmF2QmFjayk7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvZEluZm8pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmlkKTtcbiAgICAgICAgbGV0IGlkID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkKTtcblxuICAgICAgICAvL0dldCBwcm9kdWN0IGZyb20gcHJvZHVjdHMgbGlzdFxuICAgICAgICBsZXQgcHJvZHVjdCA9IHByb2R1Y3RzLmdldFByb2R1Y3QoaWQpO1xuICAgICAgICBcbiAgICAgICAgcHJvZEluZm8uaW5uZXJIVE1MID0gICBgPHA+PHN0cm9uZz4ke3Byb2R1Y3QubmFtZX08L3N0cm9uZz48L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+SWQ6IDwvc3Ryb25nPiR7cHJvZHVjdC5pZH08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+QXJ0aWtlbG51bW1lcjogPC9zdHJvbmc+JHtwcm9kdWN0LmFydGljbGVfbnVtYmVyfTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5QbGF0czogPC9zdHJvbmc+JHtwcm9kdWN0LmxvY2F0aW9ufTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5CZXNrcml2bmluZzogPC9zdHJvbmc+JHtwcm9kdWN0LmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5TcGVjaWZpa2F0aW9uOiA8L3N0cm9uZz4ke3Byb2R1Y3Quc3BlY2lmaWVyc308L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+UHJpczogPC9zdHJvbmc+JHtwcm9kdWN0LnByaWNlfWtyPC9wPlxuICAgICAgICA8cD48c3Ryb25nPkFudGFsIGkgbGFnZXI6IDwvc3Ryb25nPiR7cHJvZHVjdC5zdG9ja308L3A+YDtcblxuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBwcm9kdWN0RGV0YWlscyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHByb2R1Y3RzIH0gZnJvbSBcIi4uL3Byb2R1Y3RzLmpzXCI7XG5pbXBvcnQgeyBwcm9kdWN0RGV0YWlscyB9IGZyb20gXCIuL3Byb2R1Y3RfZGV0YWlscy5qc1wiO1xuaW1wb3J0IHsgbWVudSB9IGZyb20gXCIuL21lbnUuanNcIjtcblxudmFyIHdhcmVob3VzZSA9IHtcblxuICAgIHNob3dQcm9kdWN0czogZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9kdWN0cy5nZXRBbGxQcm9kdWN0cyh3YXJlaG91c2UucmVuZGVyUHJvZHVjdHMpO1xuICAgIH0sXG4gICAgXG4gICAgcmVuZGVyUHJvZHVjdHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9DbGVhbiB1cCBwYWdlIGZyb20gb2xkIGNvbnRlbnRcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgICAgICAgdGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiTGFnZXJcIjtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gICAgICAgIHByb2R1Y3RzLmFsbFByb2R1Y3RzLm1hcChmdW5jdGlvbiAoZGF0YVByb2R1Y3QpIHtcbiAgICAgICAgICAgIGxldCBwcm9kRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuXG4gICAgICAgICAgICBwcm9kRWxlbWVudC5pZCA9IGRhdGFQcm9kdWN0LmlkO1xuICAgICAgICAgICAgcHJvZEVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtkYXRhUHJvZHVjdC5uYW1lfTogICAgJHtkYXRhUHJvZHVjdC5zdG9ja31zdGA7XG4gICAgICAgICAgICBwcm9kRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvZHVjdERldGFpbHMuc2hvd1Byb2R1Y3QpO1xuICAgICAgICAgICAgcHJvZEVsZW1lbnQuY2xhc3NOYW1lID0gXCJsaXN0TGlua1wiO1xuXG4gICAgICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9kRWxlbWVudCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdpbmRvdy5tYWluQ29udGFpbmVyKTtcblxuICAgICAgICBtZW51LnNob3dNZW51KFwic3RvcmFnZVwiKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IHdhcmVob3VzZSB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgaG9tZSB9IGZyb20gXCIuL3ZpZXdzL2hvbWUuanNcIjtcblxuLy9JSUZFIChJbW1lZGlhdGVseS1JbnZva2VkIEZ1bmN0aW9uIEV4cHJlc3Npb24pXG4oZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5yb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcbiAgICB3aW5kb3cubWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuICAgIHdpbmRvdy5uYXZpZ2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm5hdlwiKTtcblxuICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiY29udGFpbmVyXCI7XG4gICAgd2luZG93Lm5hdmlnYXRpb24uY2xhc3NOYW1lID0gXCJib3R0b20tbmF2XCI7XG5cbiAgICBob21lLnNob3dIb21lKCk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==