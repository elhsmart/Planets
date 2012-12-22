"use strict";
var Planets = function(parameters) {

    this.frame      = 0;
    this.resources  = {};
    this.c          = Helpers.get("worldCanvas");
    this.cx         = this.c.getContext("2d");

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

    for(var a in self.elements) {
        var drawData = this.elements[a].draw();
        self.cx.drawImage(drawData, self.elements[a].getX(), self.elements[a].getY());
    }

    requestAnimationFrame(function(){self.draw();});
}

Planets.prototype.loadResources = function(cb) {
    console.log("Start loading resources");
    var self = this;
    self.data.loadedResourcesCount = 0;
    self.data.resourcesCount = Helpers.objLength(self.resources);
    for(var resource in self.resources) {
        var tempImg     = new Image();
        tempImg.onload  = function() {
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