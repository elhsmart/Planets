"use strict";
var Star = function(parameters) {

    this.id         = Helpers.uniq();
    this.orbits     = [];

    this.image      = null;

    this.x          = 0;
    this.y          = 0;

    this.width      = 0;
    this.height     = 0;

    this.dc         = document.createElement("canvas");
    this.dctx       = this.dc.getContext("2d");

    Helpers.setParams.call(this, parameters);
}

Helpers.extend(Star, Element);

Star.prototype.appendOrbit = function(orbit) {
    if(orbit instanceof Orbit) {
        this.orbits.push(orbit)
    }
}

Star.prototype.setParent = function(parent) {
    this.parent = parent;
}

Star.prototype.setImage = function(img) {

    if(img instanceof Image) {
        this.image = img;
    }

    this.setWidth(this.image.width);
    this.setHeight(this.image.height);
}

Star.prototype.setX = function(x) {
    this.x = x;
}

Star.prototype.setY = function(y) {
    this.y = y;
}

Star.prototype.getX = function() {
    return this.x;
}

Star.prototype.getY = function() {
    return this.y;
}

Star.prototype.setWidth = function(width) {
    this.width = width;

}

Star.prototype.setHeight = function(height) {
    this.height = height;
}

Star.prototype.getWidth = function() {
    return this.width;
}

Star.prototype.getHeight = function() {
    return this.height;
}

Star.prototype.draw = function() {
    // Compose all orbits

    // Draw Star

    this.dctx.drawImage(this.image, 0, 0);
    return this.dc;
}

