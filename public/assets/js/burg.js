$(function(){
  $(".create-form").on("submit",function(event){

     event.preventDefault();

     var newburger = {
       burger: $("#bg").val().trim(),
       
     };
     $.ajax("/api/burgers",{
       type:"POST",
       data:newburger
     }).then(function(){
       console.log("created new burger");
       location.reload();
     });

  });

  $(".devour_it").on("click",function(event){
    var id = $(this).data("id");
    var devour = $(this).data("newdevour");
    var devourState = {
      devoured: devour
    };
    $.ajax("/api/burgers/" +id,{
      type: "PUT",
      data:devourState
    }).then(function(){
      console.log("devour state changed to ",devour);
      location.reload();
    });
    
  });

  $(".delete_it").on("click",function(event){
    var id = $(this).data("id");
    console.log("here");
    $.ajax("/api/burgers/" +id,{
      type:"DELETE"
    }).then(function(){
      //console.log("here");
      console.log("deleted ",id);
     location.reload(true);
    }
  );

  });

});

