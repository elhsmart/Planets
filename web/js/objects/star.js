"use strict";
var Star = function(parameters) {

    this.id         = Helpers.uniq();
    this.orbits     = [];

    this.image      = null;

    this.x          = 0;
    this.y          = 0;

    this.width      = 0;
    this.height     = 0;

    this.globalCenter = {};

    this.dc         = document.createElement("canvas");

    this.dc.setAttribute("id", this.id);
    this.dctx       = this.dc.getContext("2d");

    Helpers.setParams.call(this, parameters);
}

Helpers.extend(Star, Element);

Star.prototype.appendOrbit = function(orbit) {
    if(orbit instanceof Orbit) {
        orbit.setParent(this);
        this.orbits.push(orbit)
    }
}

Star.prototype.handleEvent = function(type, evt) {
    switch(type) {
        case "mousemove": {
            var distance = Helpers.distance(this.globalCenter.x, this.globalCenter.y, evt.x, evt.y);
            for (var n = this.orbits.length - 1; n >= 0; n--) {
                if(this.orbits[n].radius-10 < distance &&
                    this.orbits[n].radius+10 > distance ) {
                    this.orbits[n].hover = true;
                    this.orbits[n].handleEvent(type, evt);
                } else {
                    this.orbits[n].hover = false;
                }
            }
            break;
        }
    }
}

Star.prototype.setImage = function(img) {

    if(img instanceof Image) {
        this.image = img;
    }

    this.setWidth(this.image.width);
    this.setHeight(this.image.height);
}

Star.prototype.draw = function(timestamp) {
    var orbitData = null;
    var drawData = null;

    this.dctx.clearRect(0, 0, this.width, this.height);
    // Compose all orbits

    for(var a in this.orbits) {
        drawData = this.orbits[a].draw(timestamp);
        if(orbitData == null) {
            orbitData = drawData;
            continue;
        }

        if(orbitData.width > drawData.width) {
            orbitData.getContext("2d").drawImage(
                drawData,
                (orbitData.width - drawData.width)/2,
                (orbitData.height - drawData.height)/2
            );
            continue;
        }

        drawData.getContext("2d").drawImage(
            orbitData,
            (drawData.width - orbitData.width)/2,
            (drawData.height - orbitData.height)/2
        );
        orbitData = drawData;
    }

    // Draw Star

    if(orbitData.width > this.width) {
        this.setWidth(orbitData.width);
        this.setHeight(orbitData.height);
    }

    this.dctx.drawImage(orbitData, 0, 0);

    this.dctx.drawImage(this.image,
        (this.dc.width - this.image.width) / 2,
        (this.dc.width - this.image.width) / 2
    );

    return this.dc;
}

