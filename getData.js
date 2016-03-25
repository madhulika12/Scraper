/*var ip_server = '127.0.0.1:8585';
var server = require('webserver').create();

var service = server.listen(ip_server, function(request, response) {
 */   var casper = require('casper').create({
        logLevel:"verbose",
        debug:true
    });

    var fs = require('fs');
    var jsonObj = { data : [] };
    var links;
    var nextBtn = "a.navigation-button.next";
    var description;
    var location;
    var otherLinks;
    var services;
    var details;
    var contact;
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    casper.start('http://www.houzz.com/professionals/c/nashville--TN/p/15');

    /*casper.on("page.error", function(msg, trace) {
      this.echo("Error: " + msg);
  });

  casper.on("resource.error", function(resourceError) {
      this.echo("ResourceError: " + JSON.stringify(resourceError, undefined, 4));
  });*/

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
              
              jsonObj.data.push({ 
                "title" : this.fetchText('a.profile-full-name'),
                "contact" : this.getHTML('div.pro-contact-methods span.pro-contact-text:nth-child(2)'),
                "services"  : this.getHTML('div.info-list-text span:nth-child(2) span'),
                "name" : this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(2) div.info-list-text'),
                "location" : this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span'),
                "description" : this.getHTML('div.profile-about div:nth-child(1)'),
                "reviews" : this.getHTML('div.pro-rating a span.pro-review-string span')
            });
              
              //jsonObj.array.title = this.fetchText('a.profile-full-name');
              //jsonObj.title = this.fetchText('a.profile-full-name');
/*
              jsonObj.services = this.getHTML('div.info-list-text span:nth-child(2) span');
              jsonObj.services = jsonObj.services.replace(/&amp;/g,"and"); 
              jsonObj.name = this.getHTML('div.info-list-text span:nth-child(3) span');
              jsonObj.location = this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span');
              //jsonObj.contact = this.fetchText('span.pro-contact-text');
              jsonObj.description = this.getHTML('div.profile-about div:nth-child(1)'); 
              //jsonObj.description.replace(/\s/g, '');   
              jsonObj.reviews = this.getHTML('div.pro-rating a span.pro-review-string span')
*/
              //jsonObj.data.description = jsonObj.data.description.replace(/[\t\n]/g,"");

              
              //this.echo(jsonObj.data.description);
              //this.echo(jsonObj);
              
              //var myJSON = JSON.stringify(jsonObj);
              require('utils').dump(jsonObj);


            });
            
          }

        });

    });
//require('utils').dump(jsonObj);

    casper.run(function(){
        this.exit();
    });
//});

