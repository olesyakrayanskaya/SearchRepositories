const requestURL = 'https://api.github.com/search/repositories';

async function searchRepositories(text) {
    let json = await fetchRepositories(text);
    if (json.items.length <= 0) {
        alert('sorry, no results');
    };

    for (let i = 0; i < Math.min(json.items.length, 10); i++) {
        let repo = json.items[i];
        let name = repo.name;
        let language = repo.language;
        let url = repo.html_url;
        let owner = repo.owner.login;
        displaySearchResults(name, url, owner, language);
    }
};

function displaySearchResults(name, url, owner, language) {

    let resultsItem = document.createElement('li');
    resultsItem.className = 'results__item';
    let resultsList = document.querySelector('.results__list');
    resultsList.append(resultsItem);

    let repoLink = document.createElement('a');
    repoLink.className = 'results__link';
    repoLink.href = url;
    repoLink.target = '_blank';
    resultsItem.append(repoLink);

    let repoName = document.createElement('p');
    repoName.className = 'results__name';
    repoName.innerHTML = 'repository  : ' + name;
    repoLink.append(repoName);

    let repoOwner = document.createElement('p');
    repoOwner.className = 'results__owner';
    repoOwner.innerHTML = 'owner : ' + owner;
    resultsItem.append(repoOwner);

    let progLanguage = document.createElement('p');
    progLanguage.className = 'language';
    progLanguage.innerHTML = 'programming language : ' + language;
    resultsItem.append(progLanguage);
};

async function fetchRepositories(text) {
    let request = requestURL + '?q=' + encodeURIComponent(text);
    try {
        let res = await fetch(request);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

document.getElementById('search-btn').addEventListener('click', async function () {

    let searchText = document.getElementById('search').value;

    if (searchText.length < 2) {
        alert('please, enter more than two characters');
        return;
    }

    await searchRepositories(searchText);

});

document.addEventListener('keydown', async function (event) {

    let searchText = document.getElementById('search').value;

    if (event.key == 'Enter') {
        await searchRepositories(searchText);
    }
}, false);

