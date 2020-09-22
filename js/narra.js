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
        this.configuration["font"] = (this.content.configuration["font"]  == null ? "Times New Roman, serif" : this.content.configuration["font"]);
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
        this.configuration["sequence-animation-duration"] = (this.content.configuration["sequence-animation-duration"] == null ? 300 : this.content.configuration["sequence-animation-duration"]);

        this.setBackgroundColor(this.configuration["background-color-top"], this.configuration["background-color-bottom"]);

        //Memory will be used for configuration that can be changed/reset on the fly in the sequences
        this.memory = {};
        this.memory["font"] = this.configuration["font"];
        this.memory["text-color"] = this.configuration["text-color"];
        this.memory["background-color-top"] = this.configuration["background-color-top"];
        this.memory["background-color-bottom"] = this.configuration["background-color-bottom"];

        this.display.css({
            "font": thisStory.memory["font"],
            "color": thisStory.memory["text-color"],
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

    setBackgroundColor(colorTop, colorBottom) {
        var background = "-webkit-linear-gradient(90deg, " + colorBottom + " 0%, " + colorTop + " 100%)";

        this.display.css({
            "background":background
        });
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

        var animationDuration = (sequence["animation-duration"] == null ? thisStory.configuration["sequence-animation-duration"] : sequence["animation-duration"]);
        console.log(animationDuration);

        //Update or reset the memory config
        var memoryKeys = ["font", "text-color", "background-color-top", "background-color-bottom"];
        memoryKeys.forEach(function(key) {
            if(sequence[key] == "reset") {
                thisStory.memory[key] = thisStory.configuration[key];
            }
            else if(sequence[key] != null) {
                thisStory.memory[key] = sequence[key];
            }
        });

        //Apply the memory config
        sequenceDOM.css({
            "font": thisStory.memory["font"],
            "color": thisStory.memory["text-color"],
        });
        this.setBackgroundColor(thisStory.memory["background-color-top"], thisStory.memory["background-color-bottom"]);

        //Display the choices...
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
        //... or display the prompt for next sequence
        else if(sequence.next) {
            var nextDOM = createDOM("p", "next", thisStory.configuration["next-text"]);
            thisStory.makeItFloat(nextDOM);
            sequenceDOM.append(nextDOM);

            nextDOM.click(function() {
                thisStory.removeDOM($(".next"));
                thisStory.loadSequence(sequence.next);
            });
        }
        sequenceDOM.show(parseInt(animationDuration));
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