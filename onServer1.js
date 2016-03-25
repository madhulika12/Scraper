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
  //var allLinks = ['http://www.houzz.com/pro/paragongroup/paragon-group-llc','http://www.houzz.com/pro/tennesseevalleyhomes/tennessee-valley-homes-inc','http://www.houzz.com/pro/pamelamichellekiani/pam-kiani-designer','http://www.houzz.com/pro/porch-company-nashville/the-porch-company','http://www.houzz.com/pro/dana-tucker/bella-tucker-decorative-finishes','http://www.houzz.com/pro/johnteselle/john-teselle','http://www.houzz.com/pro/jasonarnold/jason-arnold-interiors','http://www.houzz.com/pro/frenchscabinets/frenchs-cabinet-gallery-llc','http://www.houzz.com/pro/redleafinteriors/red-leaf-interiors-llc','http://www.houzz.com/pro/andersondesignstudio/anderson-design-studio','http://www.houzz.com/pro/norrisarchitecture/norris-architecture','http://www.houzz.com/pro/ameliedegaulle/amelie-de-gaulle-interiors','http://www.houzz.com/pro/franklg42/franks-home-maintenance','http://www.houzz.com/pro/ritterkevin/timeless-kitchen-cabinetry','http://www.houzz.com/pro/1kjmaxwell/littlebranch-farm','http://www.houzz.com/pro/crowellinteriors/crowell-co-interiors','http://www.houzz.com/pro/jldesyn/jl-design','http://www.houzz.com/pro/missionstonetile/mission-stone-tile','http://www.houzz.com/pro/kabinart/kabinart','http://www.houzz.com/pro/megdowns/smokey-mountain-tops','http://www.houzz.com/pro/matthew-john5813/building-company-number-7-inc','http://www.houzz.com/pro/ianhartert/hartert-russell','http://www.houzz.com/pro/usablespaceinteriors/usable-space-interiors','http://www.houzz.com/pro/vlcintl/vlc-international','http://www.houzz.com/pro/bobdzine01/bob-lancaster-designs','http://www.houzz.com/pro/connielong/connie-long-interiors','http://www.houzz.com/pro/annah-hill/dream-designs','http://www.houzz.com/pro/bradramsey/brad-ramsey-interiors','http://www.houzz.com/pro/sethargo1/focus-builders','http://www.houzz.com/pro/amy-gill/gill-design-and-construction-llc','http://www.houzz.com/pro/allardward/allard-ward-architects'];
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
      name = name.replace(/[Name]/g,"");
      name = name.replace(/<([^>]+)>/ig, '');
      name = name.replace(/:/g, '');
        console.log("A4");
        } else {
            var name = "null";
            console.log("B4");
            //jsonObj.data.push(name);
        }
      
      
      if (casper.exists("div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span")) {
        var location = this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span');
        console.log("A5");
      } else {
          var location = "null";
          console.log("B5");
          //jsonObj.data.push(location);
      }
      
      if (casper.exists("div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(4)")) {
        var city = this.fetchText('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(4)');
        console.log("A6");        
      } else {
          var city = "null";
          console.log("B6");
          //jsonObj.data.push(city);
      }
      
      if (casper.exists("div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(6)")) {
        var zipcode = this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span:nth-child(6)');
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
                "city" : location,
                "zipcode" : zipcode,
                "description" : description,
                "reviews" : reviews
            });
            
       require('utils').dump(jsonObj);
      //console.log(description);
        
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
    });
 });
});



