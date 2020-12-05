// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: "#app",
  // App Name
  name: "My App",
  // App id
  id: "com.myapp.test",
  // Enable swipe panel
  panel: {
    swipe: "left",
  },
  // Add default routes
  routes: [
    {
      path: "/index/",
      url: "index.html",
    },
    {
      path: "/",
      url: "index.html",
    },
    {
      path: "/panel/",
      url: "panel.html",
    },
    {
      path: "/registracion1/",
      url: "registracion1.html",
    },
    {
      path: "/registracion2/",
      url: "registracion2.html",
    },
    {
      path: "/solicitud/",
      url: "solicitud.html",
    },
    {
      path: "/empleado/",
      url: "empleado.html",
    },
  ],
  // ... other parameters
});

var mainView = app.views.create(".view-main");

// Handle Cordova Device Ready Event
$$(document).on("deviceready", function () {
  console.log("Device is ready!");

  var db = firebase.firestore();
  var colusuarios = db.collection("usuarios");
  var n = "";

  // Add a new document in collection "cities"

  miID = "b15";
  (datos = { nombre: "ian", legajo: "113" }), colusuarios.doc(miID).set(datos);

  miID = "b16";
  datos = { nombre: "pepe", legajo: "114" };
  colusuarios.doc(miID).set(datos);

  miID = "b17";
  datos = { nombre: "pipo", legajo: "115" };
  colusuarios.doc(miID).set(datos);
  db.collection("usuarios")
    .doc(miID)
    .update({
      f1: "1222",
      f2: "1333",
      f3: "1444",
      f4: "1222",
      f5: "1333",
      f6: "1444",
      f7: "1222",
      f8: "1333",
      f9: "1444",
      f10: "1222",
    })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });

  /*  SETEO DE USUARIOS
miID = "15";
datos = 
{nombre :"ian",legajo : "113"}
colusuarios.doc(miID).set(datos);
miID = "16";
datos = 
{nombre :"pepe",legajo : "114"}
colusuarios.doc(miID).set(datos);
miID = "17";
datos = 
{nombre :"pipo",legajo : "115"}
colusuarios.doc(miID).set(datos);
*/

  //CREAR CONSULTA
  //var query = colusuarios.where("miID","==","CA")

  //MOSTRAR DATOS DE CONTACTOS EN EL INDEX ORDEN ALFABETICO

  //   EJEMPLO CON WHERE
  //colusuarios.where('legajo','==','113').limit(5).get()

  /*
  var db=firebase.firestore();
 var data={ 
      nombre:"ian",
      legajo:"1515"

 };
 db.collection("personas").add(data)
.then( function(docRef){  //puedo cumplir
console.log("OK, con el id" + docRef.id);
})
.catch(function(error) {
  console.error("Error:"+error)

}); //"puedo fallar"(doy error)
*/

  //LLAMO FUNCION LOGIN CUANDO TOCO BOTON LOGIN
  $$("#btnLogin").on("click", fnLogin);
  //LLAMO FUNCION logLegajo CUANDO TOCO BOTON ingresar
  $$("#btnLegajo").on("click", logLegajo);
  $$("#btnLegajo").on("click", mostrar);
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on("page:init", function (e) {
  // Do something here when page loaded and initialized
  console.log(e);
  $$("#btnLegajo").on("click", logLegajo);
  $$("#btnLegajo").on("click", mostrar);
});

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on("page:init", '.page[data-name="about"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log("about");
});
$$(document).on("page:init", '.page[data-name="panel"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log("panel");
});
$$(document).on("page:init", '.page[data-name="registracion1"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log("registracion1");
});
$$(document).on("page:init", '.page[data-name="registracion2"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log("registracion2");
});
$$(document).on("page:init", '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

  //LLAMO FUNCION LOGIN CUANDO TOCO BOTON LOGIN
  $$("#btnLogin").on("click", fnLogin);
  $$("#btnLegajo").on("click", logLegajo);
  $$("#btnLegajo").on("click", mostrar);
});

$$(document).on("page:init", '.page[data-name="empleado"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$("#btnLegajo").on("click", mostrar);

  //$$("#btnLegajo").on("click", logLegajo);
  var db= firebase.firestore(); /*
var docRef = db.collection("usuarios").doc("17");

docRef.get()

.then( function(querySnapshot) {
querySnapshot.forEach(function(doc) {
    console.log("data:" + doc.data().nombre);
    n = doc.data().f;
    $$('#imprimir').append('<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">21 <small>DEC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">'+n+'</div><div class="timeline-item-title">Title</div><div class="timeline-item-subtitle">Subtitle</div><div class="timeline-item-text">Text</div></div></div></div><div class="timeline-item"></div></div>');
  });

})
.cath( function(error) {
  console.error("Error:" + error);

  } );
*/
var docRef = db.collection("usuarios").doc("b17");

docRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
})
$$(document).on("page:init", '.page[data-name="solicitud"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log();
  var calendarDateTime = app.calendar.create({
    inputEl: "#demo-calendar-date-time",
    timePicker: true,
    dateFormat: {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    },
  });
  /*
  $$("#cal").on("click", function () {
    dh = $$("#demo-calendar-date-time").val();
    //dd//mm//aaaa hh:mm
    parte1 = dh.split(" ");
    fecha = parte1[0];
    hora = parte1[1];

    partesFecha = fecha.split("/");
    partesHora = hora.slit(":");
    anio = partesFecha[2];
    mes = partesFecha[1];
    dia = partesFecha[0];
    hora = partesHora[0];
    minutos = partesHora[1];
  });
*/
  /* MIS FUNCIONES*/

  function fnLogin() {
    //lishioon@gmail.com
    email = $$("#logEmail").val();
    password = $$("#logPass").val();

    console.log("email:" + email);
    console.log("password:" + password);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        mainView.router.navigate("/panel/");
      })

      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }
});

function logLegajo() {
  //lishioon@gmail.com

  console.log("legajo:" + logLegajo);

  mainView.router.navigate("/empleado/");
}

function mostrar() {
  console.log("mostrar");
  /*
  var db = firebase.firestore();
  var colusuarios = db.collection("usuarios");

  miID = "17";

  db.collection("usuarios")
    .doc(miID)
    .get()

    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log("data:" + doc.data().enero);
        var n = doc.data();

        $$("#imprimir").append(
          '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">21 <small>DEC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
            n +
            '</div><div class="timeline-item-title">Title</div><div class="timeline-item-subtitle">Subtitle</div><div class="timeline-item-text">Text</div></div></div></div><div class="timeline-item"></div></div>'
        );
      });
    })
    .cath(function (error) {
      console.error("Error:" + error);
    });
    */
}
