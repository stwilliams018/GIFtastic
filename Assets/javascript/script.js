var Bands = ["Grateful Dead", "Phish", "WSP", "String Cheese", "Umphrey's McGee", "Allman Bros", "Devil  Makes Three","Donna the Buff","Lotus"]



$( document ).ready(function(){
            renderButtons();

$(document).on("click", ".band-btn", displayGIF);

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
        //var data = response;
        //var output =
        
        
        
        
        console.log(response);
        var band = $("<div class='bandDisp'>");
        var rating = response.data[0].rating;
        var pOne = $("<p>").text("Rating: " + rating);
        band.append(pOne);
        var imgURL = response.data[0].images.original.url;
        var image = $("<img>").attr("src", imgURL);
        band.append(image);
        $("#bandDiv").prepend(band);

 });


$(document).on("click", ".band-btn", displayGIF);
event.preventDefault();
  }})

