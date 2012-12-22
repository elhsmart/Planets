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
    }
};