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
        $("#searchView").append(`<button id="searchBtn" class="btn btn-secondary" data-search="${i}">${i}</button>`)
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
      <img src="${i.images.fixed_width.url}" class="col-4 image">`);
      $(".gifView").append(image)
    }
  })
}
// EXECUTION
// *********************************************************
// This function handles events where one button is clicked
$("#addBtn").on("click", function(event) {
    event.preventDefault();
    searchList.push($("#searchText").val());
    // clear the button-views div
    $("#searchView").empty();
    displayButtons();
});

$(document).on("click", "#searchBtn", function(event) {
    event.preventDefault();
    searchText = $(this).data("search");
    queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchText}&limit=25&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9`;
    displayGif();
});
