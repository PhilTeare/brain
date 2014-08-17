gm = require("gm");
fs = require("fs");
var nn = require('../lib/brain.js');
var net = new nn.NeuralNetwork();
facts = [];

aFiles = [];
bFiles = [];
targetWidth = 50;
targetHeight = 50;

width = 0;
height = 0;
chns = 3;

aFiles = fs.readdirSync("./server/data/a/");
bFiles = fs.readdirSync("./server/data/b/");
fileIndex = 0;
allFiles = aFiles.concat(bFiles);
curpath = "./server/data/a/";
curCat = "a";
out = {a:1};

console.log(allFiles);

for (file in allFiles){
	fileIndex++;
	if (fileIndex>aFiles.length){
		var curpath = "./server/data/b/";
		out={b:1};
	}

	i = gm(curpath + allFiles[file]).options({
		imageMagick : true
	}).resize(targetWidth,targetHeight);

	i.size(function (err, size) {
		width = size.width;
		height = size.height;
		pixelBytes = width * height * chns;

		i=i.setFormat('ppm').toBuffer(function(err, buffer) {
			var ar = [];
			console.log(buffer.length);
			ar = JSON.stringify(buffer);
			ar = ar.slice(buffer.length-pixelBytes);
			facts.push({input:ar,output:out});
			
			if (fileIndex == allFiles.length){
				net.train(facts);
			}
		});
	});
	
}
