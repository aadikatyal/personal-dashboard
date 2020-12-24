$(function() {

  $('#ticker').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
         var ticker = $('#ticker').val();
         $.ajax({
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
            type: 'GET',
            data: {
              symbols: ticker,
              region: 'US'
            },
            beforeSend: function(request) {
                $('#stockPrice').html("Please wait...");
                request.setRequestHeader("x-rapidapi-key", "fbbe4b93c8mshb63ac7c61893c68p14efe3jsn97b81aea735c");
                request.setRequestHeader("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com"); 
                request.setRequestHeader("useQueryString", true);
            },            
            cache: false,
            success: function(response) {
              if (response.quoteResponse.result.length > 0) {
                var stockPrice = response.quoteResponse.result[0].regularMarketPrice;
                $('#stockPrice').html("<span style='font-weight:bold;'>" + stockPrice + "</span>");
              } else {
                $('#stockPrice').html("<i style='color:red;'>Stock symbol not found</i>");
              }
            },
            error: function() {
              $('#stockPrice').html("<i style='color:red;'>ERROR</i>");
            },
            complete: function() {
                //TODO
            }
          });
      }
  });
});

