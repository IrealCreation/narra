# narra
 Narrative game system for web browers

 ## Writing a story

 ### Configuration
 Stories are JSON objects. They must include a **configuration** object containing the following values:
 * *start*: the ID of the starting sequence of the story. Required.
 * *font*: the default font of the text, as used by the CSS property "font-family". Default value is "Times New Roman; serif".
 * *text-color*: the default color of the text, as used by the CSS property "color" (hexadecimal, rgb, rgba, or standard name). Default value is "black".
 * *background-color-top*: the default color of the top gradient background, as used by the CSS property "background-color" (hexadecimal, rgb, rgba, or standard name). Default value is "white".
 * *background-color-bottom*: the default color of the bottom gradient background, as used by the CSS property "background-color" (hexadecimal, rgb, rgba, or standard name). Default value is "white".

 ### Sequences
 Except from the configuration, stories are made up **sequences** of text that end by an interaction from the reader (either a choice or a simple input). A sequence is a JSON object, associated to a key that is used to identify it (ID). It accepts the following values:
 * *text*: the text to display to the reader.
 * *next*: the ID of the next sequence to go to once the reader has made an input (click, spacebar, or enter). If a "choice" value is also present, the "next" value will be ignored and the "choice" displayed instead.
 * *choices*: an array of choices that represents narratives branches offered to the reader (see "choices" bellow for more information).
 * *font*: the font to use for the text, as used by the CSS property "font-family". Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".
 * *text-color*: the color of the text, as used by the CSS property "color" (hexadecimal, rgb, rgba, or standard name). Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".
 * *background-color*: the color of the page background, as used by the CSS property "background-color" (hexadecimal, rgb, rgba, or standard name). Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".

 ### Choices
 A **choice** represents a narrative branch offered to the reader at the end of a sequence, leading to another sequence. Please note that, semanticaly, we here use the word "choice" to designate a specific option available to pick, and not the range of the various options (as in "I made the choice to live" and not "We're confronted to a difficult choice"). It accepts the following values:
 * *text*: the text to display to the reader for this choice.
 * *destination*: the ID of the sequence this choice leads to.
 * *font*: the font to use for the text, as used by the CSS property "font-family". Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".
 * *text-color*: the color of the text, as used by the CSS property "color" (hexadecimal, rgb, rgba, or standard name). Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".