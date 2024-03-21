const express = require('express');
const fs = require('fs');
const port = 3020;
const app = express();
const cors = require ('cors');
const path = require("path");


app.use(cors());
app.use(express.json());

app.get('/mostraNomsRamos', (req, res) => {
  const carpeta = "D:\\Instituto\\1 DAM\\LEA\\UF1ExAlexRamos"
  function llistar(directori) {
    const directorio = fs.readdirSync(directori)
    directorio.forEach((archivo) => {
      const ruta1 = directori + '/' + archivo;
      const ruta2 = path.resolve(ruta1)
      const estatus = fs.statSync(ruta2)
      if (estatus.isDirectory()) {
        console.log(ruta2)
        llistar(ruta2);
      } else {
        console.log(ruta2)
      }
    })
  }
  console.log(path.resolve(carpeta))
  llistar(carpeta)
});

app.get('/readFile5', (req, res) => {
  const filePath = 'UF1_ExamenAaD/UF1_ExamenAaD/Documents/FitxerOrigen.txt';
  const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  let data = '';

  readableStream.on('data', (chunk) => {
    data += chunk;
  });
  readableStream.on('end', () => {
    console.log('Contenido del archivo FitxerOrigen.txt:', data);
    res.send(data); // Enviar el contenido del archivo como respuesta
  });
});

app.post('/escribir-archivo5', (req, res) => {
  const { contenido, nombreArchivo } = req.body;

  fs.writeFile(nombreArchivo, contenido, (err) => {

    console.log('Contenido de FitxerOrigen.txt escrito en el archivo Ramos.txt correctamente.');
    res.send('Contenido de FitxerOrigen.txt escrito en el archivo Ramos.txt correctamente.');

  });
});

/*app.post('/writeBuffersRamos', (req, res) => {
  const { buffernom, bufferCognom1, bufferCognom2 } = req.body;
  const readableStream1 = fs.createReadStream(bufferNom, { encoding: 'utf8' });
  const readableStream2 = fs.createReadStream(bufferCognom1, { encoding: 'utf8' });
  const readableStream3 = fs.createReadStream(bufferCognom2, { encoding: 'utf8' });

  // Concatenar los streams en uno solo usando StreamConcat
  const concatenatedStream = new StreamConcat([readableStream1, readableStream2, readableStream3]); // Usar new

  // Escribir en el tercer archivo
  const writableStream = fs.createWriteStream('ex4AlexRamos.txt', { encoding: 'utf8' });

  concatenatedStream.pipe(writableStream);

  writableStream.on('finish', () => {
    console.log('Los archivos se han concatenado y se ha escrito en tercerArchivo.txt.');
    res.send('Los archivos se han concatenado y se ha escrito en tercerArchivo.txt.');
  });
});*/

app.post('/llegirImatgesRamos', (req, res) => {
  const directorioRaiz = path.resolve('UF1_ExamenAaD/UF1_ExamenAaD/Imatges');

  fs.readdir(directorioRaiz, (err, archivos) => {
    res.json({ archivos });
  });
  console.log('Imatge1:')
  const filePath = 'UF1_ExamenAaD/UF1_ExamenAaD/Imatges/Imatge1.jpg';
  const readableStream = fs.createReadStream(filePath, { highWaterMark:8192 });

  readableStream.on('data', (chunk)=> {
    console.log('Contenido del chunk: ', chunk)
  })
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
