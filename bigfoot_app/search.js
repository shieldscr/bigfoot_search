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

        console.log('search: ' + 'http://localhost:9200/bigfoot/' + type + '/_search?q=' + searchInput);

        var jsonList = [];

        $.each(data.hits.hits[0]._source, function(key, value) {
          if(value) {
            if(String(value).includes(searchTerm)) {
              jsonList.push('<tr><td>' + key.replace('f_', '') + '</td><td><mark>' + value + '</mark></td></tr>');
            } else {
              jsonList.push('<tr><td>' + key.replace('f_', '') + '</td><td>' + value + '</td></tr>');
            }
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
