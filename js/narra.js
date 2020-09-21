/* Namespace */
var Narra = {}

Narra.Story = class {
    constructor(path) {
        var thisStory = this;

        this.parent = $("body");
        this.content = null;
        
        console.log("Trying to load " + path);

       $.getJSON( path, function(data) {
            console.log("Story loaded!");
            console.log(data);
            thisStory.start(data);
        })
        .fail(function(data) {
            console.log("Failing to load the story");
            console.log(data);
        })
    }

    start(data) {
        var thisStory = this;
        this.content = data;

        this.display = createDOM("div", "narra-main");
        this.parent.append(this.display);

        this.sequencesContainer = createDOM("div", "sequences-container");
        this.display.append(this.sequencesContainer);

        //Loading configuration
        this.configuration = {};
        this.configuration["start"] = this.content.configuration["start"];
        this.configuration["next-text"] = (this.content.configuration["next-text"]  == null ? "Continue..." : this.content.configuration["next-text"]);
        this.configuration["text-color"] = (this.content.configuration["text-color"]  == null ? "black" : this.content.configuration["text-color"]);
        this.configuration["background-color-top"] = (this.content.configuration["background-color-top"]  == null ? "black" : this.content.configuration["background-color-top"]);
        this.configuration["background-color-bottom"] = (this.content.configuration["background-color-bottom"]  == null ? "black" : this.content.configuration["background-color-bottom"]);
        this.configuration["background-image"] = this.content.configuration["background-image"];
        this.configuration["background-image-animation-duration"] = (this.content.configuration["background-image-animation-duration"] == null ? 0 : this.content.configuration["background-image-animation-duration"]);
        this.configuration["background-image-opacity"] = (this.content.configuration["background-image-opacity"] == null ? 1 : this.content.configuration["background-image-opacity"]);
        this.configuration["title"] = this.content.configuration["title"];
        this.configuration["subtitle"] = this.content.configuration["subtitle"];
        this.configuration["title-background-color"] = this.content.configuration["title-background-color"];
        this.configuration["title-animation-duration"] = (this.content.configuration["title-animation-duration"] == null ? 1000 : this.content.configuration["title-animation-duration"]);
        this.configuration["title-display-duration"] = (this.content.configuration["title-display-duration"] == null ? 3000 : this.content.configuration["title-display-duration"]);

        var background = "-webkit-linear-gradient(90deg, " + this.configuration["background-color-bottom"] + " 0%, " + this.configuration["background-color-top"] + " 100%)";

        this.display.css({
            "color":this.configuration["text-color"],
            "background":background
        });

        if(this.configuration["title"] != null) {
            thisStory.loadTitle();
            //The background image is loaded during the title display
        }
        else {
            thisStory.loadBackgroundImage();
            this.loadSequence(this.configuration.start);
        }
    }

    loadTitle() {
        var thisStory = this;
        var titleCardDOM = createDOM("div", "title-card");

        var titleTextDOM = createDOM("h1");
        titleTextDOM.html(this.configuration["title"]);

        this.display.append(titleCardDOM);
        titleCardDOM.append(titleTextDOM);

        if(this.configuration["subtitle"] != null) {
            var subtitleTextDOM = createDOM("h2");
            subtitleTextDOM.html(this.configuration["subtitle"]);
            titleCardDOM.append(subtitleTextDOM);
        }
        if(this.configuration["title-background-color"] != null) {
            titleCardDOM.css({
                "background-color": this.configuration["title-background-color"]
            });
        }

        //We cannot use fadeIn because of the flex display
        titleCardDOM.animate({
            opacity: 1
        }, thisStory.configuration["title-animation-duration"], "linear", function() {
            
            thisStory.loadBackgroundImage();

            window.setTimeout(function() {

                titleCardDOM.fadeOut(thisStory.configuration["title-animation-duration"], function() {
                    titleCardDOM.remove();
                    thisStory.loadSequence(thisStory.configuration.start);
                });

            } , thisStory.configuration["title-display-duration"]);

        });
    }

    loadBackgroundImage() {
        var thisStory = this;

        //Loading of the backgroundImage
        if(this.configuration["background-image"] != null) {
            var backgroundImage = new Image();
            backgroundImage.onload = function() {
                var width = backgroundImage.naturalWidth;
                var height = backgroundImage.naturalHeight;
                console.log("backgroundImage width: " + width + " ; height: " + height);

                var backgroundImageDOM = createDOM("div", "background-image");
                thisStory.display.append(backgroundImageDOM);

                backgroundImageDOM.css({
                    "background-image": "url(" + thisStory.configuration["background-image"] + ")",
                    "width": width * 4,
                    "height": height * 4,
                    "opacity": thisStory.configuration["background-image-opacity"],
                    "animation-duration": thisStory.configuration["background-image-animation-duration"]
                });
            }
            backgroundImage.onerror = function() { 
                console.log("Background image not found at path " + thisStory.configuration["background-image"]);
            }
            backgroundImage.src = "img/smoke.png";
        }
    }

    loadSequence(name) {
        var thisStory = this;
        console.log("Displaying sequence " + name);

        var sequence = this.content[name];
        console.log(sequence);

        var sequenceDOM = createDOM("div", "sequence");
        var textDOM = createDOM("p", "text", sequence.text);
        this.makeItFloat(textDOM);
        this.sequencesContainer.append(sequenceDOM);
        sequenceDOM.append(textDOM);

        if(sequence.choices != null) {
            $.each(sequence.choices, function( key, choice ) {
                var choiceDOM = createDOM("p", "choice", choice.text);
                thisStory.makeItFloat(choiceDOM);
                sequenceDOM.append(choiceDOM);

                choiceDOM.click(function() {
                    choiceDOM.addClass("selected");
                    thisStory.removeDOM($(".choice:not(.selected)"));
                    choiceDOM.unbind("click");
                    thisStory.loadSequence(choice.destination);
                });
            });
        }
        else if(sequence.next) {
            var nextDOM = createDOM("p", "next", thisStory.configuration["next-text"]);
            thisStory.makeItFloat(nextDOM);
            sequenceDOM.append(nextDOM);

            nextDOM.click(function() {
                thisStory.removeDOM($(".next"));
                thisStory.loadSequence(sequence.next);
            });
        }
        sequenceDOM.show(300);
    }

    makeItFloat(DOM) {
        var random = Math.ceil(Math.random() * 3);
        var className = "floating" + random;
        DOM.addClass(className);
    }

    removeDOM(DOM) {
        DOM.hide(300, function() {
            DOM.remove();
        });
    }
}