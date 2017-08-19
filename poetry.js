const scribble = require('scribbletune');

let inputString = "Anyone can write a poem. Anyone can make music.";
let chordTypes = [2,3,4];//['maj','min','maj7'];
let baseNotes = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];
let noteStyle = {
  default: 'x__',
  space: '-',
  stop: 'x'
};
let sanitisedString = inputString.replace('.', '  ');

let noteMap = [];
chordTypes.forEach((chord) => {
  baseNotes.forEach((note) => {
    noteMap.push(note+chord);
  });
});

let letters = sanitisedString.toLowerCase().split('');
//let words = inputString.split(' ');
let poemNotes = letters.map((char) => {
  let charCode = char.charCodeAt(0);
  let note;
  switch (charCode) {
    case 32:
      note = 'c1';
      break;
    default:
      note = noteMap[charCode-96];
  }
  return note;
});

function generatePattern(array) {
  let patternString = array.map((char) => {
    let style;
    switch (char) {
      case ' ':
        style = noteStyle.space;
        break;
      case 't':
      case 'p':
      case 'k':
        style = noteStyle.stop;
        break
      default:
        style = noteStyle.default;
    }
    return style;
  }).join('');
  return patternString;
}

let clip = scribble.clip({
    notes: poemNotes,
    pattern: generatePattern(letters)
});

scribble.midi(clip, 'poetry.mid');
