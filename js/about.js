$(document).ready(function() {
  // cache the window object
  $window = $(window);

  $('section[data-type="background"]').each(function() {
    // declare the variable to affect the defined data-type
    var $scroll = $(this);

    $(window).scroll(function() {
      // HTML5 proves useful for helping with creating JS functions!
      // also, negative value because we're scrolling upwards                             
      var yPos = -($window.scrollTop() / $scroll.data('speed'));

      // background position
      var coords = '50% ' + yPos + 'px';

      // move the background
      $scroll.css({
        backgroundPosition: coords
      });
    }); // end window scroll
  }); // end section function

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  var typeIt = function(element,txt,start){
    var $el = $(element);
    var humanize = Math.round(Math.random() * (100 - 30)) + 30;
    var txtLen = txt.length;
    var timeOut = setTimeout(function() {
      var type = txt.substring(0, start);
      start++;
      $el.text(type + "_");
      typeIt(element,txt,start);
      if (type.length >= txtLen) {
        $el.text($el.text().slice(0, -1)); // remove the '|'
        clearTimeout(timeOut);
      }
    }, humanize);
  };

var showQuote = function() {
  var yql_url = "https://query.yahooapis.com/v1/public/yql";
  var url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  $.ajax({
    url: yql_url,
    data: {
      q: 'SELECT * FROM json WHERE url="' + url + '"',
      format: "json",
      jsonCompat: "new"
    },
    dataType: "json",
    success: function(response) {    
      var quote = response.query.results.json.quoteText;
      var author = response.query.results.json.quoteAuthor;
      quote = quote.slice(0,-1);
      txt = '"'+ quote +'"'+" - "+author;
      
      typeIt(".writer",txt,0);
    }
  });
};
showQuote();
}); // close out script