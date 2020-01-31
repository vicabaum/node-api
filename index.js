/*

- API RESTFUL: PELICULAS

http://localhost/api/peliculas

- GET: (/ o /14) Obtener todas o una pelicula puntual
- POST: (/) Recibe y genera una nueva pelicula
- PUT: (/14) Recibe y actualiza una pelicula puntual
- DELETE: (/14) Recibe y borra una pelicula puntual

*/

const express = require("express")
const bodyParser = require("body-parser")

const api = express()

api.listen(8080)

//Endpoints
api.get("/api/peliculas", function(request, response){
	response.end("Aca voy a crear peliculas")
})

api.post("/api/peliculas", function(request, response){
	response.end("Aca voy a mostrar peliculas")
})

api.put("/api/peliculas", function(request, response){
	response.end("Aca voy a actualizar peliculas")
})

api.delete("/api/peliculas", function(request, response){
	response.end("Aca voy a borrar peliculas")
})

//TAREA DE FRONT: Armar un form que pida titulo, año de estreno, el poster, descripcion y un trailer
//carpeta public con la ocpcion static, etc 