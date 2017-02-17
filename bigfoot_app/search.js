$("document").ready(function() {
  $("#search-form").submit(function(event){
    event.preventDefault();
    var searchInput = $('#search-form :input').val();

    $.ajax({
      url: 'http://localhost:9200/bigfoot/all/_search?q=' + searchInput,
      type: 'GET',
      dataType: 'json',
      success: function (data, textStatus, xhr) {

        console.log('search: ' + 'http://localhost:9200/bigfoot/all/_search?q=' + searchInput);

        var outputList = [];
        var finalHtml = [];
        var resultCount = data.hits.hits.length;

        if(data.hits.hits[0]) {
          $.each(data.hits.hits, function(key, value) {
            $.each(value._source, function(key, value) {
              if(value) {
                if(String(value).includes(searchInput)) {
                  outputList.push('<tr><td>' + key.replace('f_', '') + '</td><td><mark>' + value + '</mark></td></tr>');
                } else {
                  outputList.push('<tr><td>' + key.replace('f_', '') + '</td><td>' + value + '</td></tr>');
                }
              }
            });

            buildTablePadding(outputList);

            if(outputList.length > 0) {
              finalHtml.push('<table class="striped">' + outputList.join("") + '</table>');
            } else {
              finalHtml.push('<h3 class="medium center pad-top">No results found. Bigfoot walks the Earth...</h3>');
            }
            outputList = [];
          });
          var resultsStats = '<p>Your search returned ' + resultCount + ' results:</p><br />';
          $("#result").html(resultsStats + finalHtml.join(""));
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  });

  function buildTablePadding(outputList) {
    outputList.push('<tr class="end-table-row"><td></td><td></td></tr>');
    outputList.push('<tr class="end-table-row"><td></td><td></td></tr>');
  }
});
