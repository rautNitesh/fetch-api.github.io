let page_number = 1;
function pageUpdate(pageNo) {
  page_number = pageNo;
  fetchAgain();
}

function fetchAgain() {
  fetchRepoUrl =
    "https://api.github.com/users/bradTraversy/repos" +
    `?page=${page_number}&per_page=30`;
  console.log(page_number);

  Promise.all([
    fetch("https://api.github.com/users/bradtraversy"),
    fetch(fetchRepoUrl),
  ])
    .then(async ([res, res2]) => {
      const user = await res.json();
      const repo = await res2.json();
      return [user, repo];
    })
    .then((data) => {
      data2 = data[1];

      data = data[0];
      total_repos = data["public_repos"];
      if (total_repos % 30 == 0) {
        no_of_pages = total_repos / 30;
      } else {
        no_of_pages = total_repos / 30 + 1;
      }
      document.getElementById("profileSection__avatar").src =
        data["avatar_url"];
      document.getElementById("profileSection__info__name").textContent =
        data["name"];
      document.getElementById("profileSection__info__bio").textContent =
        data["bio"];
      document.getElementById(
        "profileSection__info__followers"
      ).textContent = `Followers ${data["followers"]}`;
      console.log(data2);

      let output = "";
      let pagination = "";
      for (i = 1; i <= no_of_pages; i++) {
        pagination += `<button class="githubRepo__pagination__button" onClick="pageUpdate(${i})">${i}</button>`;
      }
      data2.map((repo, index) => {
        output += `<a href=${repo.html_url}id="githubRepo__url">${
          repo.name
        } </a>
        <p id="githubRepo__description">${
          repo.description == null
            ? "no description available"
            : repo.description
        }</p>`;
      });
      document.getElementById("githubRepos").innerHTML = output;
      document.getElementById("githubRepo__pagination").innerHTML = pagination;
      document.getElementById("container").hidden = false;
      document.getElementById("newsFeed").hidden = false;
      document.getElementById("loading").hidden = true;
    });
}
fetchAgain();
