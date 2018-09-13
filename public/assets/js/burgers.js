// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

    //on click action for eat button
    $(".eat").on("click", function(event) {
        var id = $(this).data("id");
    
        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: true
        }).then(
            function() {
            
                // console.log("changed devoured to", eatStatus);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
  
    //on click action for submit button
    $(".make-burger").on("submit", function(event) {
        
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        
        //grab new burger info from form
        var newBurger = {
            burger_name: $("#burgerForm").val().trim()
        };
    
        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
            console.log("created new burger");
            
            // Reload the page to get the updated list
            location.reload();
            }
        );
    });
});
  