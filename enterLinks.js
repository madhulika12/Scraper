var casper = require('casper').create({
    logLevel:"verbose",
    debug:true
});

casper.start('http://www.houzz.com/professionals/c/Nashville,-TN');

casper.then(function getLinks(){
    links = this.evaluate(function(){
            var links = document.getElementsByClassName('pro-title');
            links = Array.prototype.map.call(links,function(link){
                return link.getAttribute('href');
            });
            return links;
            this.echo(links);
        });
    });

    casper.then(function(){
        this.each(links,function(self,link){
          if (link.match(regex)) {
            self.thenOpen(link,function(a){
              jsonObj.title = this.fetchText('a.profile-full-name');
              jsonObj.location = this.fetchText('div.info-list-text');
              jsonObj.contact = this.fetchText('span.pro-contact-text');
              jsonObj.description = this.fetchText('div.profile-about div');    

              this.echo(jsonObj.title);
            });
          }
        });
    });
    
    casper.run(function(){
        this.exit();
    });



