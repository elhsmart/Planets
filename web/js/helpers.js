"use strict";
var Helpers = {
    uniqId: 0,

    get: function(id) {
        return document.getElementById(id);
    },

    objLength: function(obj) {
        return Object.keys(obj).length;
    },

    extend: function(child, parent){
        var F = function() { }
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.superclass = parent.prototype;
    },

    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    uniq: function() {
        Helpers.uniqId++;
        return Helpers.uniqId;
    },

    setParams: function(parameters) {
        if(typeof parameters == "object") {
            var a = null;
            for(var a in parameters) {
                if(typeof this["set"+Helpers.capitalize(a)] == "function") {
                    this["set"+Helpers.capitalize(a)](parameters[a]);
                }
            }
        }
    },

    distance: function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
};

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback, canvas){
            window.setTimeout(callback, 1000 / 60);
        };
})();