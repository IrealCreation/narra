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
}