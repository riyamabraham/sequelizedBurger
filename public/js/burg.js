

$(document).ready(function () {
  // Getting a reference to the input field where user adds a new burger
  var $newItemInput = $("textarea.textinput");
  // Our new buger will go inside the leftburger
  var $burgerleftContainer = $(".left");
  //our devoured burger go in here
  var $burgerrightContainer = $(".right");
  // Adding event listeners for deleting, devouring, and adding burgers
  $(document).on("click", "button.delete", deleteburger);
  $(document).on("click", "button.devour", devourburger);
  $(document).on("click", ".submit", insertburger);


  // Our initial burgers array
  var burgers = [];

  // Getting burgers from database when page loads
  getburgers();

  // This function resets the burgers displayed with new burgers from the database
  function initializeRows() {
    $burgerleftContainer.empty();
    $burgerrightContainer.empty();
    var leftrows = [];
    var rightrows = [];
    
      for (var i = 0; i < burger.length; i++) {
        console.log(burger[i]);
        if(!burger[i].devour){
          leftrows.push(createNewRowleft(burger[i]));
          $burgerleftContainer.prepend(leftrows);
        }
        if(burger[i].devour){
          rightrows.push(createNewRowright(burger[i]));
          $burgerrightContainer.prepend(rightrows);
        }     
      }    
  }

  // This function grabs all burgers from the database and updates the view
  function getburgers() {
    $.get("/api/burgers", function (data) {
      burger = data;
      initializeRows();
    });
  }

  // This function deletes a burger when the user clicks the delete button
  function deleteburger(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    console.log(id);
    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    }).then(getburgers);
  }

// This function inserts a new burger into our database and then updates the view
function insertburger(event) {
  console.log("at here");
  event.preventDefault();
  var burger = {
    text: $newItemInput.val().trim(),
    devour: false
  };

  $.post("/api/burgers", burger, getburgers);
  $newItemInput.val("");
}

  // This function devours/updates in our database
  function devourburger(event) {
    var id = $(this).data("id");
    console.log(id);
    $.ajax({
      method: "PUT",
      url: "/api/burgers/" + id,
      devour: true
    }).then(getburgers);

  }

  // This function constructs a new burger  row
  function createNewRowleft(burger) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burger-item'>",
        "<span>",
        burger.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>DELETE</button>",
        "<button class='devour btn btn-primary'>DEVOUR</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", burger.id);
    $newInputRow.find("button.devour").data("id", burger.id);
    $newInputRow.data("burger", burger);
    return $newInputRow;
  }


  //for right*****************
  

  function getdevouredburgers() {
    $.get("/api/burgers", function (data) {
      burger = data;
      devourinitializeRows();
    });
  }


  function createNewRowright(burger) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burger-item'>",
        "<span>",
        burger.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>DELETE</button>",
       
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", burger.id);
    $newInputRow.data("burger", burger);
    return $newInputRow;
  }

});
