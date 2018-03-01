$(function() {
    //On Click Burger button to change the state of eaten or purge
    $(".change-eaten").on("click", function(event) {

        // Set id for each items button
        var id = $(this).data("id");
        
        // Set data object for each button
        var newEat = $(this).data("neweat");

        // set state of eaten for each burger
        var newEatState = {
            eaten: newEat
        };

        if(newEatState.eaten === false){
            // Send the DELETE request with REST API id's 
            $.ajax('/api/burgers/' + id, {
                type: "DELETE"
            }).then(function(){
                // Reload the page to get the updated list
                location.reload();
            });
        } else{
            // Send the PUT request with REST API id's 
            $.ajax('/api/burgers/' + id, {
                type: "PUT",
                data: newEatState
            }).then(function(){
                
            
                // Reload the page to get the updated list
                location.reload();
            });
        }  
    });


    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        
        // Make new burger object with values from form inputs
        var newBurger = {
          name: $("#burger").val().trim(),
          eaten: false
        };
    
        // Send the POST request.
        $.ajax("/api/burgers/", {
          type: "POST",
          data: newBurger
        }).then(
          function() {
            console.log("created new berger");
            // Reload the page to get the updated list
            location.reload();
          }
        );
    });
});