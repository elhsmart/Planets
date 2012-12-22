"use strict";
var Orbit = function(parameters) {
    this.id = Helpers.uniq();
    this.radius = 0;

    this.width = 0;
    this.height = 0;

    this.dc         = document.createElement("canvas");
    this.dctx       = this.dc.getContext("2d");

    Helpers.setParams.call(this, parameters);
}

Helpers.extend(Orbit, Element);

Orbit.prototype.setRadius = function(radius) {
    this.radius = radius;
    this.setWidth(radius*2+20);
    this.setHeight(radius*2+20);
}

Orbit.prototype.draw = function() {


    this.dctx.beginPath();
    this.dctx.arc(this.width/2, this.height/2, this.radius, 0, Math.PI*2, true);
    this.dctx.closePath();
    this.dctx.stroke();

    return this.dc;
}

Orbit.prototype.addPlanet = function(planet) {
    if(planet instanceof Planet) {
        this.planets.push(planet);
    }
}
