document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm !== '') {
      searchUsers(searchTerm);
    }
  });

  function searchUsers(searchTerm) {
    const url = `https://api.github.com/search/users?q=${searchTerm}`;
    fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => {
      displayUsers(data.items);
    })
    .catch(error => console.error('Error searching users:', error));
  }

  function displayUsers(users) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    users.forEach(user => {
      const userElement = document.createElement('div');
      userElement.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
      `;
      userElement.addEventListener('click', function() {
        getUserRepos(user.login);
      });
      searchResults.appendChild(userElement);
    });
  }

  function getUserRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(repos => {
      displayRepos(repos);
    })
    .catch(error => console.error('Error fetching repos:', error));
  }

  function displayRepos(repos) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    const reposList = document.createElement('ul');
    repos.forEach(repo => {
      const repoItem = document.createElement('li');
      repoItem.textContent = repo.full_name;
      reposList.appendChild(repoItem);
    });
    searchResults.appendChild(reposList);
  }
