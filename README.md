# narra
 Narrative game system for web browers

 ## Writing a story

 ### Configuration
 Stories are JSON objects. They must include a **configuration** object containing the following values:
 * *start*: the ID of the starting sequence of the story. Required.
 * *title*: the title of the story. If none, the title card is skipped.
 * *subtitle*: the subtitle, displayed under the title on the title card.
 * *title-background-color*: the default color of the title card background, as used by the CSS property "background-color" (hexadecimal, rgb, rgba, or standard name). Default value is none.
 * *title-animation-duration*: the duration of the title card fadeIn and fadeOut animations (in milliseconds). Default is 1000.
 * *title-display-duration*: the duration the title card is in full display, in-between the fading animations (in milliseconds). Default is 3000.
 * *next-text*: the text displayed when the reader is prompted to continue to the next sequence. Default value is "Continue...".
 * *font*: the default font of the text, as used by the CSS property "font-family". Default value is "Times New Roman; serif".
 * *text-color*: the default color of the text, as used by the CSS property "color" (hexadecimal, rgb, rgba, or standard name). Default value is "black".
 * *background-color-top*: the default color of the top gradient background, as used by the CSS property "background-color" (hexadecimal, rgb, rgba, or standard name). Default value is "white".
 * *background-color-bottom*: the default color of the bottom gradient background, as used by the CSS property "background-color" (hexadecimal, rgb, rgba, or standard name). Default value is "white".
 * *background-image*: the path to an image to use as a background, displayed over the background-color.
 * *background-image-opacity*: the opacity of the background image. Default value is "1".
 * *background-image-animation-duration*: the duration of the background image animation loop (the larger the number, the slower the animation). "0" to disable animation. Default value is "0".
 * *sequence-animation-duration*: the default time it takes for sequences to appear (in milliseconds). Default is 300.

 ### Sequences
 Except from the configuration, stories are made up **sequences** of text that end by an interaction from the reader (either a choice or a simple input). A sequence is a JSON object, associated to a key that is used to identify it (ID). It accepts the following values:
 * *text*: the text to display to the reader. It can be a string, or an array of strings that will be displayed as independant paragraphs.
 * *next*: the ID of the next sequence to go to once the reader has made an input (click, spacebar, or enter). If a "choice" value is also present, the "next" value will be ignored and the "choice" displayed instead.
 * *choices*: an array of choices that represents narratives branches offered to the reader (see "choices" bellow for more information).
 * *font*: the font to use for the text, as used by the CSS property "font-family". Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".
 * *text-color*: the color of the text, as used by the CSS property "color" (hexadecimal, rgb, rgba, or standard name). Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".
 * *background-color-top*: the color of the top gradient background, as used by the CSS property "background-color" (hexadecimal, rgb, rgba, or standard name). Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".
 * *background-color-bottom*: the color of the top gradient background, as used by the CSS property "background-color" (hexadecimal, rgb, rgba, or standard name). Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".
 * *animation-duration*: the time it takes for the sequence to appear (in milliseconds). Default is the configuration value.
 * *variables*: an object containing the variable names (as keys) to modify (as values) when this sequence is reached. A variable is a boolean, with its name being a string, and a default value of false.

 ### Choices
 A **choice** represents a narrative branch offered to the reader at the end of a sequence, leading to another sequence. Please note that, semanticaly, we here use the word "choice" to designate a specific option available to pick, and not the range of the various options (as in "I made the choice to live" and not "We're confronted to a difficult choice"). It accepts the following values:
 * *text*: the text to display to the reader for this choice.
 * *destination*: the ID of the sequence this choice leads to.
 * *font*: the font to use for the text, as used by the CSS property "font-family". Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".
 * *text-color*: the color of the text, as used by the CSS property "color" (hexadecimal, rgb, rgba, or standard name). Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".
 * *conditions*: an array of variable names which, if one of them is true, unlocks this choice; otherwise it will be hidden to the reader.

 ## The project

 ### TODO list
 * Make the background-image animation more customizable