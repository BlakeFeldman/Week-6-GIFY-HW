$( document ).ready(function() {

    // Create an Array of Starks

    var topic = ["Ned Stark", "Jon Snow", "Bran", "Sansa", "Arya"];
    
    // Create a display function for each Stark GIF button
    
    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("stark");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    
    // Create a function to add new button
    
    function addNewButton() {
        $("#addGif").on("click", function() {
            var stark = $("#topicInput").val().trim();
            if (stark == ""){
                return false;//no blank buttons
            }
            topic.push(stark);
    
            displayGifButtons();
            return false;
            });
    }
    
    // Create a function to remove the last button

    function removeLastButton() {
        $("removeGif").on("click", function() {
            topic.pop(stark);
            displayGifButtons();
            return false;
        });
    
    }
    
    // Create a function that displays GIFS
    
    function displayGifs() {

        // Define Stark Variables
        
        var stark = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + stark + "&api_key=PlqBd9Vee42HjIX2dlzmWLVFpvMU75R4";
        
        // AJAX GET METHOD
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        .done(function(response) {
            $("#gifsView").empty();
        
            //Show GIF results
        
            var results = response.data;
            if (results == ""){
                alert("There is not a giffy for this!");	
            }
            for (var i = 0; i<results.length; i++){

            //Put GIFS in a div

                var gifDiv = $("<div1>");
            
            //Pull GIF ratings 

                var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);
    
            //Pull GIF

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
            
            //Paused images
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
            
            //Animated images

                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
            
            //Still images 
            
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                
            //Add new div to existing divs by prepend method

                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    
    //list of already created starks
    
    displayGifButtons();
    addNewButton();
    removeLastButton();
    
    
    
    //event listeners
    $(document).on("click", ".stark", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    
        });
    
    });