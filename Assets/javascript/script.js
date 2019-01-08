var Bands = ["Joy", "Sadness", "Anger", "Fear", "Surprise", "Shame", "Pity","Love","Hate","Happy","Anticipation","Trust",]


$( document ).ready(function(){
    renderButtons();

$(document).on("click", ".band-btn", displayGIF);

$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");

    console.log(state)
  }
});


function renderButtons() {
$("#buttons-view").empty();

for (var i = 0; i < Bands.length; i++) {

    var a = $("<button>");
    a.addClass("band-btn");
    a.attr("data-name", Bands[i]);
    a.text(Bands[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-band").on("click", function(event) {
    event.preventDefault();
    var band = $("#band-input").val().trim();
    Bands.push(band);
    renderButtons();
  });

  function displayGIF (){
    var band = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=gX4H558Q6yEke6DWpTCs4eeaFGZyL3yp&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
       console.log(response);
       
       for (var i = 0; i < 10; i++){

        var band = $("<div class='bandDisp'>");
        var imgURL = response.data[i].images.original.url;
        var imgURLStill = response.data[i].images.original_still.url;
        //var imgState = '"' + imgURL+ '"' + " " + "data-still=" + '"' + imgURL + '"' + " " + "data-animate=" + '"' + imgURL + '"'
        var image = $("<img>").attr({ src : imgURLStill , "data-animate" : imgURL , "data-still": imgURLStill , "data-state" : "still" , "class" : "gif"});
        band.append(image);
        var rating = response.data[i].rating;
        var pOne = $("<p>").text("Rating: " + rating);
        band.append(pOne);
        $("#bandDiv").prepend(band);

        //console.log(imgState);
        console.log(imgURL);
        console.log(imgURLStill);
        console.log(image)
        
       }

    });
    

$(document).on("click", ".band-btn", displayGIF);

  }})

