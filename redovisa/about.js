/* global menu */

"use strict";

var about = (function () {
    let showAbout = function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";

        let title = document.createElement("h1");
        let text = document.createElement("p");

        title.className = "title";
        title.textContent = "Om";

        text.innerHTML = `Denna webbplatsen är en del av kursen 
        <a href='https://dbwebb.se/kurser/webapp-v3'>Webbapp</a>
         som ges som distans från Blekinge Tekniska Högskola (BTH).
        Här kommer de moment som ingår i kursen att redovisas genom skriftlig dokumentation
         om momenten och reflektioner kring det egna lärandet.`;

        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(text);

        menu.showMenu("info");
    };

    return {
        showAbout: showAbout
    };
})(about);
