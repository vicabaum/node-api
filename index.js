  
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
  database : '8af3b3a7-6af7-41bb-8be6-b4bc0bad2971',
  token : 'f00ac8e7-42ea-44f7-aa0f-97d4832ba5bf'
})

api.listen(80)

api.use( express.urlencoded({ extended : true }) )
api.use( express.json() )

//Endpoints
api.get("/api/peliculas/:id?", function(request, response){

	let elID = request.params.id

	if( !elID ){ //<-- Si NO especifico un ID

		peliculas.list(function(error, listado){
			
			let rta = error ? { rta : "error", error } : listado
			
			response.json( rta )

		})

	} else { //<-- Si EFECTIVAMENTE especifico un ID

		peliculas.get(elID, function(error, pelicula){
			
			let rta = error ? { rta : "error", error } : pelicula
			
			response.json( rta )
		})

	}

})

api.post("/api/peliculas", function(request, response){
	
	let pelicula = request.body

	let id = new Date().valueOf() //<-- ej: 1581027801281

	peliculas.put(id, pelicula, function(error){
		response.json({ rta : "error", message : error})
	})

	response.json({ rta : "ok", message : "Pelicula creada", id })
})

api.put("/api/peliculas/:id?", function(request, response){

	let elID = request.params.id

	if( !elID ){
		response.json({ rta : "error", message : "ID no especificado" })
	} else {

		let datos = request.body

		peliculas.put(elID, datos, function(error, value){

			let rta = error ? { rta : "error", error } : { rta : "ok", message : "Pelicula actualizada", id : elID}

			response.json( rta )

		})
	}	

})

api.delete("/api/peliculas/:id", function(request, response){
	let elID = request.params.id

	peliculas.delete(elID, function(error){
		response.json({ rta : "error", error })
	})

	response.json({ rta : "ok", message : "Pelicula borrada", id : elID })
})