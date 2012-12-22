"use strict";
var PlanetController = new Planets({
    fps: 5
});

var resources = {
    stars: {
        "1": "/img/stars/1.png"
    },
    planets: {
        "1": "/img/planets/1_1.png",
        "2": "/img/planets/1_2.png",
        "3": "/img/planets/2_1.png",
        "4": "/img/planets/2_2.png",
        "5": "/img/planets/3_1.png",
        "6": "/img/planets/3_2.png",
        "7": "/img/planets/4_1.png",
        "8": "/img/planets/4_2.png",
        "9": "/img/planets/5_1.png",
        "10": "/img/planets/5_2.png",
        "11": "/img/planets/6_1.png",
        "12": "/img/planets/6_2.png"
    }
}

for(var a in resources) {
    for(var i in resources[a]) {
        PlanetController.pushResource(a+"-"+i, resources[a][i]);
    }
}

PlanetController.run(function(){
    Star = new Star({
        parent: PlanetController,
        image: PlanetController.resources['stars-1']
    });

    PlanetController.elements.push(Star);
});