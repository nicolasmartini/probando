var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
var app = express();
var jwtClave = "Ac4m1c42020!";

app.use(bodyParser.json());

app.use(expressJWT({secret:jwtClave,algorithms: ['HS256']}).unless({path: ["/login"]}));

var usuario = {

    nombre : "nicolas",
    clave : "1234"

};

var noticias = [{

    id:1,
    titulo : "noticia de prueba"


}];

app.get("/noticias",function (req,res){

    res.send(noticias);

});

app.post("/login", function (req,res){

    if ((req.body.nombre == usuario.nombre) && (req.body.clave == usuario.clave)){

            var token = jwt.sign({
                usuario: usuario.nombre,
               
            },jwtClave,{
                
                expiresIn: 30 }
                
                );

            res.send(token);


    }else{

        res.status(401).send("Usuario / clave incorresctos");

    }

});

app.listen (3000, function () {


    console.log("Estoy escuchando en el puerto 3000");

} );

