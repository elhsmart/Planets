"use strict";
var Element = function() {

}

Element.prototype.setX = function(x) {
    this.x = x;
}

Element.prototype.setY = function(y) {
    this.y = y;
}

Element.prototype.getX = function() {
    return this.x;
}

Element.prototype.getY = function() {
    return this.y;
}

Element.prototype.setWidth = function(width) {
    this.width = width;
    this.dc.width = this.width;
}

Element.prototype.setHeight = function(height) {
    this.height = height;
    this.dc.height = this.height;
}

Element.prototype.getWidth = function() {
    return this.width;
}

Element.prototype.getHeight = function() {
    return this.height;
}