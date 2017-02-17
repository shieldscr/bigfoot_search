$("document").ready(function() {
  $("#search-form").submit(function(event){
    event.preventDefault();
    var searchInput = $('#search-form :input').val();
    var type = searchInput.split(' ')[0];
    var searchTerm = searchInput.split(' ')[1];

    $.ajax({
      url: 'http://localhost:9200/bigfoot/' + type + '/_search?q=' + searchInput,
      type: 'GET',
      dataType: 'json',
      success: function (data, textStatus, xhr) {

        console.log('search: ' + 'http://localhost:9200/bigfoot/' + type + '/_search?q=' + searchTerm);

        var outputList = [];

        if(data.hits.hits[0]) {
          $.each(data.hits.hits[0]._source, function(key, value) {
            if(value) {
              if(String(value).includes(searchTerm)) {
                outputList.push('<tr><td>' + key.replace('f_', '') + '</td><td><mark>' + value + '</mark></td></tr>');
              } else {
                outputList.push('<tr><td>' + key.replace('f_', '') + '</td><td>' + value + '</td></tr>');
              }
            }
          });
          outputList.push('<tr class="end-table-row"><td></td><td></td></tr>');
          $("#result").html('<table class="striped">' + outputList.join("") + '</table>');
        } else {
          $("#result").html('<h3 class="medium center pad-top">No results found. Bigfoot walks the Earth...</h3>');
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  });
});
