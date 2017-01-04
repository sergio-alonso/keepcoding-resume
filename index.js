#!/usr/bin/env node

// node index.js

var fs = require("fs");

fs.readFile("resume.md", function (err, data) {
    if (err) {
        throw err;
    }

    var markdown = data.toString();

    var content = [];
    
    markdown.split('\n').forEach(function(node) {

	
	if (node.indexOf('###') == 0) {
	}

	else if (node.indexOf('##') == 0) {
            content.push({
		label: node.replace('##','')
            })
	}

	else if (node.indexOf('#') == 0) {
            content.push({
		name: node.replace('#','')
	    })
	}

    });

    console.log(content);
});
