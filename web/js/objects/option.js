"use strict";
var PlanetsOption = function(parameters) {
    this.id         = Helpers.uniq();
    this.image      = null;

    this.width      = 163;
    this.height     = 32;

    this.globalCenter = {};

    this.dc         = document.createElement("canvas");
    this.dctx       = this.dc.getContext("2d");

    this.dc.width   = this.width;
    this.dc.height  = this.height;

    this.hover      = false;
    Helpers.setParams.call(this, parameters);
}

Helpers.extend(PlanetsOption, Element);

PlanetsOption.prototype.handleEvent = function(type, evt) {
    switch(type) {
        case "mousedown": {
            document.getElementById('body').style.cursor = "auto";
            var planet = this.traverseTo("Planet");
            planet.start();
            this.clickEvent(planet, evt);
            break;
        }
    }
}

PlanetsOption.prototype.draw = function() {

    this.dctx.clearRect(0,0,this.width, this.height);
    if(this.hover) {
        this.dctx.fillStyle = "#3e7aa3";
        this.dctx.fillRect(0,0,this.width, this.height);
    }
    this.dctx.drawImage(this.image, 10, 0);
    this.dctx.fillStyle = this.color;
    if(this.hover) {
        this.dctx.fillStyle = "#fff";
    }
    this.dctx.font = "bold 12px Arial";
    this.dctx.fillText(this.caption, 56, 21);

    return this.dc;
}

PlanetsOption.prototype.setColor = function(color) {
    this.color = color;
}

PlanetsOption.prototype.setClickEvent = function(e) {
    this.clickEvent = e;
}

PlanetsOption.prototype.setCaption = function(caption) {
    this.caption = caption;
}

PlanetsOption.prototype.setImage = function(img) {
    if(img instanceof Image) {
        this.image = img;
    }
}