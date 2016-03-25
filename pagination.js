var casper = require('casper').create();

var url = 'Nashville,-TN'
var baseUrl = 'http://www.houzz.com/professionals/c/Nashville,-TN';
console.log(baseUrl);

var nextBtn = "a.navigation-button.next";

var allLinks = [];

casper.start(baseUrl);

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
  //require('utils').dump(allLinks);
  this.each(allLinks,function(self,link){
    this.thenOpen(link,function(a){
      jsonObj = {};
      jsonObj.array = [];
      jsonObj.array.title = this.fetchText('a.profile-full-name');

      jsonObj.services = this.getHTML('div.info-list-text span:nth-child(2) span');
      //jsonObj.services = jsonObj.services.replace(/&amp;/g,"and");  

      jsonObj.location = this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span');
      jsonObj.contact = this.getHTML('.proWebsiteLink span.pro-contact-text:nth-child(1)');
      jsonObj.description = this.getHTML('div.profile-about div:nth-child(1)');  
      //jsonObj.description.replace(/\s/g, '');   

      //require('utils').dump(jsonObj);
      //jsonObj.description = jsonObj.description.replace(/[\t\n]/g,"");   
      
      //jsonObj = JSON.stringify(jsonObj, null, '\t');
      require('utils').dump(jsonObj);
    });
  });
});