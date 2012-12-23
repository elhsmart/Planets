"use strict";
var Planet = function(parameters) {
    this.id         = Helpers.uniq();
    this.image      = 0;

    this.stopped    = false;
    this.width      = 0;
    this.height     = 0;

    this.speed      = 1; // Rad/sec;

    this.position   = 0;

    this.globalCenter = {};

    this.dc         = document.createElement("canvas");
    this.dctx       = this.dc.getContext("2d");

    this.popups     = {
        static: new Popup({
            parent: this,
            type: "static",
            image: PlanetController.resources['popups-static']
        }),
        float: new Popup({
            parent: this,
            type: "float",
            image: PlanetController.resources['popups-float']
        }),
    }

    Helpers.setParams.call(this, parameters);
}

Helpers.extend(Planet, Element);

Planet.prototype.handleEvent = function(type, evt) {

}

Planet.prototype.renderPopup = function() {
    if(this.stopped) {
        return this.popups.static;
    }

    return this.popups.float;
}

Planet.prototype.setImage = function(img) {
    if(img instanceof Image) {
        this.image = img;
    }

    this.setWidth(this.image.width);
    this.setHeight(this.image.height);
}

Planet.prototype.setSpeed = function(speed) {
    this.speed = speed;
}

Planet.prototype.getSpeed = function() {
    return this.speed;
}

Planet.prototype.setName = function(name) {
    this.name = name;
}

Planet.prototype.getName = function() {
    return this.name;
}

Planet.prototype.setOwner = function(owner) {
    this.owner = owner;
}

Planet.prototype.getOwner = function() {
    return this.owner;
}

Planet.prototype.setAlliance = function(alliance) {
    this.alliance = alliance;
}

Planet.prototype.getAlliance = function() {
    return this.alliance;
}

Planet.prototype.getPosition = function() {
    return this.position;
}

Planet.prototype.setPosition = function(pos) {
    this.position = pos;
}

Planet.prototype.getStartPosition = function() {
    return this.startPosition;
}

Planet.prototype.setStartPosition = function(pos) {
    this.startPosition = pos;
}

Planet.prototype.stop = function() {
    this.stopped = true;
}

Planet.prototype.start = function() {
    this.stopped = false;

    delete this.traverseTo("Star").popup;
    this.traverseTo("Orbit").hover = false;
    var pos = this.getPosition();
    this.updatePosition(new Date());

    this.startPosition = this.startPosition - (this.position - pos);
}

Planet.prototype.updatePosition = function(timestamp) {
    if(!this.stopped){
        var startTimestamp  = this.getStartTimestamp();
        var timeDelta       = timestamp.getTime() - startTimestamp.getTime();

        this.setPosition(this.startPosition + this.speed / 1000 * timeDelta);
    }
}

Planet.prototype.draw = function(timestamp) {
    this.updatePosition(timestamp);
    this.dctx.clearRect(0,0,this.dc.width, this.dc.height);

    if(this.parent.hover) {
        this.dctx.strokeStyle = "rgba(85, 183, 242, 1)";
        this.dctx.fillStyle = "rgba(0, 0, 0, 1)";
        this.dctx.lineWidth = 3;

        this.dctx.beginPath();
        this.dctx.arc(this.width/2, this.height/2, 15, 0, Math.PI*2, true);
        this.dctx.closePath();
        this.dctx.fill();
        this.dctx.stroke();
    }

    this.dctx.drawImage(this.image, 0, 0);
    return this.dc;
}
