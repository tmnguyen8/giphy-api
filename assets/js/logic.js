// GLOBAL VARIABLES
// *********************************************************
let searchList = [];
let searchText = "";
// FUNCTIONS
// *********************************************************


// EXECUTION
// *********************************************************
$("#searchBtn").click(function() { 
    searchText = $("#searchText").val();
    $(".searchResult").append(`<button type="button" class="btn btn-success">${searchText}</button>`);

    if (!searchList.includes(searchText)) {
        searchList.push(searchText);
    } else {
        alert("The following search has already been selected.");
    };


    
}); 