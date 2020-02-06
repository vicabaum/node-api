/*
- API RESTFUL: PELICULAS
http://localhost/api/peliculas
- GET: (/ o /14) Obtener todas o una pelicula puntual
- POST: (/) Recibe y genera una nueva pelicula
- PUT: (/14) Recibe y actualiza una pelicula puntual
- DELETE: (/14) Recibe y borra una pelicula puntual
*/
const express = require("express")
const easyDB = require("easydb-io")

const api = express()

// Almacenamiento de Datos...
//let peliculas = JSON.parse('[{"titulo":"El Padrino","estreno":"1972","descripcion":"Una adaptación ganadora del Premio de la Academia, de la novela de Mario Puzo acerca de la familia Corleone.","poster":"https://estaticos.muyinteresante.es/media/cache/760x570_thumb/uploads/images/article/58c7ce615cafe870917e529c/elpadrino_0.jpg","trailer":"https://www.youtube.com/watch?v=gCVj1LeYnsc","id":1580860813309},{"titulo":"El Padrino 2","estreno":"1980","descripcion":"Una adaptación ganadora del Premio de la Academia, de la novela de Mario Puzo acerca de la familia Corleone.","poster":"https://estaticos.muyinteresante.es/media/cache/760x570_thumb/uploads/images/article/58c7ce615cafe870917e529c/elpadrino_0.jpg","trailer":"https://www.youtube.com/watch?v=gCVj1LeYnsc","id":1580860850738},{"titulo":"El Padrino 3","estreno":"1983","descripcion":"Una adaptación ganadora del Premio de la Academia, de la novela de Mario Puzo acerca de la familia Corleone.","poster":"https://estaticos.muyinteresante.es/media/cache/760x570_thumb/uploads/images/article/58c7ce615cafe870917e529c/elpadrino_0.jpg","trailer":"https://www.youtube.com/watch?v=gCVj1LeYnsc","id":1580860867313}]')
const peliculas = easyDB({
  database : '25545e4e-5f17-40d7-a948-4ce7c738a817',
  token : '75c53d80-a35a-488b-9443-9932e653d8e9'
})

api.listen(8080)

///se incorporo en el core de node para capturar los datos que viene en el parametro request cuando se ejecuta http- con este cacihto, las peticiones http, mas especificamente el parametro request.body, nos devuelve un objeto vacio {}


api.use( express.urlencoded({ extended : true }) )
api.use( express.json() )

//Endpoints
api.get("/api/peliculas", function(request, response){

	let listado = peliculas.get("pelicula", function(error, pelicula){
		
		let rta = error ? { rta : "error", message : error } : pelicula
		
		response.json( rta )
	})

})

api.post("/api/peliculas", function(request, response){
	
	let pelicula = request.body

	pelicula.id = new Date().valueOf()  //el id unico en formato "marca de tiempo" > unico, irrepetible y autoincremental

	peliculas.put("pelicula", pelicula, function(error){
		response.json({ rta : "error", message : error})
	})

	response.json({ rta : "ok", message : "Pelicula creada" })
})

api.put("/api/peliculas/:id", function(request, response){

	let elID = request.params.id

	let datos = request.body

	let laPelicula = peliculas.find(function(pelicula){  //metodos iterativos de js: ejecutarse tantas veces como tantos metodos haya

		return pelicula.id == elID

	})

	laPelicula.titulo = datos.titulo || laPelicula.titulo
	laPelicula.estreno = datos.estreno || laPelicula.estreno
	laPelicula.descripcion = datos.descripcion || laPelicula.descripcion
	laPelicula.poster = datos.poster || laPelicula.poster
	laPelicula.trailer = datos.trailer || laPelicula.trailer

	response.json({ rta : "ok", pelicula : laPelicula })
})

//metodo .find (busqueda por la respectiva propiedad y en busqueda de ese valor)y metodo.findIndex () ambas se manejan bajo la arquitectura de callback

api.delete("/api/peliculas/:id", function(request, response){
	response.end("Aca voy a borrar la pelicula: " + request.params.id)
})

// import easyDB from 'easydb-io'

