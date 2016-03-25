var casper = require('casper').create({
   logLevel:"verbose",
   debug:true,
    clientScripts:  ['jquery.js']
});

var jsonObj = {};
var links;
var name;
var paragraph;
var contact;
var description;
var location;
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

casper.start('http://www.houzz.com/professionals/c/Nashville,-TN');

casper.then(function getLinks(){
 links = this.evaluate(function(){
    var links = document.getElementsByClassName('pro-title');
    links = Array.prototype.map.call(links,function(link){
        return link.getAttribute('href');
    });
    return links;
});
});

casper.then(function(){
 this.each(links,function(self,link){
  if (link.match(regex)) {
    self.thenOpen(link,function(a){

       // I just manually extracted the stuff you wanted with jquery selectors
       var txtYouWant = casper.evaluate(function() {
          var desiredText = $($("div.info-list-text").first().find("span a span")[1]).text();
          desiredText += $($("div.info-list-text")[1]).text();
          desiredText += $($("div.info-list-text")[2]).text();
          return desiredTxt;
       });
    });
  }
});
});