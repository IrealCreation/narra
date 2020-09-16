/* Namespace */
var Narra = {}

Narra.Story = class {
    constructor(name) {
        var thisStory = this;

        this.parent = $("body");
        this.content = null;

        var path = "stories/" + name + ".json";
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

        var color = (this.content.configuration["text-color"]  == null ? "black" : this.content.configuration["text-color"]);
        var backgroundTop = (this.content.configuration["background-color-top"]  == null ? "black" : this.content.configuration["background-color-top"]);
        var backgroundBottom = (this.content.configuration["background-color-bottom"]  == null ? "black" : this.content.configuration["background-color-bottom"]);
        var background = "-webkit-linear-gradient(90deg, " + backgroundBottom + " 0%, " + backgroundTop + " 100%)";
        console.log("background : " + background);

        this.display.css({
            "color":color,
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
        var choicesDOM = createDOM("ul", "choices");
        this.display.append(sequenceDOM);
        sequenceDOM.append(textDOM, choicesDOM);

        if(sequence.choices != null) {
            $.each(sequence.choices, function( key, choice ) {
                var choiceDOM = createDOM("li", "choice", choice.text);
                choicesDOM.append(choiceDOM);

                choiceDOM.click(function() {
                    choicesDOM.remove();
                    var textChoice = createDOM("p", "text", choice.text);
                    sequenceDOM.append(textChoice);
                    thisStory.loadSequence(choice.destination);
                });
            });
        }
    }

    makeItFloat(DOM) {
        var random = Math.ceil(Math.random() * 3);
        var className = "floating" + random;
        DOM.addClass(className);
    }
}