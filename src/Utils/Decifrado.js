module.exports = function Decifrado(decifrado, casas) {
  let text = "";

  for (let i = 0; i < decifrado.length; i++) {
    let caracter = decifrado.charCodeAt(i);
    let aux = "";

    if (caracter >= 97 && caracter <= 122) {
      if (caracter - casas < 97) {
        aux = String.fromCharCode(caracter - casas + 26);
      } else {
        aux = String.fromCharCode(caracter - casas);
      }
    } else if (caracter == 32 || caracter == 46 || caracter == 58) {
      aux = String.fromCharCode(caracter);
    }
    text += aux;
  }
  return text;
};
