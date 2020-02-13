const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const isEmpty = require("lodash.isempty");

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

api.get("/api/peliculas/:id?", ({ params: { id: _id } }, response) => {
  let query = {};

  if (!isEmpty(_id)) {
    query = { ...query, _id: ObjectId(_id) };
  }

  collection.find(query).toArray((err, result) => {
    if (err) throw err;
    response.json({ result });
  });
});

api.post("/api/peliculas", ({ body: pelicula }, response) => {
  collection.insertOne(pelicula, (err, result) => {
    if (err) throw err;

    response.json({
      success: true,
      message: "insertado correctamente."
    });
  });
});

api.delete("/api/peliculas/:id", ({ params: { id: _id } }, response) => {
  collection.findOneAndDelete({ _id: ObjectId(_id) }, (err, result) => {
    if (err) throw err;
    response.json(result);
  });
});

const port = 8080;

api.listen(port, () => console.log(`server started on ${port}`));