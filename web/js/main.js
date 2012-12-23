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
    },
    "popups": {
        "float": "/img/popups/float.png",
        "static": "/img/popups/static.png"
    },
    "options": {
        "ban": "/img/options/ban.png",
        "bookmark": "/img/options/bookmark.png",
        "trade": "/img/options/trade.png"
    }
}

for(var a in resources) {
    for(var i in resources[a]) {
        PlanetController.pushResource(a+"-"+i, resources[a][i]);
    }
}

PlanetController.run(function(){
    var MainStar = new Star({
        parent: PlanetController,
        image: PlanetController.resources['stars-1'],
        globalCenter: PlanetController.getGlobalCenter()
    });

    var pos = 0;
    for(var i=0;i<12;i++ ) {
        this["Orbit"+i] = new Orbit({
            parent: MainStar,
            radius: 100+(i*25),
            globalCenter: PlanetController.getGlobalCenter()
        });

        pos = (Math.floor(Math.random() * Math.floor(Math.PI*2*100))) / 100;
        //console.log('planets-'+i);
        this['Planet'+i] = new Planet({
            image: PlanetController.resources['planets-'+(i+1)],
            speed: Math.PI*2/(40+(i*20)),
            startPosition: pos,
            globalCenter: PlanetController.getGlobalCenter(),
            name: PlanetNames.rand(),
            owner: Nicknames.rand(),
            alliance: AllianceNames.rand()
        });

        this["Orbit"+i].addPlanet(this["Planet"+i]);
        MainStar.appendOrbit(this["Orbit"+i]);
    }

    PlanetController.elements.push(MainStar);
    PlanetController.listen();
});