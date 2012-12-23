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
            /*var angle = Math.atan2(-(evt.y - this.globalCenter.y), (evt.x - this.globalCenter.x));
            if(angle < 0) {
                angle += 2 * Math.PI;
            }*/
            break;
        }
        case "mousedown": {
            this.lastMouseX = evt.x;
            this.lastMouseY = evt.y;
            for (var n = this.planets.length - 1; n >= 0; n--) {
                if(this.planets[n].hover) {
                    this.planets[n].stop();
                }
            }
        }
    }
}

Orbit.prototype.drawPlanetPopup = function(planet) {
    var popup = planet.renderPopup();
    switch(popup.type) {
        case "float":{
            var x = (this.globalCenter.x - 28) + this.radius * Math.cos(planet.getPosition()+Math.PI/2);
            var y = (this.globalCenter.y - 15) + this.radius * Math.sin(planet.getPosition()+Math.PI/2);
            break;
        }
        case "static": {
            var x = (this.globalCenter.x - 41.5) + this.radius * Math.cos(planet.getPosition()+Math.PI/2);
            var y = (this.globalCenter.y - 41.5) + this.radius * Math.sin(planet.getPosition()+Math.PI/2);
        }
    }
    popup.setX(x);
    popup.setY(y);
    this.parent.pushPopup(popup);
}

Orbit.prototype.update = function() {
    if(this.hover) {
        for(var a in this.planets) {
            if(this.planets.hasOwnProperty(a)){
                this.dctx.save();
                this.dctx.translate(this.width/2, this.height/2);

                this.dctx.rotate(this.planets[a].getPosition());
                this.dctx.beginPath();
                this.dctx.arc(0, this.radius, 15, 0, Math.PI*2, true);
                this.dctx.closePath();

                var mouseX = this.lastMouseX - (this.globalCenter.x - (this.radius + this.planetRadius));
                var mouseY = this.lastMouseY - (this.globalCenter.y - (this.radius + this.planetRadius));

                if(this.dctx.isPointInPath(mouseX, mouseY)) {
                    this.planets[a].hover = true;
                    this.drawPlanetPopup(this.planets[a]);
                } else {
                    this.planets[a].hover = false;
                }

                this.dctx.restore();
            }
        }
    }
}

Orbit.prototype.draw = function(timestamp) {

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
        if(this.planets.hasOwnProperty(a)) {
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
    }

    this.update();
    return this.dc;
}

Orbit.prototype.addPlanet = function(planet) {
    if(planet instanceof Planet) {
        planet.setParent(this);
        this.planets.push(planet);
    }
}
