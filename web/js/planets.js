"use strict";
var Planets = function(parameters) {

    this.frame      = 0;
    this.resources  = {};
    this.c          = Helpers.get("worldCanvas");
    this.cx         = this.c.getContext("2d");

    this.width      = this.c.width;
    this.height     = this.c.height;

    this._flags     = {
        "_resources_loaded": false
    },
    this.data       = {}
    this.elements   = []
};

Planets.prototype.pushResource = function(name, url) {
    this.resources[name] = url
}

Planets.prototype.draw = function() {
    var self = this;
    self.frame++;

    self.cx.clearRect(0, 0, this.width, this.height);
    for(var a in self.elements) {
        var drawData = this.elements[a].draw();
        self.cx.save();
        self.cx.translate((this.width-drawData.width)/2, (this.height-drawData.height)/2);
        self.cx.drawImage(drawData, self.elements[a].getX(), self.elements[a].getY());
        self.cx.restore();
    }

    //requestAnimationFrame(function(){self.draw();});
}

Planets.prototype.loadResources = function(cb) {
    console.log("Start loading resources");
    var self = this;
    self.data.loadedResourcesCount = 0;
    self.data.resourcesCount = Helpers.objLength(self.resources);
    for(var resource in self.resources) {
        var tempImg     = new Image();
        tempImg.onload  = function() {

            // debug only
            /*
            var img = new Image();
            img.src = this.src;
            img.style.border = "1px solid red";
            img.style.float = "right";
            document.getElementById("body").appendChild(img);
            */
            // end

            self.data.loadedResourcesCount++;
            if(self.data.loadedResourcesCount == self.data.resourcesCount) {
                cb();
            }
        }
        tempImg.src = self.resources[resource];
        self.resources[resource] = tempImg;
    }
}

Planets.prototype.run = function(cb) {
    var self = this;
    self.loadResources(function(){
        cb.call(window);
        self.draw();
    });
}