const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const express = require("express");

const api = express();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());

const uri = "mongodb://localhost:27017";
const dbName = "test";
const collectionName = "mongoTest";

const config = { useUnifiedTopology: true };

const client = MongoClient(uri, config);

let collection;

client.connect(err => {
  if (err) throw err;

  const db = client.db(dbName);
  collection = db.collection(collectionName);
});

api.get("/api/peliculas/:id?", function(request, response) {
  const id = request.params.id;
  collection.find({ _id: ObjectId(id) }).toArray((err, result) => {
    if (err) throw err;
    response.json({ result });
  });
});

api.post("/api/peliculas", function(request, response) {
  let pelicula = request.body;

  collection.insertOne(pelicula, (err, result) => {
    if (err) throw err;

    response.json({
      success: true,
      message: "insertado correctamente."
    });
  });
});

// api.put("/api/peliculas/:id?", function(request, response) {
//   let elID = request.params.id;

//   if (!elID) {
//     response.json({ rta: "error", message: "ID no especificado" });
//   } else {
//     let datos = request.body;

//     peliculas.put(elID, datos, function(error, value) {
//       let rta = error
//         ? { rta: "error", error }
//         : { rta: "ok", message: "Pelicula actualizada", id: elID };

//       response.json(rta);
//     });
//   }
// });

// api.delete("/api/peliculas/:id", function(request, response) {
//   let elID = request.params.id;

//   peliculas.delete(elID, function(error) {
//     response.json({ rta: "error", error });
//   });

//   response.json({ rta: "ok", message: "Pelicula borrada", id: elID });
// });

const port = 8080;

api.listen(port, () => console.log(`server started on ${port}`));