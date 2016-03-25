var casper = require('casper').create();

var url = casper.cli.get(0);

var page2 = casper.cli.get(1);
//console.log(page2);

var url = 'http://www.houzz.com/professionals/c/Nashville--TN/p/30';
console.log(url);

var allLinks = ['http://www.houzz.com/pro/paragongroup/paragon-group-llc','http://www.houzz.com/pro/tennesseevalleyhomes/tennessee-valley-homes-inc','http://www.houzz.com/pro/porch-company-nashville/the-porch-company','http://www.houzz.com/pro/dana-tucker/bella-tucker-decorative-finishes','http://www.houzz.com/pro/johnteselle/john-teselle','http://www.houzz.com/pro/jasonarnold/jason-arnold-interiors','http://www.houzz.com/pro/frenchscabinets/frenchs-cabinet-gallery-llc','http://www.houzz.com/pro/redleafinteriors/red-leaf-interiors-llc','http://www.houzz.com/pro/andersondesignstudio/anderson-design-studio','http://www.houzz.com/pro/norrisarchitecture/norris-architecture','http://www.houzz.com/pro/ameliedegaulle/amelie-de-gaulle-interiors','http://www.houzz.com/pro/franklg42/franks-home-maintenance','http://www.houzz.com/pro/ritterkevin/timeless-kitchen-cabinetry','http://www.houzz.com/pro/1kjmaxwell/littlebranch-farm','http://www.houzz.com/pro/crowellinteriors/crowell-co-interiors','http://www.houzz.com/pro/jldesyn/jl-design','http://www.houzz.com/pro/missionstonetile/mission-stone-tile','http://www.houzz.com/pro/kabinart/kabinart','http://www.houzz.com/pro/megdowns/smokey-mountain-tops','http://www.houzz.com/pro/matthew-john5813/building-company-number-7-inc','http://www.houzz.com/pro/ianhartert/hartert-russell','http://www.houzz.com/pro/usablespaceinteriors/usable-space-interiors','http://www.houzz.com/pro/vlcintl/vlc-international','http://www.houzz.com/pro/bobdzine01/bob-lancaster-designs','http://www.houzz.com/pro/connielong/connie-long-interiors','http://www.houzz.com/pro/annah-hill/dream-designs','http://www.houzz.com/pro/bradramsey/brad-ramsey-interiors','http://www.houzz.com/pro/sethargo1/focus-builders','http://www.houzz.com/pro/amy-gill/gill-design-and-construction-llc','http://www.houzz.com/pro/allardward/allard-ward-architects'];

casper.start(url);

casper.run();

casper.then(function(){
  this.each(allLinks,function(self,link){
    console.log("Inside the each function");
    console.log(Array.isArray(allLinks));
    console.log(link);
    this.thenOpen(link,function(a){
      console.log("Inside function that extracts data");
      console.log(typeof(link));
      console.log(link);
      
      var description = this.fetchText('div.profile-about div:nth-child(1)');
      console.log(description);
});
 });
    });


