var casper = require("casper").create();

console.log("First");

var url = 'http://www.houzz.com/professionals/c/Nashville,-TN';

console.log("Before start");

casper.start(url);

casper.waitForSelector('a.navigation-button', processPage, stopScript);

casper.run();

console.log("Before stopScript");
console.log(casper.getCurrentUrl());

var stopScript = function() {
    console.log("Inside stopScript");
    casper.echo("STOPPING SCRIPT").exit();
};

var processPage = function() {
    console.log("Inside processPage");
    console.log(this);

    if (!casper.exists("a.navigation-button")) {
         stopScript();
    };

    casper.thenClick("a.navigation-button").then(function() {
            console.log(this.getCurrentUrl());
            this.echo(this.getCurrentUrl());
            this.waitForSelector("#content",processPage, stopScript);
    }).then(processPage);
};

processPage();