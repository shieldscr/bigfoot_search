$("document").ready(function() {
  $("#search-button").click(function(event){
    console.log("In click");
    event.preventDefault();

    $.ajax({
            url: 'http://localhost:9200/bigfoot/footprint/_search?q=shore',
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
              $('#result').append(data);
              console.log(data);
            },
            error: function (xhr, textStatus, errorThrown) {
              console.log(errorThrown);
            }
          });
  });
});
