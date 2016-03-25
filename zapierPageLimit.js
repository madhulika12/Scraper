var casper = require('casper').create();

jsonObj = { data : [] };
var url = casper.cli.get(0);
var page2 = casper.cli.get(1);
var url = 'http://www.houzz.com/professionals/c/Nashville--TN/p/15';
var nextBtn = "a.navigation-button.next";
var allLinks = [];

casper.start(url);

casper.waitForSelector(nextBtn, processPage);

casper.run();

function processPage() {
  var pageData = this.evaluate(getPageData);
  allLinks = allLinks.concat(pageData);

  if (!this.exists(nextBtn)) {
    return;
  }

  this.thenClick(nextBtn).then(function() {
    this.echo(this.getCurrentUrl());
    //this.wait(1000);
  }).then(processPage);
}

function getPageData(){
  //return document.title;
  var links = document.getElementsByClassName('pro-title');
  links = Array.prototype.map.call(links,function(link){
    return link.getAttribute('href');
  });
  return links;
}

casper.then(function(){
  this.each(allLinks,function(self,link){
      
    this.thenOpen(link,function(a){
      
      var description = this.fetchText('div.profile-about div:nth-child(1)');
      description = description.replace(/[\t\n]/g,"");
      
      var name = this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(2) div.info-list-text');
      name = name.replace(/[<b>Contact</b>: ]/g,"");
      
      jsonObj.data.push({ 
                "title" : this.fetchText('a.profile-full-name'),
                "contact" : this.fetchText('div.profile-about div:nth-child(1)'),
                "services"  : this.getHTML('div.info-list-text span:nth-child(2) span'),
                "name" : name,
                "location" : this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span'),
                "description" : description,
                "reviews" : this.getHTML('div.pro-rating a span.pro-review-string span')
            });
            
      /* casper.open('https://zapier.com/hooks/catch/29s1m6/', {
        method: 'post',
        data: {
            "title" : this.fetchText('a.profile-full-name'),
                "contact" : this.getHTML('div.pro-contact-methods span.pro-contact-text:nth-child(2)'),
                "services"  : this.getHTML('div.info-list-text span:nth-child(2) span'),
                "name" : name,
                "location" : this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span'),
                "description" : description,
                "reviews" : this.getHTML('div.pro-rating a span.pro-review-string span')
        }
    });*/
       
       
       
    }).then(function() {
        console.log(jsonObj.data.length);
        //console.log(jsonObj);
        if (jsonObj.data.length == 13) { 
            console.log(jsonObj.data[13].title);
    }
        /*for(var i = 0; i < jsonObj.data.length; i = i + 1 ) {
            console.log(i);
            console.log("zaptitle");
                //zapTitle.push(jsonObj.data[i]);
                console.log(jsonObj.data[i].title);
            //}
        }*/
        //require('utils').dump(jsonObj.data[2].title);
        //require('utils').dump(jsonObj);
        
        //require('utils').dump(jsonObj.data[8]);
        //require('utils').dump(zapTitle);
        
        for(var i = 0; i < jsonObj.data.length; i = i + 1 ) {
            zapServices.push(jsonObj.data[i].services);
        }
        
        /*casper.open('https://zapier.com/hooks/catch/29s1m6/', {
            method: 'post',
            data: {"title" : zapTitle,
            //"contact" : zapContact,
            "services" : zapServices
        }*/
                
        
    });
 });
});




