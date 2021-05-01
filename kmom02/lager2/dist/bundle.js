/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/home.js":
/*!********************!*\
  !*** ./js/home.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "home": () => (/* binding */ home)
/* harmony export */ });
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.js */ "./js/menu.js");




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

/***/ "./js/menu.js":
/*!********************!*\
  !*** ./js/menu.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menu": () => (/* binding */ menu)
/* harmony export */ });
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ "./js/home.js");
/* harmony import */ var _warehouse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./warehouse.js */ "./js/warehouse.js");





var menu = {
    showMenu: function (selected) {
        //Clean up navigation from old content
        window.navigation.innerHTML = "";

        //create menu and add style-class and function for when nav is clicked on.
        let navElements = [
            {name: "Start", class: "home", nav: _home_js__WEBPACK_IMPORTED_MODULE_0__.home.showHome},
            {name: "Lager", class: "storage", nav: _warehouse_js__WEBPACK_IMPORTED_MODULE_1__.warehouse.showProducts}
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

/***/ "./js/product.js":
/*!***********************!*\
  !*** ./js/product.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "product": () => (/* binding */ product)
/* harmony export */ });
/* harmony import */ var _warehouse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./warehouse.js */ "./js/warehouse.js");




var product = {

    showProduct: function () {
        const API_KEY = "3cb000840c1b4e98df0c9e064ae0cb89";
        const BASE_URL = "https://lager.emilfolino.se/v2";
        
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
            _warehouse_js__WEBPACK_IMPORTED_MODULE_0__.warehouse.showProducts();
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
    }

};




/***/ }),

/***/ "./js/warehouse.js":
/*!*************************!*\
  !*** ./js/warehouse.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "warehouse": () => (/* binding */ warehouse)
/* harmony export */ });
/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product.js */ "./js/product.js");
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.js */ "./js/menu.js");





var warehouse = {
    
    showProducts: function () {
        const API_KEY = "3cb000840c1b4e98df0c9e064ae0cb89";
        const BASE_URL = "https://lager.emilfolino.se/v2";

        //Clean up page from old content
        window.mainContainer.innerHTML = "";

        let title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Lager";
        window.mainContainer.appendChild(title);

        //Get content from Lager API
        fetch(`${BASE_URL}/products?api_key=${API_KEY}`)
            .then(responce => responce.json())
            .then(data => {
                //console.log(data)
                data.data.forEach(function(dataProduct) {
                    let prodElement = document.createElement("a");

                    prodElement.id = dataProduct.id;
                    prodElement.textContent = `${dataProduct.name}:    ${dataProduct.stock}st`;
                    prodElement.addEventListener("click", _product_js__WEBPACK_IMPORTED_MODULE_0__.product.showProduct);
                    prodElement.className = "productLink";

                    window.mainContainer.appendChild(prodElement);
                });
            });

        window.rootElement.appendChild(window.mainContainer);

        _menu_js__WEBPACK_IMPORTED_MODULE_1__.menu.showMenu("storage");
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
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ "./js/home.js");




//IIFE (Immediately-Invoked Function Expression)
(function () {
    window.rootElement = document.getElementById("root");
    window.mainContainer = document.createElement("main");
    window.navigation = document.createElement("nav");

    window.mainContainer.className = "container";
    window.navigation.className = "bottom-nav";

    _home_js__WEBPACK_IMPORTED_MODULE_0__.home.showHome();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9ob21lLmpzIiwid2VicGFjazovL2xhZ2VyMi8uL2pzL21lbnUuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy93YXJlaG91c2UuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xhZ2VyMi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGFnZXIyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbGFnZXIyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBYTs7QUFFb0I7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxRQUFRLG1EQUFhO0FBQ3JCOztBQUVBOztBQUVnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Qkg7O0FBRW9CO0FBQ1U7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLG1DQUFtQyxtREFBYSxDQUFDO0FBQzlELGFBQWEsc0NBQXNDLGlFQUFzQjtBQUN6RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBOztBQUVnQjs7Ozs7Ozs7Ozs7Ozs7OztBQzdDSDs7QUFFOEI7O0FBRTNDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlFQUFzQjtBQUNsQyxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLFNBQVMsWUFBWSxHQUFHLFlBQVksUUFBUTtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsZUFBZTtBQUNwRSw4Q0FBOEMsYUFBYTtBQUMzRCx5REFBeUQseUJBQXlCO0FBQ2xGLGlEQUFpRCxtQkFBbUI7QUFDcEUsdURBQXVELHNCQUFzQjtBQUM3RSx5REFBeUQscUJBQXFCO0FBQzlFLGdEQUFnRCxnQkFBZ0I7QUFDaEUseURBQXlELGdCQUFnQjtBQUN6RSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7O0FBRW1COzs7Ozs7Ozs7Ozs7Ozs7OztBQzNETjs7QUFFMEI7QUFDTjs7QUFFakM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLFNBQVMsb0JBQW9CLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxpQkFBaUIsT0FBTyxrQkFBa0I7QUFDM0YsMERBQTBELDREQUFtQjtBQUM3RTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhOztBQUViOztBQUVBLFFBQVEsbURBQWE7QUFDckI7O0FBRUE7O0FBRXFCOzs7Ozs7O1VDNUNyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05hOztBQUVvQjs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLElBQUksbURBQWE7QUFDakIsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgbWVudSB9IGZyb20gXCIuL21lbnUuanNcIjtcblxudmFyIGhvbWUgPSB7XG4gICAgc2hvd0hvbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9DbGVhbiB1cCBwYWdlIGZyb20gb2xkIGNvbnRlbnRcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgICAgICAgdGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiU3RhcnRcIjtcblxuICAgICAgICBsZXQgZ3JlZXRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICAgICAgICBncmVldGluZy50ZXh0Q29udGVudCA9IGBWw6Rsa29tbWVuIHRpbGwgbGFnZXItYXBwZW4hIEjDpHIga2FuIGR1IGhhbnRlcmEgYnV0aWtlbnMgcHJvZHVrdGVyLmA7XG5cbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChncmVldGluZyk7XG5cbiAgICAgICAgd2luZG93LnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdpbmRvdy5tYWluQ29udGFpbmVyKTtcblxuICAgICAgICBtZW51LnNob3dNZW51KFwiaG9tZVwiKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IGhvbWUgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBob21lIH0gZnJvbSBcIi4vaG9tZS5qc1wiO1xuaW1wb3J0IHsgd2FyZWhvdXNlIH0gZnJvbSBcIi4vd2FyZWhvdXNlLmpzXCI7XG5cbnZhciBtZW51ID0ge1xuICAgIHNob3dNZW51OiBmdW5jdGlvbiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgLy9DbGVhbiB1cCBuYXZpZ2F0aW9uIGZyb20gb2xkIGNvbnRlbnRcbiAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICAvL2NyZWF0ZSBtZW51IGFuZCBhZGQgc3R5bGUtY2xhc3MgYW5kIGZ1bmN0aW9uIGZvciB3aGVuIG5hdiBpcyBjbGlja2VkIG9uLlxuICAgICAgICBsZXQgbmF2RWxlbWVudHMgPSBbXG4gICAgICAgICAgICB7bmFtZTogXCJTdGFydFwiLCBjbGFzczogXCJob21lXCIsIG5hdjogaG9tZS5zaG93SG9tZX0sXG4gICAgICAgICAgICB7bmFtZTogXCJMYWdlclwiLCBjbGFzczogXCJzdG9yYWdlXCIsIG5hdjogd2FyZWhvdXNlLnNob3dQcm9kdWN0c31cbiAgICAgICAgXTtcblxuICAgICAgICBuYXZFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgbmF2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQgPT09IGVsZW1lbnQuY2xhc3MpIHtcbiAgICAgICAgICAgICAgICBuYXZFbGVtZW50LmNsYXNzTmFtZSA9IFwiYWN0aXZlXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5hdkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVsZW1lbnQubmF2KTtcblxuICAgICAgICAgICAgbGV0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICAgICAgICAgICAgaWNvbi5jbGFzc05hbWUgPSBcIm1hdGVyaWFsLWljb25zXCI7XG4gICAgICAgICAgICBpY29uLnRleHRDb250ZW50ID0gZWxlbWVudC5jbGFzcztcbiAgICAgICAgICAgIG5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvbik7XG5cbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICAgICAgICAgIHRleHQuY2xhc3NOYW1lID0gXCJpY29uLXRleHRcIjtcbiAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBlbGVtZW50Lm5hbWU7XG4gICAgICAgICAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKHRleHQpO1xuXG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5hcHBlbmRDaGlsZChuYXZFbGVtZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdpbmRvdy5uYXZpZ2F0aW9uKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IG1lbnUgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyB3YXJlaG91c2UgfSBmcm9tIFwiLi93YXJlaG91c2UuanNcIjtcblxudmFyIHByb2R1Y3QgPSB7XG5cbiAgICBzaG93UHJvZHVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBBUElfS0VZID0gXCIzY2IwMDA4NDBjMWI0ZTk4ZGYwYzllMDY0YWUwY2I4OVwiO1xuICAgICAgICBjb25zdCBCQVNFX1VSTCA9IFwiaHR0cHM6Ly9sYWdlci5lbWlsZm9saW5vLnNlL3YyXCI7XG4gICAgICAgIFxuICAgICAgICAvL0NsZWFuIHVwIHBhZ2UgZnJvbSBvbGQgY29udGVudFxuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgbGV0IG5hdkJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgbGV0IHByb2RJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRpdGxlXCI7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJQcm9kdWt0XCI7XG5cbiAgICAgICAgcHJvZEluZm8uY2xhc3NOYW1lID0gXCJwcm9kdWN0XCI7XG5cbiAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uY2xhc3NOYW1lID0gXCJ0b3AtbmF2XCI7XG5cbiAgICAgICAgbmF2QmFjay5jbGFzc05hbWUgPSBcIm5hdl9idXR0b25cIjtcbiAgICAgICAgbmF2QmFjay50ZXh0Q29udGVudCA9IFwiVGlsbGJha2EgdGlsbCBsYWdlclwiO1xuICAgICAgICBuYXZCYWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdGlvbi5jbGFzc05hbWUgPSBcImJvdHRvbS1uYXZcIjtcbiAgICAgICAgICAgIHdhcmVob3VzZS5zaG93UHJvZHVjdHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uYXBwZW5kQ2hpbGQobmF2QmFjayk7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvZEluZm8pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmlkKTtcbiAgICAgICAgbGV0IGlkID0gZXZlbnQudGFyZ2V0LmlkO1xuXG4gICAgICAgIC8vR2V0IGNvbnRlbnQgZnJvbSBMYWdlciBBUElcbiAgICAgICAgZmV0Y2goYCR7QkFTRV9VUkx9L3Byb2R1Y3RzLyR7aWR9Lz9hcGlfa2V5PSR7QVBJX0tFWX1gKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uY2UgPT4gcmVzcG9uY2UuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgcHJvZEluZm8uaW5uZXJIVE1MID0gICBgPHA+PHN0cm9uZz4ke2RhdGEuZGF0YS5uYW1lfTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5JZDogPC9zdHJvbmc+JHtkYXRhLmRhdGEuaWR9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkFydGlrZWxudW1tZXI6IDwvc3Ryb25nPiR7ZGF0YS5kYXRhLmFydGljbGVfbnVtYmVyfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5QbGF0czogPC9zdHJvbmc+JHtkYXRhLmRhdGEubG9jYXRpb259PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkJlc2tyaXZuaW5nOiA8L3N0cm9uZz4ke2RhdGEuZGF0YS5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+U3BlY2lmaWthdGlvbjogPC9zdHJvbmc+JHtkYXRhLmRhdGEuc3BlY2lmaWVyc308L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+UHJpczogPC9zdHJvbmc+JHtkYXRhLmRhdGEucHJpY2V9a3I8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+QW50YWwgaSBsYWdlcjogPC9zdHJvbmc+JHtkYXRhLmRhdGEuc3RvY2t9PC9wPmA7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod2luZG93Lm1haW5Db250YWluZXIpO1xuICAgIH1cblxufTtcblxuZXhwb3J0IHsgcHJvZHVjdCB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHByb2R1Y3QgfSBmcm9tIFwiLi9wcm9kdWN0LmpzXCI7XG5pbXBvcnQgeyBtZW51IH0gZnJvbSBcIi4vbWVudS5qc1wiO1xuXG52YXIgd2FyZWhvdXNlID0ge1xuICAgIFxuICAgIHNob3dQcm9kdWN0czogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBBUElfS0VZID0gXCIzY2IwMDA4NDBjMWI0ZTk4ZGYwYzllMDY0YWUwY2I4OVwiO1xuICAgICAgICBjb25zdCBCQVNFX1VSTCA9IFwiaHR0cHM6Ly9sYWdlci5lbWlsZm9saW5vLnNlL3YyXCI7XG5cbiAgICAgICAgLy9DbGVhbiB1cCBwYWdlIGZyb20gb2xkIGNvbnRlbnRcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgICAgICAgdGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiTGFnZXJcIjtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gICAgICAgIC8vR2V0IGNvbnRlbnQgZnJvbSBMYWdlciBBUElcbiAgICAgICAgZmV0Y2goYCR7QkFTRV9VUkx9L3Byb2R1Y3RzP2FwaV9rZXk9JHtBUElfS0VZfWApXG4gICAgICAgICAgICAudGhlbihyZXNwb25jZSA9PiByZXNwb25jZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goZnVuY3Rpb24oZGF0YVByb2R1Y3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvZEVsZW1lbnQuaWQgPSBkYXRhUHJvZHVjdC5pZDtcbiAgICAgICAgICAgICAgICAgICAgcHJvZEVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtkYXRhUHJvZHVjdC5uYW1lfTogICAgJHtkYXRhUHJvZHVjdC5zdG9ja31zdGA7XG4gICAgICAgICAgICAgICAgICAgIHByb2RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9kdWN0LnNob3dQcm9kdWN0KTtcbiAgICAgICAgICAgICAgICAgICAgcHJvZEVsZW1lbnQuY2xhc3NOYW1lID0gXCJwcm9kdWN0TGlua1wiO1xuXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2RFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgbWVudS5zaG93TWVudShcInN0b3JhZ2VcIik7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyB3YXJlaG91c2UgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGhvbWUgfSBmcm9tIFwiLi9ob21lLmpzXCI7XG5cbi8vSUlGRSAoSW1tZWRpYXRlbHktSW52b2tlZCBGdW5jdGlvbiBFeHByZXNzaW9uKVxuKGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XG4gICAgd2luZG93Lm1haW5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgICB3aW5kb3cubmF2aWdhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIik7XG5cbiAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNvbnRhaW5lclwiO1xuICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmNsYXNzTmFtZSA9IFwiYm90dG9tLW5hdlwiO1xuXG4gICAgaG9tZS5zaG93SG9tZSgpO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=