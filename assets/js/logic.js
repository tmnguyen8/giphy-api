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
          <div class="gif-wrapper" style="transform: translate3d(0px, 0px, 0px) background-color: rgb(233,236,239);">
            <img src="${i.images.fixed_width.url}" class="gif-image d" data-still="${i.images.fixed_width_still.url}" data-animate="${i.images.fixed_width.url}" data-state="animate">
            <p class="card-text">Rating: ${i.rating}</p>
            <div class="overlay"></div>
          </div>
      `);

      $(".gifView").append(image)

    }
  })
}
// EXECUTION
// *********************************************************
// on click #addBtn adds the content from the input into the array and display it as button in the searchView
// check for duplicates or empty string
$("#addBtn").on("click", function(event) {
    event.preventDefault();
    var inputText = $("#inputText").val()
    // Check if the searchText already exist;
    if (searchList.includes(inputText) || inputText === "") {
      alert("This search already exists in your list or invalid. Select another search term");
    } else {
      searchList.push(inputText);
    }
    // clear the button-views div
    $("#searchView").empty();
    displayButtons();
});
// On click #clearBtn to clear the array searchList and empty the content in the searchView
$(document).on("click", "#clearBtn", function(event) {
  event.preventDefault();
  searchList = [];
  $("#searchView").empty();
  displayButtons();
});
// On click #searchBtn to display the gif based on the searchText
$(document).on("click", "#searchBtn", function(event) {
    event.preventDefault();
    searchText = $(this).data("search");
    queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchText}&limit=24&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9`;
    displayGif();
});

// Delete button to remove the searchText from searchList 
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
// Click on .gif-image to either pause the gif or animate the gif
$(document).on("click", ".gif-image", function(event){
  event.preventDefault();
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
