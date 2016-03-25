var casper = require('casper').create({
    logLevel:"verbose",
    debug:true
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
      this.echo(links);
      if (link.match(regex)) {
        self.thenOpen(link,function(a){
          var location = this.fetchText('div.info-list-text');
          //var location = document.querySelectorAll("div.info-list-text")[1];
          var contact = this.fetchText('span.pro-contact-text');
          var description = this.fetchText('div.profile-about div');
          //this.echo(location);
          //this.echo(contact);
          //this.echo(description);
        });
      }
    });
});
casper.run(function(){
    this.exit();
});