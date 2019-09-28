// GLOBAL VARIABLES
// *********************************************************
var searchList = [];
var searchText = "";
var queryURL = "";
var favoriteList = [];
// FUNCTIONS
// *********************************************************
// function to remove item from array
function arrayRemove(arr, value) {
  return arr.filter(function(ele){
    return ele != value;
  })
}


// Function for displaying button search text data
function loadLocalStorageButtons() {
  var localStorageButtons = JSON.parse(localStorage.getItem("buttons"));
  searchList = localStorageButtons;
  displayButtons();
}

function loadLocalStorageFav() {
  var localStorageFav = JSON.parse(localStorage.getItem("favorites"));
  favoriteList = localStorageFav;
  displayFav();
}

function displayButtons() {
    // clear the button-views div
    $("#searchView").empty();
    if (searchList !== null) {
      for (i of searchList) {
        $("#searchView").append(`
        <div class="btn-wrapper">
        <button id="searchBtn" class="btn btn-secondary" data-search="${i}">${i}</button>
        <button id="deleteBtn" class="btn fas fa-times" data-search="${i}"></button>
        </div>
        `)
      };
    }

    localStorage.setItem("buttons", JSON.stringify(searchList));
};


// function for displaying gif based on button selected
function displayGif(){
    $(".gif-content").empty();
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    for (i of response.data) {
      var image = $(`
          <div class="gif-wrapper">
            <i class="far fa-heart favorite" data-id="${i.id}" data-fav="far"></i>
            <img src="${i.images.fixed_width.url}" class="gif-image d" data-still="${i.images.fixed_width_still.url}" data-animate="${i.images.fixed_width.url}" data-state="animate">
            <div class="gif-info">
              <p>Rating: ${i.rating}</p>
            </div>
          </div>
      `);

      $(".gif-content").append(image)

    }
  })
}

// displayFavorite id that were selected
function displayFav() {
  $(".gif-content").empty();
  favoriteStr = favoriteList.join(",")
  var queryFavURL = `https://api.giphy.com/v1/gifs?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&ids=${favoriteStr}`;

  $.ajax({
    url: queryFavURL,
    method: "GET"
  }).then(function(response) {

    for (i of response.data) {
      var image = $(`
          <div class="gif-wrapper">
            <i class="fas fa-heart favorite" data-id="${i.id}" data-fav="fas"></i>
            <img src="${i.images.fixed_width.url}" class="gif-image d" data-still="${i.images.fixed_width_still.url}" data-animate="${i.images.fixed_width.url}" data-state="animate">
            <div class="gif-info">
              <p>Rating: ${i.rating}</p>
            </div>
          </div>
      `);

      $(".gif-content").append(image)

    }
  })
}

// EXECUTION / EVENT
// *********************************************************
// load any buttons previously saved in local storage
loadLocalStorageButtons();


// on click #addBtn adds the content from the input into the array and display it as button in the searchView
// check for duplicates or empty string
$(document).on("click", "#addBtn", function(event) {
    event.preventDefault();
    var inputText = $("#inputText").val()
    // Check if the searchText already exist;
    if (searchList.includes(inputText) || inputText === "") {
      alert("This search already exists in your list or invalid. Select another search term");
    } else {
      searchList.push(inputText);
    }
    

    displayButtons();
    $("#inputText").val("");
});

// On click #clearBtn to clear the array searchList and empty the content in the searchView
$(document).on("click", "#clearBtn", function(event) {
  // event.preventDefault();
  searchList = [];
  displayButtons();
});

// On click #searchBtn to display the gif based on the searchText
$(document).on("click", "#searchBtn", function(event) {
    searchText = $(this).data("search");
    queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchText}&limit=24&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9`;
    
    // make the parent active when selected
    var parent = $(this).parent();
    $('.btn').parent().removeClass("active");
    parent.addClass("active");

    displayGif();
});

// Delete button to remove the searchText from searchList 
$(document).on("click", "#deleteBtn", function(event) {
  searchText = $(this).data("search");
  // deletting selected searchText from list searchList
  var deleteIndex = searchList.indexOf(searchText);
  if (deleteIndex != -1) {
    searchList.splice(deleteIndex, 1);
  };
  displayButtons();
});

// Click on .gif-image to either pause the gif or animate the gif
$(document).on("click", ".gif-image", function(event){
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
// add to favorite everytime favorite is selected
$(document).on("click", ".favorite", function (event){
  var imageId = $(this).data("id");
  // if it is not favorite, then add to facorite
  if ($(this).data("fav") === "far") {
    $(this).removeClass("far");
    $(this).addClass("fas");
    $(this).data("fav", "fas");
    favoriteList.push(imageId);
  // else remove it from favorite
  } else {
    $(this).removeClass("fas");
    $(this).addClass("far");
    $(this).data("fav", "far");
    favoriteList = arrayRemove(favoriteList, imageId);
    
  }
  localStorage.setItem("favorites", JSON.stringify(favoriteList));
});
// event listener to when the check box is changed
$(document).on("click", "input:checkbox", function(){
  var isFavChecked = $(this).is(":checked");
  if (isFavChecked) {
    loadLocalStorageFav();
  } else {
    $(".gif-content").empty();
  }
  
});

// debugging error caused by Github for treating empty array as null
if (searchList === null) {
  searchList = [];
};