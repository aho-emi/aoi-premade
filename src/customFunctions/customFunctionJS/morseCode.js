
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [text, to="encode"] = data.inside.splits;

    function textToMorse(text) {
  const morseCodeMap = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
    G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
    M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
    S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..", " ": "/"
  };

  return text.split("").map(char => morseCodeMap[char.toUpperCase()] || "").join(" ");
}

function morseToText(morseCode) {
  const morseCodeMap = {
    ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E", "..-.": "F",
    "--.": "G", "....": "H", "..": "I", ".---": "J", "-.-": "K", ".-..": "L",
    "--": "M", "-.": "N", "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R",
    "...": "S", "-": "T", "..-": "U", "...-": "V", ".--": "W", "-..-": "X",
    "-.--": "Y", "--..": "Z", "/": " "
  };

  return morseCode.split(" ").map(code => morseCodeMap[code] || "").join("");
}


if (to.toLowerCase() == 'encode') {
data.result = textToMorse(text)
} else if (to.toLowerCase() == 'decode') {
data.result = morseToText(text);
}

  
    return {
        code: d.util.setCode(data),
    };
};
