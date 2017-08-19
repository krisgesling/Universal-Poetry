const scribble = require('scribbletune');

let chordTypes = ['maj','min','min7'];
let baseNotes = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];

let noteMap = [];
chordTypes.forEach((chord) => {
  baseNotes.forEach((note) => {
    noteMap.push(note+chord);
  });
});

let inputString = "This is a poem".toLowerCase();
let letters = inputString.split('');
let words = inputString.split(' ');
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

let clip = scribble.clip({
    notes: poemNotes,
    pattern: 'xxxx__--'.repeat(8)
});

scribble.midi(clip, 'poetry.mid');
