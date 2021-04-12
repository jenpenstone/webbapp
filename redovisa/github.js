/* global menu */

"use strict";

var github = (function () {
    let showGithub = function () {
        //Clean up page from old content
        window.mainContainer.innerHTML = "";

        let title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Github";
        window.mainContainer.appendChild(title);

        //Get content from Github API
        let githubRequest = new XMLHttpRequest();

        githubRequest.addEventListener("load", renderGithubRepos);
        githubRequest.open("GET", "https://api.github.com/users/jenpenstone/repos");
        githubRequest.send();
    };

    var renderGithubRepos = function () {
        //console.log(this);
        let gitBase = "https://github.com/jenpenstone";
        let repos = JSON.parse(this.responseText);

        console.log(repos);

        repos.forEach(function(repo) {
            let repoElement = document.createElement("a");

            repoElement.textContent = repo.name;
            repoElement.href = `${gitBase}/${repo.name}`;
            repoElement.target = "_blank";
            repoElement.className = "gitLink";
            window.mainContainer.appendChild(repoElement);
        });

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("folder");
    };

    return {
        showGithub: showGithub
    };
})(github);
