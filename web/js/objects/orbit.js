"use strict";
var Orbit = function(parameters) {
    this.planetRadius = 20;
    this.id = Helpers.uniq();
    this.radius     = 0;

    this.width      = 0;
    this.height     = 0;

    this.planets    = [];
    this.globalCenter = {};

    this.dc         = document.createElement("canvas");
    this.dctx       = this.dc.getContext("2d");

    this.hover      = false;

    Helpers.setParams.call(this, parameters);
}

Helpers.extend(Orbit, Element);

Orbit.prototype.setRadius = function(radius) {
    this.radius = radius;
    this.setWidth(radius*2+this.planetRadius*2);
    this.setHeight(radius*2+this.planetRadius*2);
}

Orbit.prototype.handleEvent = function(type, evt) {
    switch (type){
        case "mousemove": {
            this.lastMouseX = evt.x;
            this.lastMouseY = evt.y;

            this.update();
            /*var angle = Math.atan2(-(evt.y - this.globalCenter.y), (evt.x - this.globalCenter.x));
            if(angle < 0) {
                angle += 2 * Math.PI;
            }
            console.log(angle);*/
        }
    }
}

Orbit.prototype.drawPlanetPopup = function(planet) {
    console.log("Drawing");
}

Orbit.prototype.update = function() {
    if(this.hover) {
        for(var a in this.planets) {
            this.dctx.save();
            this.dctx.translate(this.width/2, this.height/2);

            this.dctx.rotate(this.planets[a].getPosition());
            this.dctx.beginPath();
            this.dctx.arc(0, this.radius, 15, 0, Math.PI*2, true);
            this.dctx.closePath();

            var mouseX = this.lastMouseX - (this.globalCenter.x - (this.radius + this.planetRadius));
            var mouseY = this.lastMouseY - (this.globalCenter.y - (this.radius + this.planetRadius));

            if(this.dctx.isPointInPath(mouseX, mouseY)) {
                this.drawPlanetPopup(this.planets[a]);
            }

            this.dctx.restore();
        }
    }
}

Orbit.prototype.draw = function(timestamp) {
    this.update();

    var drawData = null;
    this.dctx.clearRect(0, 0, this.width, this.height);
    //#55b7f2
    this.dctx.strokeStyle = "rgba(85, 183, 242, .5)";
    this.dctx.lineWidth = 1;

    if(this.hover) {
        this.dctx.strokeStyle = "rgba(85, 183, 242, 1)";
        this.dctx.lineWidth = 3;
    }

    this.dctx.beginPath();
    this.dctx.arc(this.width/2, this.height/2, this.radius, 0, Math.PI*2, true);
    this.dctx.closePath();
    this.dctx.stroke();

    for(var a in this.planets) {
        drawData = this.planets[a].draw(timestamp);
        this.dctx.save();

        this.dctx.translate(this.width/2, this.height/2);
        this.dctx.rotate(this.planets[a].getPosition());
        this.dctx.drawImage(drawData,
            (this.planets[a].width)/2*-1,
            (this.height/2-this.planets[a].height)
        );
        this.dctx.restore();
    }

    //console.log(this.dc.toDataURL());

    return this.dc;
}

Orbit.prototype.addPlanet = function(planet) {
    if(planet instanceof Planet) {
        planet.setParent(this);
        this.planets.push(planet);
    }
}
