
let mode = document.getElementById("mode");

if (localStorage.getItem("theme") !== null) {
  const theme = localStorage.getItem("theme");

  document.documentElement.dataset.theme = theme;

  if (theme == "light") mode.classList.replace("fa-sun", "fa-moon");
  else mode.classList.replace("fa-moon", "fa-sun");
}

mode.addEventListener("click", function () {
  if (mode.classList.contains("fa-sun")) {
    document.documentElement.setAttribute("data-theme", "light");
    mode.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    mode.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  }
});


const id = new URLSearchParams(location.search).get("id");
getDetails(id);

async function getDetails(id) {
  try {
    document.querySelector(".loading").classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "31ad946590msh257db358964630ep14dc29jsnb13f8383f784",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const data = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    )
      .then(async (response) => await response.json())
      .then((data) => data);
    displayData(data);
    document.querySelector(".loading").classList.add("d-none");
  } catch (error) {
    console.log(error);
  }
}

function displayData(data) {
  let detailsBox = `
      <div class="col-md-4">
        <figure>
        <img src="${data.thumbnail}" class="w-100" />
        </figure>
      </div>
    <div class="col-lg-8"> 
       <nav  aria-label="breadcrumb"> 
         <ol class="breadcrumb"> 
         <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
         <li class="breadcrumb-item text-info">${data.title}</li>
         </ol>
       </nav>
        <h1> ${data.title} </h1>
        <h3> About ${data.title}</h3>
        <p> ${data.description}</p>
    </div>
    `;

  document.getElementById("gameDetails").innerHTML = detailsBox;
  document.body.style.cssText = `background:url('${data.thumbnail.replace(
    "thumbnail",
    "background"
  )}') center / cover no-repeat`;
}
