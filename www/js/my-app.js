// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var uids = [];

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
    {
      path: "/editar/",
      url: "editar.html",
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

  // SETEO DE PRIMEROS USUARIOS
/*
  miID = "b15";
  (datos = { nombre: "Ian", apellido: "Aguilar", legajo: miID }),
    colusuarios.doc(miID).set(datos);

  miID = "b16";
  datos = { nombre: "Pepe", apellido: "Argento", legajo: miID };
  colusuarios.doc(miID).set(datos);

  miID = "b17";
  datos = { nombre: "Pipo", apellido: "Naranjo", legajo: miID };
    */
  // seteo de datos principal
  /*
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
  */
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
  //$$("#btnLegajo").on("click", mostrar);
  $$("#editar").on("click", editar);

  $$("#buscar").on("click", function browsecall() {
    console.log("func browsecall");
    miID = $$("#buscar1").val();
    editar();
  });
  $$("#guardar1").on("click", guardar);
  $$("#nuevo1").on("click", nuevo);
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on("page:init", function (e) {
  // Do something here when page loaded and initialized
  console.log(e);
  $$("#btnLegajo").on("click", logLegajo);
  // $$("#btnLegajo").on("click", mostrar);
  $$("#btnPanel").on("click", adminPanel);
  $$("#editar").on("click", editar);
  $$("#buscar").on("click", function browsecall() {
    console.log("func browsecall");
    miID = $$("#buscar1").val();
    editar();
  });
  $$("#guardar1").on("click", guardar);
  $$("#guardar2").on("click", guardarnuevo);

$$("#nuevo1").on("click", nuevo);
});


// Option 2. Using live 'page:init' event handlers for each page
$$(document).on("page:init", '.page[data-name="about"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log("about");
});
$$(document).on("page:init", '.page[data-name="panel"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log("init panel");
  $$("#guardar1").on("click", guardar);


  //Lo que hace andar el buscador
  var searchbar = app.searchbar.create({
    el: ".searchbar",
    searchContainer: ".list",
    searchIn: ".item-title",
    on: {
      search(sb, query, previousQuery) {
        console.log(query, previousQuery);
      },
    },
  });
  i = 1;
  var db = firebase.firestore();

  db.collection("usuarios")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const task = doc.data();
        task.id = doc.id;
        console.log(task);

        n = doc.data().nombre;
        const n_id = doc.legajo;

        n1 = doc.data().apellido;
        n2 = doc.data().legajo;
        let nuevaLongitud = uids.push(n2); // Añade "n legajo" al final
        let n3 = uids[i];

        $$("#busquedatos").append(
          '<ul><li class="item-content" value="' +
            n2 +
            '"><div class="item-inner"><div class="item-title">' +
            n +
            " " +
            n1 +
            "  legajo:" +
            n2 +
            '</div></div></li></ul>'
        );

        const btnborrar = document.querySelectorAll(".btn-borrar");
        btnborrar.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            console.log(e.target);
          });
        });

        i++;
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  /* var db = firebase.firestore(); 
    var docRef = db.collection("usuarios").doc('b17');
  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("datitos", JSON.stringify(doc.data()));
        n1 = doc.data().nombre;
        

        
          n = doc.data().nombre;
          $$("#busquedatos").append('<div class="list searchbar-found"><ul><li class="item-content"><div class="item-inner"><div class="item-title">Acura</div></div></li><li class="item-content"><div class="item-inner"><div class="item-title">Audi</div></div></li><li class="item-content"><div class="item-inner"><div class="item-title">'+ n +'</div></div></li><li class="item-content"><div class="item-inner"><div class="item-title">Volvo</div></div></li></ul></div>');
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
*/
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
  //$$("#btnLegajo").on("click", mostrar);
  $$("#btnPanel").on("click", adminPanel);
  $$("#guardar1").on("click", guardar);
  $$("#nuevo1").on("click", nuevo);
  $$("#guardar2").on("click", guardarnuevo);
});

$$(document).on("page:init", '.page[data-name="empleado"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

  //$$("#btnLegajo").on("click", logLegajo);
  var db = firebase.firestore(); /*
var docRef = db.collection("usuarios").doc("17");

docRef.get()

.then( function(querySnapshot) {
querySnapshot.forEach(function(doc) {
    console.log("data:" + doc.data().nombre);
    n = doc.data();
    $$('#imprimir').append('<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">21 <small>DEC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">'+n+'</div><div class="timeline-item-title">Title</div><div class="timeline-item-subtitle">Subtitle</div><div class="timeline-item-text">Text</div></div></div></div><div class="timeline-item"></div></div>');
  });

})
.cath( function(error) {
  console.error("Error:" + error);

  } );
*/

  //ESTE SI FUNCIONA

  var docRef = db.collection("usuarios").doc(miID);
  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("datitos", JSON.stringify(doc.data()));
        n1 = doc.data().nombre;
        na = doc.data().apellido;
        $$("#nombreusuario").text("" + n1);
        $$("#apellidousuario").text("" + na);

        
          // console.log("variable",+f(i)+)
          
          n1 = doc.data().f1;
        n2 = doc.data().f2;
        n3 = doc.data().f3;
        n4 = doc.data().f4;
        n5 = doc.data().f5;
        n6 = doc.data().f6;
        n7 = doc.data().f7;
        n8 = doc.data().f8;
        n9 = doc.data().f9;
        n10 = doc.data().f10;
          $$("#imprimir").append(
            '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">1 <small>DIC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
              n1 +
              '</div><div class="timeline-item-title"></div><div class="timeline-item-subtitle"></div><div class="timeline-item-text"></div></div></div></div><div class="timeline-item"></div></div>'
          );
          $$("#imprimir").append(
            '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">2 <small>DIC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
              n2 +
              '</div><div class="timeline-item-title"></div><div class="timeline-item-subtitle"></div><div class="timeline-item-text"></div></div></div></div><div class="timeline-item"></div></div>'
          );
          $$("#imprimir").append(
            '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">3 <small>DIC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
              n3 +
              '</div><div class="timeline-item-title"></div><div class="timeline-item-subtitle"></div><div class="timeline-item-text"></div></div></div></div><div class="timeline-item"></div></div>'
          );
          $$("#imprimir").append(
            '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">4 <small>DIC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
              n4 +
              '</div><div class="timeline-item-title"></div><div class="timeline-item-subtitle"></div><div class="timeline-item-text"></div></div></div></div><div class="timeline-item"></div></div>'
          );
          $$("#imprimir").append(
            '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">5 <small>DIC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
              n5 +
              '</div><div class="timeline-item-title"></div><div class="timeline-item-subtitle"></div><div class="timeline-item-text"></div></div></div></div><div class="timeline-item"></div></div>'
          );
          $$("#imprimir").append(
            '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">6 <small>DIC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
              n6 +
              '</div><div class="timeline-item-title"></div><div class="timeline-item-subtitle"></div><div class="timeline-item-text"></div></div></div></div><div class="timeline-item"></div></div>'
          );
          $$("#imprimir").append(
            '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">7 <small>DIC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
              n7 +
              '</div><div class="timeline-item-title"></div><div class="timeline-item-subtitle"></div><div class="timeline-item-text"></div></div></div></div><div class="timeline-item"></div></div>'
          );
          $$("#imprimir").append(
            '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">8 <small>DIC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
              n8 +
              '</div><div class="timeline-item-title"></div><div class="timeline-item-subtitle"></div><div class="timeline-item-text"></div></div></div></div><div class="timeline-item"></div></div>'
          );
          $$("#imprimir").append(
            '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">9 <small>DIC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
              n9 +
              '</div><div class="timeline-item-title"></div><div class="timeline-item-subtitle"></div><div class="timeline-item-text"></div></div></div></div><div class="timeline-item"></div></div>'
          );
          $$("#imprimir").append(
            '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">10 <small>DIC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
              n10 +
              '</div><div class="timeline-item-title"></div><div class="timeline-item-subtitle"></div><div class="timeline-item-text"></div></div></div></div><div class="timeline-item"></div></div>'
          );

        


      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
  /*    //pruebita
var docRef = db.collection('usuarios').doc('5mmwJba8FVMrdHGOPBYraOQzDe22')
  .collection('restaurants').doc('qZg6gkOvYHOPXHDJAqBF').get();

  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("datitos", JSON.stringify(doc.data()));
        n = doc.data();
        $$("#imprimir").append(
          '<div class="timeline"><div class="timeline-item"><div class="timeline-item-date">21 <small>DEC</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time">' +
            n +
            '</div><div class="timeline-item-title">Title</div><div class="timeline-item-subtitle">Subtitle</div><div class="timeline-item-text">Text</div></div></div></div><div class="timeline-item"></div></div>'
        );
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });

      */
});

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



  $$(document).on("page:init", '.page[data-name="editar"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log("editar");
    $$("#guardar1").on("click", guardar);
    $$("#nuevo").on("click", nuevo);
    $$("#guardar2").on("click", guardarnuevo);
  });
  
  $$("#solicitar").on("click", function () {
    dh = $$("#demo-calendar-date-time").val();
    //dd//mm//aaaa hh:mm
    parte1 = dh.split(" ");
    fecha = parte1[0];
    hora = parte1[1];

    partesFecha = fecha.split("/");
    partesHora = hora.split(":");
    anio = partesFecha[2];
    mes = partesFecha[1];
    dia = partesFecha[0];
    hora = partesHora[0];
    minutos = partesHora[1];

    //TOMO DATOS DE SOLICITUD
    var db = firebase.firestore();
  var colusuarios = db.collection("usuarios");
colusuarios.doc(miID).update({
      fechasoli: dh,
      motivosoli:document.getElementById("motivo").value, 

    })
    .then(function () {
      console.log("Document successfully written!");
      alert("Enviado con Éxito");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      alert("Legajo no encontrado");
    });



  });

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
  miID = "0";
  miID = $$("#logLegajo1").val();

  if (miID != 0) {
    mainView.router.navigate("/empleado/");
  } else {
    alert("Ingrese Legajo");
  }
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

function adminPanel() {
  console.log("admin ");
  mainView.router.navigate("/panel/");
  // var app = new Framework7();

  // create searchbar
}

function hola() {
  console.log(this.value);
}
function editar() {
  console.log("editar");
  mainView.router.navigate("/editar/");

  var db = firebase.firestore();
  var docRef = db.collection("usuarios").doc(miID);
  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("datitos", JSON.stringify(doc.data()));
        n = doc.data().nombre;
        $$("#nombreusuario").text("" + n1);

        // console.log("variable",+f(i)+)
        na = doc.data().apellido;
        nj = doc.data().legajo;
        n1 = doc.data().f1;
        n2 = doc.data().f2;
        n3 = doc.data().f3;
        n4 = doc.data().f4;
        n5 = doc.data().f5;
        n6 = doc.data().f6;
        n7 = doc.data().f7;
        n8 = doc.data().f8;
        n9 = doc.data().f9;
        n10 = doc.data().f10;


        $$("#nombre1").text((document.getElementById("nombre1").value = n));
        $$("#apellido1").text(
          (document.getElementById("apellido1").value = na)
        );
        $$("#legajo1").text((document.getElementById("legajo1").value = nj));
        $$("#f1").text((document.getElementById("f1").value = n1));
        $$("#f2").text((document.getElementById("f2").value = n2));
        $$("#f3").text((document.getElementById("f3").value = n3));
        $$("#f4").text((document.getElementById("f4").value = n4));
        $$("#f5").text((document.getElementById("f5").value = n5));
        $$("#f6").text((document.getElementById("f6").value = n6));
        $$("#f7").text((document.getElementById("f7").value = n7));
        $$("#f8").text((document.getElementById("f8").value = n8));
        $$("#f9").text((document.getElementById("f9").value = n9));
        $$("#f10").text((document.getElementById("f10").value = n10));

        //  document.write('<input type="text" value="'+n+'" id="ed1" name="ed1">');
        // document.write('<input type="text" value="'+doc.data().apellido+'" id="ed2" name="ed2">');
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

function guardar() {
  console.log("guardar");
  miID= document.getElementById("legajo1").value;
  var db = firebase.firestore();
  db.collection("usuarios")
    .doc(miID)
    .update({
      nombre: document.getElementById("nombre1").value,
      apellido: document.getElementById("apellido1").value,
      legajo: document.getElementById("legajo1").value,
      f1: document.getElementById("f1").value,
      f2: document.getElementById("f2").value,
      f3: document.getElementById("f3").value,
      f4: document.getElementById("f4").value,
      f5: document.getElementById("f5").value,
      f6: document.getElementById("f6").value,
      f7: document.getElementById("f7").value,
      f8: document.getElementById("f8").value,
      f9: document.getElementById("f9").value,
      f10: document.getElementById("f10").value,
      fechasoli: "",
      motivosoli:"",
    

    })
    .then(function () {
      console.log("Document successfully written!");

      alert("Guardado con Éxito");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

function nuevo() {
  console.log("fn nuevo");
      miID= 0;
      


       $$("#nombre1").text((document.getElementById("nombre1").value = ""));
       $$("#apellido1").text((document.getElementById("apellido1").value = ""));
       $$("#legajo1").text((document.getElementById("legajo1").value = ""));
        $$("#f1").text((document.getElementById("f1").value = ""));
        $$("#f2").text((document.getElementById("f2").value = ""));
        $$("#f3").text((document.getElementById("f3").value = ""));
        $$("#f4").text((document.getElementById("f4").value = ""));
        $$("#f5").text((document.getElementById("f5").value = ""));
        $$("#f6").text((document.getElementById("f6").value = ""));
        $$("#f7").text((document.getElementById("f7").value = ""));
        $$("#f8").text((document.getElementById("f8").value = ""));
        $$("#f9").text((document.getElementById("f9").value = ""));
        $$("#f10").text((document.getElementById("f10").value = ""));
}


function guardarnuevo() {
  console.log("guardar nuevo");
  miID= document.getElementById("legajo1").value;
  var db = firebase.firestore();
  db.collection("usuarios")
    .doc(miID)
    .set({
      nombre: document.getElementById("nombre1").value,
      apellido: document.getElementById("apellido1").value,
      legajo: document.getElementById("legajo1").value,
      f1: document.getElementById("f1").value,
      f2: document.getElementById("f2").value,
      f3: document.getElementById("f3").value,
      f4: document.getElementById("f4").value,
      f5: document.getElementById("f5").value,
      f6: document.getElementById("f6").value,
      f7: document.getElementById("f7").value,
      f8: document.getElementById("f8").value,
      f9: document.getElementById("f9").value,
      f10: document.getElementById("f10").value,
      fechasoli: "",
      motivosoli:"",
    

    })
    .then(function () {
      console.log("Document successfully written!");

      alert("Guardado con Éxito");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}
