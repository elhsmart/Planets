"use strict";
var Popup = function(parameters) {
    this.id         = Helpers.uniq();
    this.image      = null;

    this.optshift   = 32;
    this.width      = 0;
    this.height     = 0;

    this.globalCenter = {};

    this.dc         = document.createElement("canvas");
    this.dctx       = this.dc.getContext("2d");

    Helpers.setParams.call(this, parameters);

    if(this.type == "static") {
        this.options = {
            "trade": new PlanetsOption({
                parent: this,
                image: PlanetController.resources['options-trade'],
                color: "#0e71b3",
                caption: "Trade",
                clickEvent: function(planet, action) {
                    console.log("Click event must be here!\n"+"" +
                        "Planet: "+planet.getName()+"\n"+
                        "Action: "+this.caption);
                }
            }),
            "bookmark": new PlanetsOption({
                parent: this,
                image: PlanetController.resources['options-bookmark'],
                color: "#0e71b3",
                caption: "Bookmark",
                clickEvent: function(planet, action) {
                    console.log("Click event must be here!\n"+"" +
                        "Planet: "+planet.getName()+"\n"+
                        "Action: "+this.caption);
                }
            }),
            "ban": new PlanetsOption({
                parent: this,
                image: PlanetController.resources['options-ban'],
                color: "#de802e",
                caption: "Ban",
                clickEvent: function(planet, action) {
                    console.log("Click event must be here!\n"+"" +
                        "Planet: "+planet.getName()+"\n"+
                        "Action: "+this.caption);
                }
            })
        }
    }
}

Helpers.extend(Popup, Element);

Popup.prototype.handleEvent = function(type, evt) {
    if(this.type == "float") {
        return true;
    }

    switch(type) {
        case "mousemove": {
            // Testing here
            var shift = this.optshift+30;
            for(var opt in this.options) {
                this.testOption(this.options[opt], shift, evt);
                shift = shift + 40;
            }

            break;
        }
        case "mousedown": {
            var shift = this.optshift+30;
            for(var opt in this.options) {
                if(this.testOption(this.options[opt], shift, evt)) {
                    return this.options[opt].handleEvent(type, evt);
                }
                shift = shift + 40;
            }

            break;
        }
    }
}

Popup.prototype.testOption = function(option, shift, evt) {
    this.dctx.save();
    this.dctx.beginPath();
    this.dctx.moveTo(40, shift);
    this.dctx.lineTo(40+135, shift);
    this.dctx.lineTo(40+135, shift+40);
    this.dctx.lineTo(40, shift+40);
    this.dctx.closePath();
    this.dctx.stroke();
    if(this.dctx.isPointInPath(
        evt.x - this.x,
        evt.y - this.y
    )) {
        option.hover = true;
        this.dctx.restore();
        return true;
    } else {
        option.hover = false;
        this.dctx.restore();
        return false;
    }
}

Popup.prototype.draw = function() {

    this.dctx.clearRect(0, 0, this.width, this.height);
    this.dctx.drawImage(this.image, 0, 0);

    switch(this.type) {
        case "float": {
            var Props = {
                "name": {
                    title: "Planet:",
                    color: "#6bc1fd"
                },
                "owner": {
                    title: "Owner:",
                    color: "#14c8b9"
                },
                "alliance": {
                    title: "Alliance:",
                    color: "#6bc1fd"
                }
            };
            var shift = 25;
            this.dctx.fontSize = 16;
            this.dctx.fontFamily = "Arial";
            for(var prop in Props) {
                this.dctx.fillStyle = "#527fa1";
                this.dctx.fillText(Props[prop].title, 10, shift);
                this.dctx.fillStyle = Props[prop].color;
                this.dctx.fillText(this.parent["get"+Helpers.capitalize(prop)](), 70, shift);
                shift = shift + 20;
            }
            break;
        }
        case "static": {
            var shift = this.optshift;
            for(var a in this.options) {
                this.dctx.drawImage(this.options[a].draw(), 17, shift);
                shift = shift + 40;
            }
            break;
        }
    }


    return this.dc;
}

Popup.prototype.setType = function(type) {
    this.type = type;
}

Popup.prototype.setImage = function(img) {

    if(img instanceof Image) {
        this.image = img;
    }

    this.setWidth(this.image.width);
    this.setHeight(this.image.height);
}