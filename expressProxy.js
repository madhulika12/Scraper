var httpProxy = require('http-proxy');
var express = require('express');
var fs = require('fs');
var apiProxy = httpProxy.createProxyServer();
var cheerio = require('cheerio');
var app     = express();
var allmycards=[];
var json = { title : "", contact : "", review: "", description: ""};

app.get("/scrape", function(req, res){ 
  apiProxy.web(req, res, { target: 'http://www.houzz.com/professionals/c/Nashville,-TN:8082' });
  
  console.log(res);
});

