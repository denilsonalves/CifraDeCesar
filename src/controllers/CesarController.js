const axios = require("axios");
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const local = path.resolve(__dirname, "..", "..", "tmp", "answer.json");
require("dotenv").config();
const sendURL = process.env.SENDURL;
const getURL = process.env.GETURL;
const Decifrado = require("../Utils/Decifrado");
const crypto = require("crypto");
const FormData = require("form-data");

function saveFile(file) {
  fs.writeFile(local, file, err => {
    if (err) {
      console.log("Erro ao salvar o arquivo", err);
    } else {
      console.log("Arquivo salvo", file);
    }
  });
}

module.exports = {
  async salvarArquivo(req, res) {
    const resposta = await axios.get(getURL);

    const answer = JSON.stringify(resposta.data);
    saveFile(answer);

    return res.status(200).json("OK");
  },

  async decifrar(req, res) {
    const asyncRead = promisify(fs.readFile);

    try {
      const aux = await asyncRead(local);
      const rf = JSON.parse(aux);

      const dec = Decifrado(rf.cifrado, rf.numero_casas);

      rf["decifrado"] = dec;

      const cryhash = crypto
        .createHash("sha1")
        .update(dec)
        .digest("hex");

      rf["resumo_criptografico"] = cryhash;
      console.log(rf);

      saveFile(JSON.stringify(rf));
    } catch (err) {
      console.error(err);
    }
    return res.status(200).json("OK");
  },

  async enviar(req, res) {
    try {
      const formData = new FormData();
      formData.append("answer", fs.createReadStream(local), {
        filename: "answer.json"
      });
      let resp = await axios
        .post(sendURL, formData, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
          }
        })
        .then(response => console.log(response));
    } catch (err) {
      console.log("catch");
      console.error(err);
    }
  }
};
