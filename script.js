var username = " "
var cards = document.querySelector(".cards")
var cards1 = document.querySelector(".cards1")
var cards2 = document.querySelector(".cards2")


function getUsername(element){
    username = element.value
    console.log(username)
}

// Function that do a username search on GitHub.

async function search(){
    var response = await fetch("https://api.github.com/users/" + username);
    var coderData = await response.json();
    console.log(coderData);
    cards.innerHTML = cardsDiv(coderData);
    cards1.innerHTML = cardsDiv1(coderData);

}


// Function that do a username search on GitHub.

async function repos_search2() {
  var response = await fetch("https://api.github.com/users/" + username + "/repos");
  var coderData = await response.json();
  console.log(coderData);
  cards2.innerHTML = cardsDiv2(coderData);
}



//First card data

function cardsDiv(data){
    if(data.login != undefined){
        return (`<div class="card bg-transparent"  >
<img src="${data.avatar_url}" alt= ${data.login}>
<p class="green-text"> Account Name : ${data.name}</p>
<p class="green-text"> Click to visit <a href="${data.html_url}">${data.name}</a> GitHub account.</p>
<p class="green-text"> Username: ${data.login}</p>
<p>Type: ${data.type}</p>
<div class="star-field">
<div class="layer"></div>
<div class="layer"></div>
<div class="layer"></div>
</div>
      </div>`
)}
  return(`<p class="test-danger"> There is no such username on GithUB </p>`)
}

//Second card data
function cardsDiv1(data1) {
  if (data1.login !== undefined) {
      let bioInfo = "";
      if (data1.bio !== null) {
          bioInfo = `<p> <b> BIO: </b> ${data1.bio} </p>`;
      }

  
      let company_name = "";
      if (data1.company !== null) {
        company_name = `<p> <b>  Company name: </b> ${data1.company} </p>`;
      }

      
      let twitterAccountInfo = "";
      if (data1.twitter_username !== null) {
          twitterAccountInfo = `<p> <b> Twitter Account: </b> ${data1.twitter_username} </p>`;
      }
      
      return (`
          <div class="card bg-transparent">
              <p> ${data1.name} has ${data1.public_repos} public repository and ${data1.public_gists} public gists. </p>
              ${bioInfo}
              ${company_name}
              <p> Followers: ${data1.followers} </p>
              <p> Following: ${data1.following} </p>
              ${twitterAccountInfo}
              <div class="star-field">
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          </div>
          
      `);
  }
  
  return (`<p class="test-danger"></p>`);
}

//Repository data

function cardsDiv2(data2) {
  if (Array.isArray(data2)) {
    return data2.map(repo => {
      let descriptionInfo = "";
      if (repo.description !== null) {
        descriptionInfo = `<p>${repo.description}</p>`;
      }

      let languageInfo = "";
      if (repo.language !== null) {
        languageInfo = `<p>The main language in this  repos is ${repo.language}</p>`;
      }
      

      return `
        <div class="card bg-transparent">
          ${descriptionInfo}
          <p>${repo.name} has ${repo.stargazers_count} stars and ${repo.forks} forks.</p>
          ${languageInfo}
          <p><a href="${repo.html_url}">Repository Link</a></p>
        </div>`;


    }).join("");
  }
  
  return `<p class="text-danger"> There is no repository data available for this user </p>`;
}

