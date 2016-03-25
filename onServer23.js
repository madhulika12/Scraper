//script before you included href functionality in it


var casper = require('casper').create();

var url = casper.cli.get(0);
console.log(url);

var page2 = casper.cli.get(1);
console.log(page2);

jsonObj = { data : [] };

//var url = 'http://www.houzz.com/professionals/c/Nashville--TN/p/15';

var nextBtn = "a.navigation-button.next";
var allLinks = [];

casper.start(url);

casper.waitForSelector(nextBtn, processPage);

casper.run();
console.log("Getting into processPage");

function processPage() {
    console.log("into processPage");
    for (var i = 1; i <= page2; i = i + 1) {
        this.then(function(){
            console.log(i);
            var pageData = this.evaluate(getPageData);
            allLinks = allLinks.concat(pageData);
            console.log(allLinks);

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
  console.log(" into getPageData");
  var links = document.getElementsByClassName('pro-title');
  links = Array.prototype.map.call(links,function(link){
    return link.getAttribute('href');
  });
  return links;
}

casper.then(function(){
  
  console.log("into then");
  this.each(allLinks,function(self,link){
    console.log("Inside the each function");
    //console.log(link);
    this.thenOpen(link,function(a){
      console.log("Inside function that extracts data");
      //console.log(link);
      
      if (casper.exists("a.profile-full-name")) {
          var title = this.fetchText('a.profile-full-name');
          //jsonObj.data.push(title);
          console.log("A1");
      } else {
          var title = "null";
          console.log("B1");
          //jsonObj.data.push(title);
      }
      
      if (casper.exists("div.pro-contact-methods span.pro-contact-text:nth-child(2)")) {
          var contact = this.fetchText('div.pro-contact-methods span.pro-contact-text:nth-child(2)');
          contact = contact.replace(/[Website]/g,"");
          console.log("A2");
          //jsonObj.data.push(contact);
      } else {
          var contact = "null";
          console.log("B2");
          //jsonObj.data.push(contact);
      }
      
      if (casper.exists("div.info-list-text span:nth-child(2) span")) {
          var services = this.getHTML('div.info-list-text span:nth-child(2) span');
          services = services.replace(/&amp;/g,"and");
          console.log("A3");
      } else {
          var services = "null";
          console.log("B3");
          //jsonObj.data.push(services);
      }
      
      if (casper.exists("div.pro-info-horizontal-list div.info-list-label:nth-child(2) div.info-list-text")) {
        var name = this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(2) div.info-list-text');
        name = name.replace(/\bContact\b/g, ''); 
        name = name.replace(/\bName\b/g,"");
        name = name.replace(/<([^>]+)>/ig, '');
        name = name.replace(/:/g, '');
        console.log("A4");
        } else {
            var name = "null";
            console.log("B4");
            //jsonObj.data.push(name);
        }

        if (casper.exists("div.pro-contact-methods a.proWebsiteLink")) {
          var url = this.getElementAttribute('div.pro-contact-methods a.proWebsiteLink', 'href');
          //jsonObj.data.push(title);
          console.log("webLink A1");
      } else {
          var url = "null";
          console.log("webLink B1");
          //jsonObj.data.push(title);
      }
      
      
      if (casper.exists("div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span")) {
        var location = this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span');
        if (location.match(/\bclass\b/g, '')) {
         location = this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span a');
        }
         
        console.log("A5");
      } else {
          var location = "null";
          console.log("B5");          
          //jsonObj.data.push(location);
      }
      
      if (casper.exists("div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(4)")) {
        var city = this.fetchText('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(4)');
        console.log("A6");   
      if (city.match(/\bclass\b/g, '')) {
         city= this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(4) a');
        }     
      } else {
          var city = "null";
          console.log("B6");
          //jsonObj.data.push(city);
      }
      
      if (casper.exists("div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(6)")) {
        var zipcode = this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(6)');
        if (zipcode.match(/\bclass\b/g, '')) {
         zipcode= this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(6) a');
        }
        console.log("A7");
      }else {
          var zipcode = "null";
          console.log("B7");
          //jsonObj.data.push(zipcode);
      };
      
      if (casper.exists("div.profile-about div:nth-child(1)")) {
        var description = this.fetchText('div.profile-about div:nth-child(1)');
        description = description.replace(/[\t\n]/g,"");
        console.log("A8");
    }else {
            var description = "null";
            console.log("B8");
          //jsonObj.data.push(description);
      };
      
      if (casper.exists("div.pro-rating a span.pro-review-string span")) {
        var reviews = this.getHTML('div.pro-rating a span.pro-review-string span');
        console.log("A9");
    } else {
            var reviews = "null";
            console.log("B9");
            //jsonObj.data.push(reviews);
        };
  
  //require('utils').dump(jsonObj);
  
      jsonObj.data.push({ 
                "title" : title,
                "contact" : contact,
                "services"  : services,
                "name" : name,
                "location" : location,
                "city" : city,
                "zipcode" : zipcode,
                "description" : description,
                "url" : url,
                "reviews" : reviews
            });
            
       //require('utils').dump(jsonObj);
      //console.log(description);
        
       casper.open('https://zapier.com/hooks/catch/29s1m6/', {
        method: 'post',
        data: {
            "title" : title,
                "contact" : contact,
                "services"  : services,
                "name" : name,
                "location" : location,
                "city" : city,
                "zipcode" : zipcode,
                "description" : description,
                "url" : url,
                "reviews" : reviews
        }
    });
    });
 });
});


