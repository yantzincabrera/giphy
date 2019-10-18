$(document).ready(function() {

    var movies = [
        "The Matrix", "The Brave Little Toaster", "Cinderella", "Snow White", "Seinfeld", "Rick n morty", "Home Alone", "Die Hard", "Meet Joe Black", "Hannibal", "Jason", "Halloween"
    ];

    function populateButtons(arrayToUse, classToAdd,areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }

    }

    $(document).on("click", ".movie-button",function() {
        $("#movies").empty();
        $(".movie-button").removeClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?" + type + "api_key=xPyaO4X5oGWoOV7GVs8DVruTlppJ7VfN&q=movies&limit=25&offset=0&rating=R&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response){
                var results = response.data;

                for (var i = 0; i < results.length; i++){
                    var movieDiv = $("div class=\"movie-item\">");

                    var rating = results[i].rating;

                    var p =$("<p>").text("Rating"+ rating);

                    var animated = results[i].images.fixed_height_still.url;

                    var movieImage = $("<img>");
                    movieImage.attr("src", still);
                    movieImage.attr("data-still", still);
                    movieImage.attr("data-animate", animated);
                    movieImage.attr("data-state", "still");
                    movieImage.addClass("movie-image");

                    movieDiv.append(p);
                    movieDiv.append(movieImage);

                    $("movies").append(movieDiv);
                }
            });
    });

    $(document).on("click", ".movie-image", function(){

        var state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-movie").on("click", function(event){
        event.preventDefault();
        var newMovie = $("input").eq(0).val();

        if (newMovie.length > 2) {
            movies.push(newMovie);
        } 

        populateButtons(movies, "movie-button", "movie-buttons");
    });

    populateButtons(movies, "movie-button", "#movie-buttons")
});