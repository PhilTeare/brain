//http://stackoverflow.com/questions/6775767/how-can-i-draw-an-image-from-the-html5-file-api-on-canvas

var a = {
    name:"cat1",
    array:[],
    files:[]
};

var b = {
    name:"cat2",
    array:[],
    files:[]
};

function filesChanged(filesInput) {
    var imgArrays = filesToArrays(filesInput.files);
    eval(filesInput.name).array = imgArrays;
}

function filesToArrays(files) {
    var imgArrays = [];
    var curFile = {};
    for (fileIndex in files) {
        curFile = files[fileIndex];
        try{
            data = fileToArray(curFile);
            imgArrays.push(data);
        }
        catch(err){

        }
    }
    return imgArrays;
}

function fileToArray(file) {
    var ctx = document.getElementById('canv').getContext('2d');
    var img = new Image;

    //http://www.html5rocks.com/en/tutorials/file/dndfiles/
    img.src = URL.createObjectURL(file);
    img.onload = function(e) {
        ctx.drawImage(img, 250,250);
        data = ctx.getImageData(0,0,250,250).data;
        return data;
    };
}

//http://www.w3schools.com/tags/canvas_getimagedata.asp