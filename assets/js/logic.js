// GLOBAL VARIABLES
// *********************************************************
let searchList = [];
let searchText = "";
let queryURL = "";
// FUNCTIONS
// *********************************************************
// Function for displaying button search text data
function displayButtons() {
    for (i of searchList) {
        $("#searchView").append(`
        <div class="btn-wrapper">
        <button id="searchBtn" class="btn btn-secondary" data-search="${i}">${i}</button>
        <button id="deleteBtn" class="btn fa fa-close" data-search="${i}"></button>
        </div>
        `)
    };
};

// function for displaying gif based on button selected
function displayGif(){
    $(".gifView").empty();
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    for (i of response.data) {
      var image = $(`
        <a href="${i.images.fixed_width.url}">
          <div class="gif-wrapper" style="transform: translate3d(0px, 0px, 0px) background-color: rgb(233,236,239);">
            <img src="${i.images.fixed_width.url}" class="gif-image" class="d">
            <p class="card-text">Rating: ${i.rating}</p>
            <button id="animateGifBtn" class="btn fa fa-play-circle" data-search="${i}" data-animate=""></button>

          </div>
        </a>
      `);

      $(".gifView").append(image)
    }
  })
}
// EXECUTION
// *********************************************************
// This function handles events where one button is clicked
$("#addBtn").on("click", function(event) {
    event.preventDefault();
    var inputText = $("#inputText").val()
    // Check if the searchText already exist;
    if (searchList.includes(inputText)) {
      alert("This search already exists in your list. Select another search term");
    } else {
      searchList.push(inputText);
    }
    // clear the button-views div
    $("#searchView").empty();
    displayButtons();
});

$(document).on("click", "#clearBtn", function(event) {
  event.preventDefault();
  searchList = [];
  $("#searchView").empty();
  displayButtons();
});

$(document).on("click", "#searchBtn", function(event) {
    event.preventDefault();
    searchText = $(this).data("search");
    queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchText}&limit=25&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9`;
    displayGif();
});

$(document).on("click", "#deleteBtn", function(event) {
  event.preventDefault();
  searchText = $(this).data("search");
  // deletting selected searchText from list searchList
  var deleteIndex = searchList.indexOf(searchText);
  if (deleteIndex != -1) {
    searchList.splice(deleteIndex, 1);
  }
  $("#searchView").empty();
  displayButtons();
});
