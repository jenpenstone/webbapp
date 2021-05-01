"use strict";

import { home } from "./home.js";
import { warehouse } from "./warehouse.js";

var menu = {
    showMenu: function (selected) {
        //Clean up navigation from old content
        window.navigation.innerHTML = "";

        //create menu and add style-class and function for when nav is clicked on.
        let navElements = [
            {name: "Start", class: "home", nav: home.showHome},
            {name: "Lager", class: "storage", nav: warehouse.showProducts}
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

export { menu };
