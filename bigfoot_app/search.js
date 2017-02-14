$("document").ready(function() {
  $("#search-form").submit(function(event){
    event.preventDefault();
    var searchInput = $(this).serialize();
    $.ajax({
            url: 'http://localhost:9200/bigfoot/footprint/_search?q=' + searchInput,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
              $.each(data.hits.hits[0]._source, function(key, value){
                $("#result").append('<div>' + key + ': ' + value + '</div>');
              });
            },
            error: function (xhr, textStatus, errorThrown) {
              console.log(errorThrown);
            }
          });
  });
});
