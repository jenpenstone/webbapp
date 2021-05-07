/* global menu */

"use strict";

var md = window.markdownit();


var report = (function () {
    let showReport = function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";

        //Add title to page
        let title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Redovisning";

        window.mainContainer.appendChild(title);

        //Get kmom01 text from markdown file
        fetch("markdown/kmom01.md")
            .then(function(response) {
                return response.text();
            })
            .then(function(result) {
                window.mainContainer.innerHTML += md.render(result);
            });

        //Get kmom02 text from markdown file
        fetch("markdown/kmom02.md")
            .then(function(response) {
                return response.text();
            })
            .then(function(result) {
                window.mainContainer.innerHTML += md.render(result);
            });

        //Add menu to page
        menu.showMenu("article");
    };

    return {
        showReport: showReport
    };
})(report);
