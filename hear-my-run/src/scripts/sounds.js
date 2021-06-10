// https://gist.github.com/adactio/d988edc418aabfa2220456dc548dedc1
export const play = (notes) => {
  const output = new AudioContext();

  let playing = null;
  let note = 0;
  let instrument = output.createOscillator();
  let amplifier = output.createGain();

  const playNotes = () => {
    if (note < notes.length) {
      instrument.frequency.value = 440 + (notes[note] * 64); // hertz
      note = note + 1;
    } else {
      amplifier.gain.value = 0;
    }
    playing = window.setTimeout(playNotes, 25);
  };

  instrument.type = 'sine';
  instrument.start();
  instrument.connect(amplifier);

  amplifier.gain.value = 0.7;
  amplifier.connect(output.destination);

  playNotes();
};

