var casper = require('casper').create();

var url = casper.cli.get(0);
//console.log(url);

var page2 = casper.cli.get(1);
//console.log(page2);

jsonObj = { data : [] };
j = 0;

//var url = 'http://www.houzz.com/professionals/c/Nashville--TN/p/15';

var nextBtn = "a.navigation-button.next";
var allLinks = [];

casper.start(url);

casper.waitForSelector(nextBtn, processPage);

casper.run();

function processPage() {
    for (var i = 1; i <= page2; i = i + 1) {
        this.then(function(){
            //console.log(i);
            var pageData = this.evaluate(getPageData);
            allLinks = allLinks.concat(pageData);
            //console.log(allLinks);

            if (!this.exists(nextBtn)) {
                return;
            }

            this.thenClick(nextBtn).then(function() {
                this.echo(this.getCurrentUrl());
            });
        });
    };
}

function getPageData(){
  var links = document.getElementsByClassName('pro-title');
  links = Array.prototype.map.call(links,function(link){
    return link.getAttribute('href');
  });
  return links;
}

i = 0;

casper.then(function(){
    casper.thenOpen(allLinks[23],function(a){
        
        while(i < allLinks.length) {
            console.log("Inside function that extracts data");
            //console.log(j);
            console.log(allLinks[i]);
      
      var description = this.fetchText('div.profile-about div:nth-child(1)');
      description = description.replace(/[\t\n]/g,"");
      
      var name = this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(2) div.info-list-text');
      name = name.replace(/\bContact\b/g, ''); 
      name = name.replace(/<([^>]+)>/ig, '');
      name = name.replace(/:/g, '');
      
      var contact = this.fetchText('div.pro-contact-methods span.pro-contact-text:nth-child(2)');
      contact = contact.replace(/[Website]/g,"");
      
      //console.log("After contact");
      
      //var services = this.getHTML('div.info-list-text span:nth-child(2) span');
      //services = services.replace(/&amp;/g,"and");
      
      jsonObj.data.push({ 
                "title" : this.fetchText('a.profile-full-name'),
                "contact" : contact,
                //"services"  : services,
                "name" : name,
                "location" : this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span'),
                "city" : this.fetchText('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(4)'),
                "zipcode" : this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(6)'),
                "description" : description,
                "reviews" : this.getHTML('div.pro-rating a span.pro-review-string span')
            });
            
            i = i + 1;
        console.log("After JSON object");
        //require('utils').dump(jsonObj);
        
       /*casper.open('https://zapier.com/hooks/catch/29s1m6/', {
        method: 'post',
        data: {
            "title" : this.fetchText('a.profile-full-name'),
                "contact" : contact,
                "services"  : services,
                "name" : name,
                "location" : this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span'),
                "city" : this.fetchText('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(4)'),
                "zipcode" : this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(6)'),
                "description" : description,
                "reviews" : this.getHTML('div.pro-rating a span.pro-review-string span')
        }
                
    });*/
        };
    });
});


