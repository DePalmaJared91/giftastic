$(document).ready(function () {
    var director = ["Stanley Kubrick", "Brian DePalma", "Quentin Tarantino", "Steven Spielberg", "Martin Scorsese"]
    GIF = " "
    //Render Button//
    //functon displaying director data!!!//
    function renderButton() {
        //delete dierctor buttons before adding new.//
        $("#director-view").empty();
        //looping through the array.//
        for (var i = 0; i < director.length; i++) {//generate buttons for each director in array//
            var a = $('<button>');

            //add a class!
            a.addClass('director');

            //adding data-attribute with value of director index i//
            a.attr('data-name', director[i]);

            //button text w value of director at index i//
            a.text(director[i]);

            $("#director-view").append(a);
        }

        s = $("#director-input").focus();
    }

    renderButtons();

    //CLICK BUTTON//
    $("add-director").on('click', function () {

        event.preventDefault();

        //grab text from input box//
        var directors = $("director-input").val().trim();

        //this director from txtbx will be  added to array//
        director.push(directors);

        renderButton();
    });

    $(document).on('click', 'button', function () {
        //delete directors prior to adding new ones //
        //necessary otherwise we will have repeat.//
        $('#GIF').empty();
        var b = $(this).attr('date-name'); //'this' is for the bitton clicked//
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=ndgx0YAub80qCCtqD2EBAPGYpHA7nvyg";
        console.log(queryURL);

        //ajax call
        $.ajax({
            url: queryURL, method: 'GET'
        }) //after data from API//
            .done(function (response) {
                console.log(response);

                //storing array of results in results var.//
                var results = response.data;
                //loop every result item//
                for (var i = 0; i < results.length; i++) {

                    //div with the class item//
                    var gifDiv = $('<div class="item">');
                    //storing result items rating//
                    var rating = results[i].rating;
                    //create element w rating diplayed//
                    var r = $('<p>').text("Rating:" + rating);
                    //image tag//
                    var gifImage = $('<img>');
                    //giving image tag and src attribution of the property pulled off the result item//
                    gifImage.attr('src', results[i].images.fixed_height_still.url)
                        .attr('data-still', results[i].images.fixed_height_still.url)
                        .attr('data-animate', results[i].images.fixed_height.url)
                        .attr('data-state', "still")
                        .addClass("showImage");

                    //display rating+img//
                    gifDiv.append(r)
                        .append(gifImage);
                    //prepending data not necessary because cleared//
                    $('#GIF').prepend(gifDiv);
                }
            });
    });
    //Listens for click on image//
    $(document).on('click', '.showImage', function () {
        var state = $(this).data('state');
        //if clicked image state is still update src attr to data-animate value//
        if (state == "still") {
            console.log("still image works");
            //set image data-state to animate//
            $(this).attr('src', $(this).data('animate'))
                .data('state', 'animate');
        } else {
            //set src to data-still val//
            console.log("animated image works");
            $(this).attr('src', $(this).data('still'))
                .data('state', 'still');
        }
    });


});

