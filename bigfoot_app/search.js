$("document").ready(function() {
  $("#search-form").submit(function(event){
    event.preventDefault();
    var searchInput = $('#search-form :input').val();

    $.ajax({
      url: 'http://localhost:9200/bigfoot/footprint/_search?q=' + searchInput,
      type: 'GET',
      dataType: 'json',
      success: function (data, textStatus, xhr) {

        var jsonList = [];

        $.each(data.hits.hits[0]._source, function(key, value) {
          if(value) {
            jsonList.push('<tr><td>' + key.replace('f_', '') + '</td><td>' + value + '</td></tr>');
          }
        });

        $("#result").html('<table class="striped">' + jsonList.join("") + '</table>');

      },
      error: function (xhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  });
});
