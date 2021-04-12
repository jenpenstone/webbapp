/* global home */

"use strict";

//IIFE (Immediately-Invoked Function Expression)
(function () {
    window.rootElement = document.getElementById("root");
    window.mainContainer = document.createElement("main");
    window.navigation = document.createElement("nav");

    window.mainContainer.className = "container";
    window.navigation.className = "bottom-nav";

    home.showHome();
})();
