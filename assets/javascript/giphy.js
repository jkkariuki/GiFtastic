var ninetysfavorites = ["Fresh Prince", "Family Matters", "Martin", "Dragon Ball Z", "Dexter's Lab", "Johnny Bravo"];

            function setButtons() {
                $("#button-space").empty();

                for (var i = 0; i < ninetysfavorites.length; i++) {
                    var buttons = $("<button>");
                    buttons.addClass("showBtn");
                    buttons.text(ninetysfavorites[i]);
                    buttons.attr("value", ninetysfavorites[i]);
                    $("#button-space").append(buttons);
                }

                $(".showBtn").on("click", function() {
                    var show = $(this).attr("value");
                    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + show + "&limit=10&offset=0&rating=G&lang=en";
                    $("#gifSpace").empty()




                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).done(function(response) {
                        console.log(response);
                        console.log(response.data);
                        var results = response.data;
                        for (var i = 0; i < results.length; i++) {
                            var gifDiv = $("<div  class='gifdiv'>");
                            var gifRating = $("<div>").append("<h4 class='rating'> Rating: " + results[i].rating + "</h4>");
                            var gifImage = $("<img class='gif'><span></span>");
                            gifImage.attr("src", results[i].images.downsized_still.url);
                            gifImage.attr("data-state", "still");
                            gifImage.attr("data-still", results[i].images.downsized_still.url);
                            gifImage.attr("data-animate", results[i].images.downsized.url)



                            gifRating.append(gifImage);
                            gifDiv.append(gifRating)
                            $("#gifSpace").prepend(gifDiv);
                        }
                        $(".gif").on("click", function() {
                            var state = $(this).attr("data-state");

                            console.log(state);

                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate")
                            } else {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still")
                            }
                        });
                    });
                })
            }


            $("#add-show").on("click", function(event) {
                event.preventDefault();

                var show = $("#show-input").val().trim();

                ninetysfavorites.push(show);

                setButtons();
            })

            setButtons();