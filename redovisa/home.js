/* global menu */

"use strict";

var home = (function () {
    var showHome = function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";

        let title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Me";

        let greeting = document.createElement("p");
        let timeOfDayGreeting = "Hej";
        let now = new Date();

        if (now.getHours() < 10) {
            timeOfDayGreeting = "Godmorgon";
        } else if (now.getHours() >= 17) {
            timeOfDayGreeting = "God kväll";
        }

        greeting.textContent = timeOfDayGreeting +
            ", jag heter Jenny Stenslund och är student i kursen webapp.";

        let image = document.createElement("img");

        image.src = "jenny.jpg";
        image.alt = "Bild på Jenny Stenslund";

        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(greeting);
        window.mainContainer.appendChild(image);

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("home");
    };

    return {
        showHome: showHome
    };
})(home);
