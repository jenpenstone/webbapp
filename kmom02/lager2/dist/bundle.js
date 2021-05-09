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
        fetch(`${_vars_js__WEBPACK_IMPORTED_MODULE_1__.baseUrl}orders?api_key=${_vars_js__WEBPACK_IMPORTED_MODULE_1__.apiKey}`)
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

            _products_js__WEBPACK_IMPORTED_MODULE_0__.products.updateStock(pId, amount);
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
            api_key: _vars_js__WEBPACK_IMPORTED_MODULE_1__.apiKey
        };

        fetch(`${_vars_js__WEBPACK_IMPORTED_MODULE_1__.baseUrl}orders`, {
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
        fetch(`${_vars_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}products?api_key=${_vars_js__WEBPACK_IMPORTED_MODULE_0__.apiKey}`)
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
            api_key: _vars_js__WEBPACK_IMPORTED_MODULE_0__.apiKey
        };

        fetch(`${_vars_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}products`, {
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




/***/ }),

/***/ "./js/vars.js":
/*!********************!*\
  !*** ./js/vars.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiKey": () => (/* binding */ apiKey),
/* harmony export */   "baseUrl": () => (/* binding */ baseUrl)
/* harmony export */ });


const apiKey = "3cb000840c1b4e98df0c9e064ae0cb89";
const baseUrl = "https://lager.emilfolino.se/v2/";




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
            var pId = product.product_id;

            orderInfo.innerHTML += `<div class='picklist'><p><strong>Produkt: 
                                    </strong>${product.product_id} - ${product.name}</p>
                                    <p><strong>Lagerplats: </strong>${product.location}</p>
                                     <p><strong>Antal: </strong>${product.amount}</p></div`;
            //Check if product in stock
            if (product.amount > _products_js__WEBPACK_IMPORTED_MODULE_2__.products.getStock(pId)) {
                inStock = false;
            }
            console.log(`Order: ${product.amount} & Stock: ${_products_js__WEBPACK_IMPORTED_MODULE_2__.products.getStock(pId)}`);
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

    showProduct: function (productId) {
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

        //Get product from products list
        let product = _products_js__WEBPACK_IMPORTED_MODULE_0__.products.getProduct(productId);

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

        let prodHeader = document.createElement("div");

        prodHeader.className = "listHeader";
        prodHeader.innerHTML = `<h4>Namn</h4><h4>Antal i lager</h4>`;

        window.mainContainer.appendChild(prodHeader);

        _products_js__WEBPACK_IMPORTED_MODULE_0__.products.allProducts.map(function (dataProduct) {
            let prodElement = document.createElement("div");

            prodElement.innerHTML = `<p>${dataProduct.name}</p><p>${dataProduct.stock}</p>`;
            prodElement.addEventListener("click", function() {
                _product_details_js__WEBPACK_IMPORTED_MODULE_1__.productDetails.showProduct(dataProduct.id);
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9vcmRlcnMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvcHJvZHVjdHMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvdmFycy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy92aWV3cy9ob21lLmpzIiwid2VicGFjazovL2xhZ2VyMi8uL2pzL3ZpZXdzL21lbnUuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvdmlld3Mvb3JkZXJfZGV0YWlscy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy92aWV3cy9vcmRlcmxpc3QuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvdmlld3MvcHJvZHVjdF9kZXRhaWxzLmpzIiwid2VicGFjazovL2xhZ2VyMi8uL2pzL3ZpZXdzL3dhcmVob3VzZS5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGFnZXIyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBYTs7QUFFNEI7QUFDRzs7QUFFNUM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsNkNBQU8sQ0FBQyxpQkFBaUIsNENBQU0sQ0FBQztBQUNqRDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2IsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVksOERBQW9CO0FBQ2hDLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDRDQUFNO0FBQzNCOztBQUVBLGlCQUFpQiw2Q0FBTyxDQUFDO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7OztBQ25FTDs7QUFFK0I7O0FBRTVDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLDZDQUFPLENBQUMsbUJBQW1CLDRDQUFNLENBQUM7QUFDbkQ7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDRDQUFNO0FBQzNCOztBQUVBLGlCQUFpQiw2Q0FBTyxDQUFDO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFb0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RFA7O0FBRWI7QUFDQTs7QUFFeUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMWjs7QUFFb0I7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxRQUFRLG1EQUFhO0FBQ3JCOztBQUVBOztBQUVnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJIOztBQUVvQjtBQUNVO0FBQ0E7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLG1DQUFtQyxtREFBYSxDQUFDO0FBQzlELGFBQWEsc0NBQXNDLGlFQUFzQixDQUFDO0FBQzFFLGFBQWEsNkNBQTZDLCtEQUFvQjtBQUM5RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBOztBQUVnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0NIOztBQUV5QjtBQUNLO0FBQ0Q7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrREFBb0I7QUFDaEMsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLHVEQUFlO0FBQ25DO0FBQ0E7O0FBRUEsK0NBQStDLFNBQVMsR0FBRyxXQUFXO0FBQ3RFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyxtQkFBbUIsS0FBSyxhQUFhO0FBQ3BGLHNFQUFzRSxpQkFBaUI7QUFDdkYsa0VBQWtFLGVBQWU7QUFDakY7QUFDQSxpQ0FBaUMsMkRBQWlCO0FBQ2xEO0FBQ0E7QUFDQSxrQ0FBa0MsZUFBZSxZQUFZLDJEQUFpQixNQUFNO0FBQ3BGLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwwREFBa0I7O0FBRWxDO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRXdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRlg7O0FBRXlCO0FBQ1k7QUFDakI7O0FBRWpDOztBQUVBO0FBQ0EsUUFBUSwyREFBbUI7QUFDM0IsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQVEsNERBQW9CO0FBQzVCOztBQUVBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQsbURBQW1ELHFFQUFzQjtBQUN6RTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUEsUUFBUSxtREFBYTtBQUNyQjs7QUFFQTs7QUFFcUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeENSOztBQUU2QjtBQUNDOztBQUUzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksaUVBQXNCO0FBQ2xDLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLDZEQUFtQjs7QUFFekMsNkNBQTZDLGFBQWE7QUFDMUQsa0NBQWtDLFdBQVc7QUFDN0MsNkNBQTZDLHVCQUF1QjtBQUNwRSxxQ0FBcUMsaUJBQWlCO0FBQ3RELDJDQUEyQyxvQkFBb0I7QUFDL0QsNkNBQTZDLG1CQUFtQjtBQUNoRSxvQ0FBb0MsY0FBYztBQUNsRCw2Q0FBNkMsY0FBYzs7O0FBRzNEO0FBQ0E7O0FBRUE7O0FBRTBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRGI7O0FBRTZCO0FBQ1k7QUFDckI7O0FBRWpDOztBQUVBO0FBQ0EsUUFBUSxpRUFBdUI7QUFDL0IsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUSxrRUFBd0I7QUFDaEM7O0FBRUEsMENBQTBDLGlCQUFpQixTQUFTLGtCQUFrQjtBQUN0RjtBQUNBLGdCQUFnQiwyRUFBMEI7QUFDMUMsYUFBYTtBQUNiOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQSxRQUFRLG1EQUFhO0FBQ3JCOztBQUVBOztBQUVxQjs7Ozs7OztVQ2hEckI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOYTs7QUFFMEI7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxJQUFJLHlEQUFhO0FBQ2pCLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHByb2R1Y3RzIH0gZnJvbSBcIi4vcHJvZHVjdHMuanNcIjtcbmltcG9ydCB7IGFwaUtleSwgYmFzZVVybCB9IGZyb20gXCIuL3ZhcnMuanNcIjtcblxudmFyIG9yZGVycyA9IHtcblxuICAgIGFsbE9yZGVyczogW10sXG5cbiAgICBnZXRBbGxPcmRlcnM6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChvcmRlcnMuYWxsT3JkZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HZXQgY29udGVudCBmcm9tIExhZ2VyIEFQSVxuICAgICAgICBmZXRjaChgJHtiYXNlVXJsfW9yZGVycz9hcGlfa2V5PSR7YXBpS2V5fWApXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgb3JkZXJzLmFsbE9yZGVycyA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0T3JkZXI6IGZ1bmN0aW9uKG9yZGVySWQpIHtcbiAgICAgICAgcmV0dXJuIG9yZGVycy5hbGxPcmRlcnMuZmluZChvcmRlciA9PiBvcmRlci5pZCA9PT0gb3JkZXJJZCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZVByb2R1Y3RzOiBmdW5jdGlvbihvcmRlcikge1xuICAgICAgICBvcmRlci5mb3JFYWNoKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgLy91cGRhdGUgc3RvY2sgZm9yIHByb2R1Y3RcbiAgICAgICAgICAgIHZhciBwSWQgPSBwcm9kdWN0LnByb2R1Y3RfaWQ7XG4gICAgICAgICAgICB2YXIgYW1vdW50ID0gcHJvZHVjdC5hbW91bnQ7XG5cbiAgICAgICAgICAgIHByb2R1Y3RzLnVwZGF0ZVN0b2NrKHBJZCwgYW1vdW50KTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZU9yZGVyOiBmdW5jdGlvbihvcmRlcklkKSB7XG4gICAgICAgIC8vZ2V0IG9yZGVyIGluZm9cbiAgICAgICAgdmFyIG9yZGVyID0gb3JkZXJzLmdldE9yZGVyKG9yZGVySWQpO1xuXG4gICAgICAgIC8vdXBkYXRlIHN0YXR1cyBpbiBMYWdlciBBUElcbiAgICAgICAgdmFyIG9yZGVyRGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiBvcmRlcklkLFxuICAgICAgICAgICAgbmFtZTogb3JkZXIubmFtZSxcbiAgICAgICAgICAgIHN0YXR1c19pZDogMjAwLFxuICAgICAgICAgICAgYXBpX2tleTogYXBpS2V5XG4gICAgICAgIH07XG5cbiAgICAgICAgZmV0Y2goYCR7YmFzZVVybH1vcmRlcnNgLCB7XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvcmRlckRhdGEpLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJzLnVwZGF0ZVByb2R1Y3RzKG9yZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5leHBvcnQgeyBvcmRlcnMgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcGlLZXksIGJhc2VVcmwgfSBmcm9tIFwiLi92YXJzLmpzXCI7XG5cbnZhciBwcm9kdWN0cyA9IHtcblxuICAgIGFsbFByb2R1Y3RzOiBbXSxcblxuICAgIGdldEFsbFByb2R1Y3RzOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBpZiAocHJvZHVjdHMuYWxsUHJvZHVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0dldCBjb250ZW50IGZyb20gTGFnZXIgQVBJXG4gICAgICAgIGZldGNoKGAke2Jhc2VVcmx9cHJvZHVjdHM/YXBpX2tleT0ke2FwaUtleX1gKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RzLmFsbFByb2R1Y3RzID0gcmVzdWx0LmRhdGE7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBnZXRQcm9kdWN0OiBmdW5jdGlvbihwcm9kdWN0SWQpIHtcbiAgICAgICAgcmV0dXJuIHByb2R1Y3RzLmFsbFByb2R1Y3RzLmZpbmQocHJvZHVjdCA9PiBwcm9kdWN0LmlkID09PSBwcm9kdWN0SWQpO1xuICAgIH0sXG5cbiAgICB1cERhdGVQcm9kdWN0OiBmdW5jdGlvbihwcm9kdWN0SWQsIGFtb3VudCkge1xuICAgICAgICB2YXIgcHJvZHVjdCA9IHByb2R1Y3RzLmdldFByb2R1Y3QocHJvZHVjdElkKTtcbiAgICAgICAgdmFyIG5ld1N0b2NrID0gcHJvZHVjdC5pZCAtIGFtb3VudDtcblxuICAgICAgICB2YXIgcHJvZERhdGEgPSB7XG4gICAgICAgICAgICBpZDogcHJvZHVjdC5pZCxcbiAgICAgICAgICAgIG5hbWU6IHByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgIHN0b2NrOiBuZXdTdG9jayxcbiAgICAgICAgICAgIGFwaV9rZXk6IGFwaUtleVxuICAgICAgICB9O1xuXG4gICAgICAgIGZldGNoKGAke2Jhc2VVcmx9cHJvZHVjdHNgLCB7XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwcm9kRGF0YSksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0U3RvY2s6IGZ1bmN0aW9uKHByb2R1Y3RJZCkge1xuICAgICAgICBsZXQgcHJvZCA9IHByb2R1Y3RzLmdldFByb2R1Y3QocHJvZHVjdElkKTtcblxuICAgICAgICByZXR1cm4gcHJvZC5zdG9jaztcbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IHByb2R1Y3RzIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgYXBpS2V5ID0gXCIzY2IwMDA4NDBjMWI0ZTk4ZGYwYzllMDY0YWUwY2I4OVwiO1xuY29uc3QgYmFzZVVybCA9IFwiaHR0cHM6Ly9sYWdlci5lbWlsZm9saW5vLnNlL3YyL1wiO1xuXG5leHBvcnQge2FwaUtleSwgYmFzZVVybH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgbWVudSB9IGZyb20gXCIuL21lbnUuanNcIjtcblxudmFyIGhvbWUgPSB7XG4gICAgc2hvd0hvbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9DbGVhbiB1cCBwYWdlIGZyb20gb2xkIGNvbnRlbnRcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgICAgICAgdGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiU3RhcnRcIjtcblxuICAgICAgICBsZXQgZ3JlZXRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICAgICAgICBncmVldGluZy50ZXh0Q29udGVudCA9IGBWw6Rsa29tbWVuIHRpbGwgbGFnZXItYXBwZW4hIEjDpHIga2FuIGR1IGhhbnRlcmEgYnV0aWtlbnMgcHJvZHVrdGVyLmA7XG5cbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChncmVldGluZyk7XG5cbiAgICAgICAgd2luZG93LnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdpbmRvdy5tYWluQ29udGFpbmVyKTtcblxuICAgICAgICBtZW51LnNob3dNZW51KFwiaG9tZVwiKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IGhvbWUgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBob21lIH0gZnJvbSBcIi4vaG9tZS5qc1wiO1xuaW1wb3J0IHsgd2FyZWhvdXNlIH0gZnJvbSBcIi4vd2FyZWhvdXNlLmpzXCI7XG5pbXBvcnQgeyBvcmRlcmxpc3QgfSBmcm9tIFwiLi9vcmRlcmxpc3QuanNcIjtcblxudmFyIG1lbnUgPSB7XG4gICAgc2hvd01lbnU6IGZ1bmN0aW9uIChzZWxlY3RlZCkge1xuICAgICAgICAvL0NsZWFuIHVwIG5hdmlnYXRpb24gZnJvbSBvbGQgY29udGVudFxuICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIC8vY3JlYXRlIG1lbnUgYW5kIGFkZCBzdHlsZS1jbGFzcyBhbmQgZnVuY3Rpb24gZm9yIHdoZW4gbmF2IGlzIGNsaWNrZWQgb24uXG4gICAgICAgIGxldCBuYXZFbGVtZW50cyA9IFtcbiAgICAgICAgICAgIHtuYW1lOiBcIlN0YXJ0XCIsIGNsYXNzOiBcImhvbWVcIiwgbmF2OiBob21lLnNob3dIb21lfSxcbiAgICAgICAgICAgIHtuYW1lOiBcIkxhZ2VyXCIsIGNsYXNzOiBcInN0b3JhZ2VcIiwgbmF2OiB3YXJlaG91c2Uuc2hvd1Byb2R1Y3RzfSxcbiAgICAgICAgICAgIHtuYW1lOiBcIk9yZGVyXCIsIGNsYXNzOiBcImxvY2FsX3NoaXBwaW5nXCIsIG5hdjogb3JkZXJsaXN0LnNob3dPcmRlcnN9XG4gICAgICAgIF07XG5cbiAgICAgICAgbmF2RWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkID09PSBlbGVtZW50LmNsYXNzKSB7XG4gICAgICAgICAgICAgICAgbmF2RWxlbWVudC5jbGFzc05hbWUgPSBcImFjdGl2ZVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuYXZFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlbGVtZW50Lm5hdik7XG5cbiAgICAgICAgICAgIGxldCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgICAgICAgICAgIGljb24uY2xhc3NOYW1lID0gXCJtYXRlcmlhbC1pY29uc1wiO1xuICAgICAgICAgICAgaWNvbi50ZXh0Q29udGVudCA9IGVsZW1lbnQuY2xhc3M7XG4gICAgICAgICAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKGljb24pO1xuXG4gICAgICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9IFwiaWNvbi10ZXh0XCI7XG4gICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gZWxlbWVudC5uYW1lO1xuICAgICAgICAgICAgbmF2RWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uYXBwZW5kQ2hpbGQobmF2RWxlbWVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubmF2aWdhdGlvbik7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBtZW51IH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgb3JkZXJzIH0gZnJvbSBcIi4uL29yZGVycy5qc1wiO1xuaW1wb3J0IHsgb3JkZXJsaXN0IH0gZnJvbSBcIi4vb3JkZXJsaXN0LmpzXCI7XG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuLi9wcm9kdWN0cy5qc1wiO1xuXG52YXIgb3JkZXJEZXRhaWxzID0ge1xuXG4gICAgc2hvd09yZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vQ2xlYW4gdXAgcGFnZSBmcm9tIG9sZCBjb250ZW50XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBsZXQgbmF2QmFjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICBsZXQgb3JkZXJJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRpdGxlXCI7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJQbG9ja2xpc3RhXCI7XG5cbiAgICAgICAgb3JkZXJJbmZvLmNsYXNzTmFtZSA9IFwib3JkZXJcIjtcblxuICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5jbGFzc05hbWUgPSBcInRvcC1uYXZcIjtcblxuICAgICAgICBuYXZCYWNrLmNsYXNzTmFtZSA9IFwibmF2X2J1dHRvblwiO1xuICAgICAgICBuYXZCYWNrLnRleHRDb250ZW50ID0gXCJUaWxsYmFrYSB0aWxsIG9yZGVyXCI7XG4gICAgICAgIG5hdkJhY2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmNsYXNzTmFtZSA9IFwiYm90dG9tLW5hdlwiO1xuICAgICAgICAgICAgb3JkZXJsaXN0LnNob3dPcmRlcnMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uYXBwZW5kQ2hpbGQobmF2QmFjayk7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQob3JkZXJJbmZvKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50LnRhcmdldC5pZCk7XG4gICAgICAgIHZhciBpZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZCk7XG4gICAgICAgIHZhciBpblN0b2NrID0gdHJ1ZTtcblxuICAgICAgICAvL0dldCBvcmRlciBmcm9tIG9yZGVyc1xuICAgICAgICB2YXIgb3JkZXIgPSBvcmRlcnMuZ2V0T3JkZXIoaWQpO1xuICAgICAgICB2YXIgb3JkZXJQcm9kdWN0cyA9IG9yZGVyLm9yZGVyX2l0ZW1zO1xuICAgICAgICAvL2NvbnNvbGUubG9nKG9yZGVyKTtcblxuICAgICAgICBvcmRlckluZm8uaW5uZXJIVE1MID0gICBgPGgzPjxzdHJvbmc+JHtvcmRlci5pZH0gJHtvcmRlci5uYW1lfTwvc3Ryb25nPjwvaDM+YDtcbiAgICAgICAgb3JkZXJQcm9kdWN0cy5mb3JFYWNoKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgLy9BZGQgcHJvZHVjdCB0byB2aWV3XG4gICAgICAgICAgICB2YXIgcElkID0gcHJvZHVjdC5wcm9kdWN0X2lkO1xuXG4gICAgICAgICAgICBvcmRlckluZm8uaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPSdwaWNrbGlzdCc+PHA+PHN0cm9uZz5Qcm9kdWt0OiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPiR7cHJvZHVjdC5wcm9kdWN0X2lkfSAtICR7cHJvZHVjdC5uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+TGFnZXJwbGF0czogPC9zdHJvbmc+JHtwcm9kdWN0LmxvY2F0aW9ufTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkFudGFsOiA8L3N0cm9uZz4ke3Byb2R1Y3QuYW1vdW50fTwvcD48L2RpdmA7XG4gICAgICAgICAgICAvL0NoZWNrIGlmIHByb2R1Y3QgaW4gc3RvY2tcbiAgICAgICAgICAgIGlmIChwcm9kdWN0LmFtb3VudCA+IHByb2R1Y3RzLmdldFN0b2NrKHBJZCkpIHtcbiAgICAgICAgICAgICAgICBpblN0b2NrID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgT3JkZXI6ICR7cHJvZHVjdC5hbW91bnR9ICYgU3RvY2s6ICR7cHJvZHVjdHMuZ2V0U3RvY2socElkKX1gKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQob3JkZXJJbmZvKTtcblxuICAgICAgICAvL0NoZWNrIGlmIGFsbCBwcm9kdWN0cyBhcmUgaW4gc3RvY2ssIGlmIHRydWUgc2hvdyBidXR0b24gZm9yIGNoYW5naW5nIHN0YXR1c1xuICAgICAgICBpZiAoaW5TdG9jaykge1xuICAgICAgICAgICAgbGV0IGNoYW5nZVN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgIGNoYW5nZVN0YXR1cy5jbGFzc05hbWUgPSBcImJ1dHRvblwiO1xuICAgICAgICAgICAgY2hhbmdlU3RhdHVzLnRleHRDb250ZW50ID0gXCJNYXJrZXJhIG9yZGVyIHNvbSBwYWNrYWRcIjtcbiAgICAgICAgICAgIGNoYW5nZVN0YXR1cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG9yZGVycy51cGRhdGVPcmRlcihvcmRlci5pZCk7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9yZGVybiBoYXIgcGFja2F0c1wiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGFuZ2VTdGF0dXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdpbmRvdy5tYWluQ29udGFpbmVyKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IG9yZGVyRGV0YWlscyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG9yZGVycyB9IGZyb20gXCIuLi9vcmRlcnMuanNcIjtcbmltcG9ydCB7IG9yZGVyRGV0YWlscyB9IGZyb20gXCIuL29yZGVyX2RldGFpbHMuanNcIjtcbmltcG9ydCB7IG1lbnUgfSBmcm9tIFwiLi9tZW51LmpzXCI7XG5cbnZhciBvcmRlcmxpc3QgPSB7XG5cbiAgICBzaG93T3JkZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9yZGVycy5nZXRBbGxPcmRlcnMob3JkZXJsaXN0LnJlbmRlck9yZGVycyk7XG4gICAgfSxcblxuICAgIHJlbmRlck9yZGVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL0NsZWFuIHVwIHBhZ2UgZnJvbSBvbGQgY29udGVudFxuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRpdGxlXCI7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJOeSBvcmRlclwiO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICAgICAgb3JkZXJzLmFsbE9yZGVycy5tYXAoZnVuY3Rpb24gKGRhdGFPcmRlcikge1xuICAgICAgICAgICAgbGV0IG9yZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuXG4gICAgICAgICAgICBvcmRlckVsZW1lbnQuaWQgPSBkYXRhT3JkZXIuaWQ7XG4gICAgICAgICAgICBvcmRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtkYXRhT3JkZXIubmFtZX1gO1xuICAgICAgICAgICAgb3JkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcmRlckRldGFpbHMuc2hvd09yZGVyKTtcbiAgICAgICAgICAgIG9yZGVyRWxlbWVudC5jbGFzc05hbWUgPSBcImxpc3RMaW5rXCI7XG5cbiAgICAgICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKG9yZGVyRWxlbWVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgbWVudS5zaG93TWVudShcImxvY2FsX3NoaXBwaW5nXCIpO1xuICAgIH1cblxufTtcblxuZXhwb3J0IHsgb3JkZXJsaXN0IH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiLi4vcHJvZHVjdHMuanNcIjtcbmltcG9ydCB7IHdhcmVob3VzZSB9IGZyb20gXCIuL3dhcmVob3VzZS5qc1wiO1xuXG52YXIgcHJvZHVjdERldGFpbHMgPSB7XG5cbiAgICBzaG93UHJvZHVjdDogZnVuY3Rpb24gKHByb2R1Y3RJZCkge1xuICAgICAgICAvL0NsZWFuIHVwIHBhZ2UgZnJvbSBvbGQgY29udGVudFxuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgbGV0IG5hdkJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgbGV0IHByb2RJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRpdGxlXCI7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJQcm9kdWt0ZGV0YWxqZXJcIjtcblxuICAgICAgICBwcm9kSW5mby5jbGFzc05hbWUgPSBcInByb2R1Y3RcIjtcblxuICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5jbGFzc05hbWUgPSBcInRvcC1uYXZcIjtcblxuICAgICAgICBuYXZCYWNrLmNsYXNzTmFtZSA9IFwibmF2X2J1dHRvblwiO1xuICAgICAgICBuYXZCYWNrLnRleHRDb250ZW50ID0gXCJUaWxsYmFrYSB0aWxsIGxhZ2VyXCI7XG4gICAgICAgIG5hdkJhY2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmNsYXNzTmFtZSA9IFwiYm90dG9tLW5hdlwiO1xuICAgICAgICAgICAgd2FyZWhvdXNlLnNob3dQcm9kdWN0cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5hcHBlbmRDaGlsZChuYXZCYWNrKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9kSW5mbyk7XG5cbiAgICAgICAgLy9HZXQgcHJvZHVjdCBmcm9tIHByb2R1Y3RzIGxpc3RcbiAgICAgICAgbGV0IHByb2R1Y3QgPSBwcm9kdWN0cy5nZXRQcm9kdWN0KHByb2R1Y3RJZCk7XG5cbiAgICAgICAgcHJvZEluZm8uaW5uZXJIVE1MID0gICBgPHA+PHN0cm9uZz4ke3Byb2R1Y3QubmFtZX08L3N0cm9uZz48L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+SWQ6IDwvc3Ryb25nPiR7cHJvZHVjdC5pZH08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+QXJ0aWtlbG51bW1lcjogPC9zdHJvbmc+JHtwcm9kdWN0LmFydGljbGVfbnVtYmVyfTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5QbGF0czogPC9zdHJvbmc+JHtwcm9kdWN0LmxvY2F0aW9ufTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5CZXNrcml2bmluZzogPC9zdHJvbmc+JHtwcm9kdWN0LmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5TcGVjaWZpa2F0aW9uOiA8L3N0cm9uZz4ke3Byb2R1Y3Quc3BlY2lmaWVyc308L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+UHJpczogPC9zdHJvbmc+JHtwcm9kdWN0LnByaWNlfWtyPC9wPlxuICAgICAgICA8cD48c3Ryb25nPkFudGFsIGkgbGFnZXI6IDwvc3Ryb25nPiR7cHJvZHVjdC5zdG9ja308L3A+YDtcblxuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBwcm9kdWN0RGV0YWlscyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHByb2R1Y3RzIH0gZnJvbSBcIi4uL3Byb2R1Y3RzLmpzXCI7XG5pbXBvcnQgeyBwcm9kdWN0RGV0YWlscyB9IGZyb20gXCIuL3Byb2R1Y3RfZGV0YWlscy5qc1wiO1xuaW1wb3J0IHsgbWVudSB9IGZyb20gXCIuL21lbnUuanNcIjtcblxudmFyIHdhcmVob3VzZSA9IHtcblxuICAgIHNob3dQcm9kdWN0czogZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9kdWN0cy5nZXRBbGxQcm9kdWN0cyh3YXJlaG91c2UucmVuZGVyUHJvZHVjdHMpO1xuICAgIH0sXG5cbiAgICByZW5kZXJQcm9kdWN0czogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL0NsZWFuIHVwIHBhZ2UgZnJvbSBvbGQgY29udGVudFxuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRpdGxlXCI7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJMYWdlclwiO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICAgICAgbGV0IHByb2RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgIHByb2RIZWFkZXIuY2xhc3NOYW1lID0gXCJsaXN0SGVhZGVyXCI7XG4gICAgICAgIHByb2RIZWFkZXIuaW5uZXJIVE1MID0gYDxoND5OYW1uPC9oND48aDQ+QW50YWwgaSBsYWdlcjwvaDQ+YDtcblxuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9kSGVhZGVyKTtcblxuICAgICAgICBwcm9kdWN0cy5hbGxQcm9kdWN0cy5tYXAoZnVuY3Rpb24gKGRhdGFQcm9kdWN0KSB7XG4gICAgICAgICAgICBsZXQgcHJvZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgICAgICBwcm9kRWxlbWVudC5pbm5lckhUTUwgPSBgPHA+JHtkYXRhUHJvZHVjdC5uYW1lfTwvcD48cD4ke2RhdGFQcm9kdWN0LnN0b2NrfTwvcD5gO1xuICAgICAgICAgICAgcHJvZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHByb2R1Y3REZXRhaWxzLnNob3dQcm9kdWN0KGRhdGFQcm9kdWN0LmlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJvZEVsZW1lbnQuY2xhc3NOYW1lID0gXCJsaXN0TGlua1wiO1xuXG4gICAgICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9kRWxlbWVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgbWVudS5zaG93TWVudShcInN0b3JhZ2VcIik7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyB3YXJlaG91c2UgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGhvbWUgfSBmcm9tIFwiLi92aWV3cy9ob21lLmpzXCI7XG5cbi8vSUlGRSAoSW1tZWRpYXRlbHktSW52b2tlZCBGdW5jdGlvbiBFeHByZXNzaW9uKVxuKGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XG4gICAgd2luZG93Lm1haW5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgICB3aW5kb3cubmF2aWdhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIik7XG5cbiAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNvbnRhaW5lclwiO1xuICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmNsYXNzTmFtZSA9IFwiYm90dG9tLW5hdlwiO1xuXG4gICAgaG9tZS5zaG93SG9tZSgpO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=