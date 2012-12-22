"use strict";
var Planet = function() {
    this.id = Helpers.uniq();
}

Helpers.extend(Planet, Element);