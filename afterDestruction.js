var casper = require('casper').create();

var url = 'http://www.houzz.com/professionals/c/Nashville,-TN';

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
      jsonObj = { data : [] };
      jsonObj.data.push({ 
                "title" : this.fetchText('a.profile-full-name'),
                "contact" : this.getHTML('div.pro-contact-methods span.pro-contact-text:nth-child(2)'),
                "services"  : this.getHTML('div.info-list-text span:nth-child(2) span'),
                "name" : this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(2) div.info-list-text'),
                "location" : this.getHTML('div.pro-info-horizontal-list div.info-list-label:nth-child(3) div.info-list-text span'),
                "description" : this.getHTML('div.profile-about div:nth-child(1)'),
                "reviews" : this.getHTML('div.pro-rating a span.pro-review-string span')
            });

      require('utils').dump(jsonObj);
    });
  });
});


//var startUrl = 'http://www.houzz.com/professionals/c/Nashville--TN/p/number[1]*3';
			    	//var endUrl = 'http://www.houzz.com/professionals/c/Nashville--TN/p/number[2]*3';


