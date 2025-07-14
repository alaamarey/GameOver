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









window.addEventListener("scroll", function () {
  console.log(this.scrollY);

  if (scrollY > 40)
    this.document.querySelector("nav").classList.add("fixed-top");
  else this.document.querySelector("nav").classList.remove("fixed-top");
});

getGames();

document.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelector(".nav-item .active").classList.remove("active");
    link.classList.add("active");

    getGames(link.dataset.categroy);
  });
});

async function getGames(categroy = "Mmorpg") {
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
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categroy}`,
      options
    )
      .then(async (response) => await response.json())
      .then((data) => data);
    document.querySelector(".loading").classList.add("d-none");

    displayGames(data);
  } catch (error) {
    console.log(error);
  }
}

function displayGames(gamesData) {
  let gamesBox = "";
  for (let i = 0; i < gamesData.length; i++) {
    // "https://www.freetogame.com/g/540/thumbnail.jpg
    const videoPath = gamesData[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );

    gamesBox += `
                <div class="col">
            <div  onmouseenter="startVideo(event)"  onmouseleave="pauseVideo(event)"  onclick="showDetails(${gamesData[i].id})"  class="card bg-transparent h-100  " role="botton">
              <div class="card-body">
                <figure class="position-relative">
                  <img src="${gamesData[i].thumbnail} " alt="gameImage" class="card-img-top object-fit-cover h-100" />

                  <video
                    muted="true"
                    preload="none"
                    loop
                    class="w-100 h-100  position-absolute top-0 start-0 z-3  d-none"
                  >
                    <source src="${videoPath}" />
                  </video>
                </figure>

                <figcaption>
                  <div>
                    <h3 class="h3 small">${gamesData[i].title}</h3>
                    <span class="badge text-bg-primary  p-2">Free</span>
                  </div>

                  <p>${gamesData[i].short_description} </p>
                </figcaption>
              </div>

              <footer class="card-footer  hstack  justify-content-between">
                <span class="badge badge-color">${gamesData[i].genre}</span>
                <span class="badge badge-color">${gamesData[i].platform}</span>
              </footer>
            </div>
          </div>

`;
  }

  document.getElementById("games-data").innerHTML = gamesBox;
}

async function startVideo(event) {
  const videoElement = event.currentTarget.querySelector("video");

  await videoElement.play().then(function () {
    videoElement.classList.remove("d-none");
  });
}

async function pauseVideo(event) {
  const videoElement = event.currentTarget.querySelector("video");
  videoElement.classList.add("d-none");
  if (!videoElement.paused) videoElement.pause();
}

function showDetails(id) {
  window.location.href = `./details.html?id=${id}`;
}
