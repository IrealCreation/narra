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
        this.content = data;

        this.display = createDOM("div", "narra-main");
        this.parent.append(this.display);

        this.configuration = {};
        this.configuration["next-text"] = (this.content.configuration["next-text"]  == null ? "Continue..." : this.content.configuration["next-text"]);
        this.configuration["text-color"] = (this.content.configuration["text-color"]  == null ? "black" : this.content.configuration["text-color"]);
        this.configuration["background-color-top"] = (this.content.configuration["background-color-top"]  == null ? "black" : this.content.configuration["background-color-top"]);
        this.configuration["background-color-bottom"] = (this.content.configuration["background-color-bottom"]  == null ? "black" : this.content.configuration["background-color-bottom"]);

        var background = "-webkit-linear-gradient(90deg, " + this.configuration["background-color-bottom"] + " 0%, " + this.configuration["background-color-top"] + " 100%)";

        this.display.css({
            "color":this.configuration["text-color"],
            "background":background
        });

        //TODO: setup the basic configuration
        this.loadSequence(this.content.configuration.start);
    }

    loadSequence(name) {
        var thisStory = this;
        console.log("Displaying sequence " + name);

        var sequence = this.content[name];
        console.log(sequence);

        var sequenceDOM = createDOM("div", "sequence");
        var textDOM = createDOM("p", "text", sequence.text);
        this.makeItFloat(textDOM);
        this.display.append(sequenceDOM);
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