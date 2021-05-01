"use strict";

import { menu } from "./menu.js";

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

        menu.showMenu("home");
    }

};

export { home };
