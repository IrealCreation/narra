# narra
 Narrative game system for web browers

 ## Writing a story

 ### Configuration
 Stories are JSON objects. They must include a **configuration** object containing the following values:
 * *start*: the starting sequence of the story. Required.
 * *font*: the default font of the text, as used by the CSS property "font-family". Default value is "Times New Roman; serif".
 * *text-color*: the default color of the text, as used by the CSS property "color" (hexadecimal, rgb, rgba, or standard name). Default value is "black".
 * *background-color*: the default color of the background, as used by the CSS property "background-color" (hexadecimal, rgb, rgba, or standard name). Default value is "white".

 ### Sequences
 Except from the configuration, stories are made up **sequences** of text that end by an interaction from the reader (either a choice or a simple input). A sequence is a JSON object, associated to a key that is used to identify it (ID). It accepts the following values:
 * *text*: the text to display to the reader.
 * *next*: the ID of the next sequence to go to once the reader has made an input (click, spacebar, or enter). If a "choice" value is also present, the "next" value will be ignored and the "choice" displayed instead.
 * *choice*: an array of choices that represents narratives branches offered to the reader (see "choices" bellow for more information).
 * *font*: the font to use for the text, as used by the CSS property "font-family". Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".
 * *text-color*: the default color of the text, as used by the CSS property "color" (hexadecimal, rgb, rgba, or standard name). Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".
 * *background-color*: the default color of the background, as used by the CSS property "background-color" (hexadecimal, rgb, rgba, or standard name). Default to the value of the previous sequence. You can reset it back to the configuration value by using "reset".