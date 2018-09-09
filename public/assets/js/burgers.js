// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
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
  
    // $(".create-form").on("submit", function(event) {
    //     // Make sure to preventDefault on a submit event.
    //     event.preventDefault();
    
    //     var newCat = {
    //         name: $("#ca").val().trim(),
    //         sleepy: $("[name=sleepy]:checked").val().trim()
    //     };
    
    //     // Send the POST request.
    //     $.ajax("/api/cats", {
    //         type: "POST",
    //         data: newCat
    //     }).then(
    //         function() {
    //         console.log("created new cat");
    //         // Reload the page to get the updated list
    //         location.reload();
    //         }
    //     );
    // });
});
  