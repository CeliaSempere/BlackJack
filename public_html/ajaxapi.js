/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global usuario, pcarta, plantar, doblar, separar, cont */

function peticion(url) {
    // PETICION
    if (window.XMLHttpRequest) {
        peticion_http = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // navegadores obsoletos
        peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    peticion_http.onreadystatechange = muestraContenido;
    peticion_http.open('GET', url, false);
    peticion_http.send(null);


    // 4.-Respuesta del servidor
    function muestraContenido() {

        if (peticion_http.readyState == XMLHttpRequest.DONE && peticion_http.status == 200) {
            // se recoge el doc con notacion json
            var respuesta_json = peticion_http.responseText;
            objeto_json = eval("(" + respuesta_json + ")");
            archivo = objeto_json;
        }
    }
}

function visible() {
    pcarta.style.visibility = 'visible';
    plantar.style.visibility = 'visible';
    doblar.style.visibility = 'visible';
    separar.style.visibility = 'visible';
    apuesta.style.visibility = 'visible';

}

function invisible() {
    pcarta.style.display = 'none';
    plantar.style.display = 'none';
    doblar.style.display = 'none';
    separar.style.display = 'none';
    apuesta.style.display = 'none';


}

function ponercarta(urlfoto, left, top) {

    foto = document.createElement('img');
    foto.style.width = 100 + 'px';
    foto.style.height = 200 + 'px';
    foto.style.top = top + 'px';
    foto.style.left = left + 'px';
    foto.style.position = 'absolute';
    foto.src = urlfoto;
    acartas[k] = foto;
    cont.appendChild(foto);
    k++;

}

function comprobar21() {

    if (sumUsuario > 21) {
        terminaUS();
        return true;
    }
    if (sumUsuario2 > 21) {
        terminaUS();
        return true;
    }
    return false;

}
function crupier() {

    url = "https://deckofcardsapi.com/api/deck/" + id + "/draw/?count=2";
    peticion(url);
    if (archivo.cards[0].value == 'JACK' || archivo.cards[0].value == 'QUEEN' || archivo.cards[0].value == 'KING' || archivo.cards[0].value == 'ACE') {
        ponercarta(archivo.cards[0].images.png, ialeft, iatop);
        ordena.push(10);
        ialeft = ialeft + 130;
        sumIA += parseInt(10);


    } else {
        ponercarta(archivo.cards[0].images.png, ialeft, iatop);
        ordena.push(archivo.cards[0].value);
        ialeft = ialeft + 130;
        sumIA += parseInt(archivo.cards[0].value);


    }

    if (sumIA <= 16) {

        url = "https://deckofcardsapi.com/api/deck/" + id + "/draw/?count=2";
        peticion(url);
        if (archivo.cards[0].value == 'JACK' || archivo.cards[0].value == 'QUEEN' || archivo.cards[0].value == 'KING' || archivo.cards[0].value == 'ACE') {
            ponercarta(archivo.cards[0].images.png, ialeft, iatop);
            ordena.push(10);
            ialeft = ialeft + 130;
            sumIA += parseInt(10);

        } else {
            ponercarta(archivo.cards[0].images.png, ialeft, iatop);
            ordena.push(archivo.cards[0].value);
            ialeft = ialeft + 130;
            sumIA += parseInt(archivo.cards[0].value);


        }

        console.log("WNTRA");
        if (!usuariotermina && sumIA >= 17) {
            console.log("WNTRA2");

            if (sumIA <= 21) {
                if (sumIA > sumUsuario && sumIA > sumUsuario2) {
                    console.log('IA GANA');
                    terminaUS();

                } else {
                    console.log('USUARIO GANA');
                    terminaIA();

                }
            } else {
                console.log('USUARIO GANA');
                terminaIA();
            }
        }

    } else {
        console.log("WNTRA4");

        if (sumIA <= 21) {
            console.log("WNTRA3");

            if (sumIA > sumUsuario && sumIA > sumUsuario2) {
                console.log('IA GANA');
                terminaUS();

            } else {
                console.log('USUARIO GANA');
                terminaIA();

            }
        } else {
            console.log('USUARIO GANA');
            terminaIA();
        }



    }


}

function verbotones(e) {

    visible();
    if (e.target.id === 'pcarta') {
        url = "https://deckofcardsapi.com/api/deck/" + id + "/draw/?count=1";
        peticion(url);
        if (dobles == 1) {
            usuarioleft = usuarioleft + 490;
        }
        if (archivo.cards[0].value == 'JACK' || archivo.cards[0].value == 'QUEEN' || archivo.cards[0].value == 'KING' || archivo.cards[0].value == 'ACE') {
            if (dobles == 1) {
                sumUsuario2 += parseInt(10);
                crupier();

            } else {
                sumUsuario += parseInt(10);

            }
            usuario.push(10);
            ponercarta(archivo.cards[0].images.png, usuarioleft, usuariotop);
            if (comprobar21()) {
                usuariotermina = true;
                invisible();

            } else if (dobles < 0) {
                usuarioleft = usuarioleft + 130;

            }


        } else {
            if (dobles == 1) {
                sumUsuario2 += parseInt(archivo.cards[0].value);

            } else {
                sumUsuario += parseInt(archivo.cards[0].value);

            }
            usuario.push(archivo.cards[0].value);
            ponercarta(archivo.cards[0].images.png, usuarioleft, usuariotop);

            if (comprobar21()) {
                usuariotermina = true;
                invisible();
                crupier();

            } else if (dobles < 0) {
                usuarioleft = usuarioleft + 130;

            }


        }
        if (dobles == 0) {
            dobles = 1;

        } else if (dobles == 1) {
            crupier();
        }


        doblar.style.display = 'none';
        separar.style.display = 'none';

    } else if (e.target.id === 'plantar') {
        invisible();
        crupier();


    } else if (e.target.id === 'doblar') {
        var num = contadorDinero - (100 - contadorDinero);
        doblar.style.display = 'none';
        if (num >= (100 - contadorDinero)) {
            contadorDinero = num;

            var num2 = (100 - contadorDinero);
            apuesta.innerHTML = num2 + " $";
            if (num >= 0) {
                url = "https://deckofcardsapi.com/api/deck/" + id + "/draw/?count=1";
                peticion(url);

                if (archivo.cards[0].value == 'JACK' || archivo.cards[0].value == 'QUEEN' || archivo.cards[0].value == 'KING' || archivo.cards[0].value == 'ACE') {


                    usuario.push(10);

                    ponercarta(archivo.cards[0].images.png, usuarioleft, usuariotop);
                    sumUsuario += parseInt(10);
                    if (comprobar21()) {
                        usuariotermina = true;
                        invisible();
                        crupier();
                    }


                } else {
                    usuario.push(archivo.cards[0].value);
                    ponercarta(archivo.cards[0].images.png, usuarioleft, usuariotop);
                    sumUsuario += parseInt(archivo.cards[0].value);

                    if (comprobar21()) {
                        usuariotermina = true;
                        invisible();
                        crupier();
                    }

                }
                dinero.innerHTML = contadorDinero;

                usuarioleft = usuarioleft + 130;
                separar.style.display = 'none';



            }
        }
    } else if (e.target.id === 'separar') {

        if (doblecarta) {
            var num = contadorDinero - (100 - contadorDinero);
            var num2 = (100 - contadorDinero);

            apuesta.innerHTML = num2 + " $";
            acartas[1].style.left = usuarioleft + 230 + "px";
            usuarioleft = (usuarioleft - 130);
            separar.style.display = 'none';
            contadorDinero = num;
            dinero.innerHTML = contadorDinero;
            dobles = 0;
            sumUsuario = sumUsuario / 2;
            doblar.style.display = 'none';
            separar.style.display = 'none';
        }
    }
}
;


function empezar() {

    var num2 = (100 - contadorDinero);

    apuesta.innerHTML = num2 + " $";

    //USUARIO

    if (archivo.cards[0].value == 'JACK' || archivo.cards[0].value == 'QUEEN' || archivo.cards[0].value == 'KING' || archivo.cards[0].value == 'ACE') {
        usuario.push(archivo.cards[0].images.png);
        ponercarta(archivo.cards[0].images.png, usuarioleft, usuariotop);
        usuarioleft = usuarioleft + 130;
        sumUsuario += parseInt(10);
        sumUsuario2 = parseInt(10);
        primero = archivo.cards[0].value;

    } else {
        usuario.push(archivo.cards[0].images.png);
        ponercarta(archivo.cards[0].images.png, usuarioleft, usuariotop);
        usuarioleft = usuarioleft + 130;
        sumUsuario += parseInt(archivo.cards[0].value);
        sumUsuario2 = parseInt(archivo.cards[0].value);
        primero = archivo.cards[0].value;



    }


    if (archivo.cards[1].value == 'JACK' || archivo.cards[1].value == 'QUEEN' || archivo.cards[1].value == 'KING' || archivo.cards[1].value == 'ACE') {
        usuario.push(archivo.cards[1].images.png);
        ponercarta(archivo.cards[1].images.png, usuarioleft, usuariotop);
        usuarioleft = usuarioleft + 130;
        sumUsuario += parseInt(10);
        sumUsuario2 = parseInt(10);
        segundo = archivo.cards[1].value;

    } else {
        usuario.push(archivo.cards[1].images.png);
        ponercarta(archivo.cards[1].images.png, usuarioleft, usuariotop);
        usuarioleft = usuarioleft + 130;
        sumUsuario += parseInt(archivo.cards[1].value);
        sumUsuario2 = parseInt(archivo.cards[1].value);
        segundo = archivo.cards[1].value;



    }
    if (primero == segundo) {
        doblecarta = true;

    }

    url = "https://deckofcardsapi.com/api/deck/" + id + "/draw/?count=1";
    peticion(url);
    usuarioleft + 260;
//IA
    if (archivo.cards[0].value == 'JACK' || archivo.cards[0].value == 'QUEEN' || archivo.cards[0].value == 'KING' || archivo.cards[0].value == 'ACE') {
        ponercarta(archivo.cards[0].images.png, ialeft, iatop);
        ordena.push(archivo.cards[0].images.png);
        ialeft = ialeft + 130;
        sumIA += parseInt(10);
    } else {
        ponercarta(archivo.cards[0].images.png, ialeft, iatop);
        ordena.push(archivo.cards[0].value);
        ialeft = ialeft + 130;
        sumIA += parseInt(archivo.cards[0].value);

    }
    document.addEventListener('click', verbotones);

}

function crearfichas() {
    var t = (window.innerHeight / 2.3);
    var l = (window.innerWidth / 9);
    for (var i = 0; i < aFichas.length; i++) {
        fich = document.createElement('img');
        fich.style.width = 100 + 'px';
        fich.style.height = 100 + 'px';
        fich.style.top = t + 'px';
        fich.style.left = l + 'px';
        fich.style.position = 'absolute';
        fich.id = i;
        fich.src = aFichas[i];
        aFichasDiv[i] = fich;
        document.body.appendChild(fich);
        l = l + 150;
    }


}
;


function seleccionarfichas(e) {
    if (e.target.id == '0') {//1

        if (contadorDinero >= 1) {
            contadorDinero = contadorDinero - 1;
            ficha = document.createElement('img');
            ficha.style.width = 75 + 'px';
            ficha.style.height = 75 + 'px';
            ficha.style.top = fichastop + 'px';
            ficha.style.position = 'absolute';
            ficha.src = "1.png";
            document.body.appendChild(ficha);
            fichastop = fichastop + 100;
        }

    } else if (e.target.id == '1') {//5
        if (contadorDinero >= 5) {
            contadorDinero = contadorDinero - 5;
            ficha = document.createElement('img');
            ficha.style.width = 75 + 'px';
            ficha.style.height = 75 + 'px';
            ficha.style.top = fichastop + 'px';
            ficha.style.position = 'absolute';
            ficha.src = "2.png";
            document.body.appendChild(ficha);
            fichastop = fichastop + 100;

        }
    } else if (e.target.id == '2') {//10
        if (contadorDinero >= 10) {
            contadorDinero = contadorDinero - 10;
            ficha = document.createElement('img');
            ficha.style.width = 75 + 'px';
            ficha.style.height = 75 + 'px';
            ficha.style.top = fichastop + 'px';
            ficha.style.position = 'absolute';
            ficha.src = "10.png";
            document.body.appendChild(ficha);
            fichastop = fichastop + 100;

        }
    } else if (e.target.id == '3') {//20
        if (contadorDinero >= 20) {
            contadorDinero = contadorDinero - 20;
            ficha = document.createElement('img');
            ficha.style.width = 75 + 'px';
            ficha.style.height = 75 + 'px';
            ficha.style.top = fichastop + 'px';
            ficha.style.position = 'absolute';
            ficha.src = "20.png";
            document.body.appendChild(ficha);
            fichastop = fichastop + 100;

        }
    } else if (e.target.id == '4') {//50
        if (contadorDinero >= 50) {
            contadorDinero = contadorDinero - 50;
            ficha = document.createElement('img');
            ficha.style.width = 75 + 'px';
            ficha.style.height = 75 + 'px';
            ficha.style.top = fichastop + 'px';
            ficha.style.position = 'absolute';
            ficha.src = "50.png";
            document.body.appendChild(ficha);
            fichastop = fichastop + 100;

        }
    } else if (e.target.id == '5') {//100
        if (contadorDinero >= 100) {
            contadorDinero = contadorDinero - 100;
            ficha = document.createElement('img');
            ficha.style.width = 75 + 'px';
            ficha.style.height = 75 + 'px';
            ficha.style.top = fichastop + 'px';
            ficha.style.position = 'absolute';
            ficha.src = "100.png";
            document.body.appendChild(ficha);
            fichastop = fichastop + 100;


        }
    } else if (e.target.id == 'empezar') {
        if (contadorDinero < 100) {
            for (var i = 0; i < aFichasDiv.length; i++) {
                aFichasDiv[i].style.display = 'none';

            }
            btempezar.style.display = 'none';
            url = "https://deckofcardsapi.com/api/deck/" + id + "/draw/?count=2";
            peticion(url);
            empezar();
        }
    }
    dinero.innerHTML = contadorDinero;




}
;

function juego() {

    id = archivo.deck_id;
    ordena = new Array();
    usuario = new Array();
    dinero.innerHTML = contadorDinero;
    crearfichas();

}
;

function terminaUS() {
    cLost.style.visibility = 'visible';
    invisible();


}
;
function terminaIA() {
    cWin.style.visibility = 'visible';
    var num = (100 - contadorDinero);
    dinero.innerHTML = contadorDinero + num;
    invisible();


}
;

window.onload = function () {


    //Variables

    usuarioleft = 230;
    usuariotop = 420;
    ialeft = 230;
    iatop = 120;
    sumIA = 0;
    sumUsuario = 0;
    sumUsuario2 = 0;
    doblecarta = false;
    dobles = -1;
    usuariotermina = false;
    fichas = false;
    contadorDinero = 100;
    acartas = new Array();
    k = 0;
    primero = 0;
    segundo = 0;
    fichastop = 10;




    //CONTENEDOR

    cont = document.getElementById('contenedor');
    cont.style.width = window.innerWidth + 'px';
    cont.style.height = window.innerHeight + 'px';

    //DINERO
    dinero = document.getElementById('dinero');
    dinero.style.left = (window.innerWidth / 2) - 100 + 'px';

    //EMPEZAR
    btempezar = document.getElementById('empezar');
    btempezar.style.backgroundImage = "url('Empezar.jpg')";
    btempezar.style.left = (window.innerWidth / 2) - 175 + 'px';
    btempezar.style.top = (window.innerHeight) - 75 + 'px';





    //FONDO
        img = document.getElementById('img');

/*
    //img.style.backgroundImage = "url('https://i.pinimg.com/originals/a5/a2/a7/a5a2a713c08809de17fd6b0d489d3e1e.jpg')";
    img.style.backgroundImage = "url('https://images-na.ssl-images-amazon.com/images/I/91POcDrLZdL._SL1500_.jpg')";
    img.style.width = window.innerWidth + 'px';
    img.style.height = window.innerHeight + 'px';
*/
    img.style.opacity = 0.8;

    //BOTONES

    pcarta = document.getElementById('pcarta');
    pcarta.style.left = 230 + 'px';
    pcarta.style.top = 355 + 'px';

    plantar = document.getElementById('plantar');
    plantar.style.left = 230 + 200 + 'px';
    plantar.style.top = 355 + 'px';

    doblar = document.getElementById('doblar');
    doblar.style.left = 230 + 600 + 'px';
    doblar.style.top = 355 + 'px';

    separar = document.getElementById('separar');
    separar.style.left = 230 + 800 + 'px';
    separar.style.top = 355 + 'px';

    //APUESTA

    apuesta = document.getElementById('apuesta');
    apuesta.style.left = 230 + 400 + 'px';
    apuesta.style.top = 347 + 'px';




    //CARTELES


    cLost = document.getElementById('lost');
    cLost.style.backgroundImage = "url('LOST.png')";
    cLost.style.left = (window.innerWidth / 2) - 200 + 'px';
    cLost.style.top = 230 + 'px';

    cWin = document.getElementById('win');
    cWin.style.backgroundImage = "url('WIN.png')";
    cWin.style.left = (window.innerWidth / 2) - 200 + 'px';
    cWin.style.top = 230 + 'px';


    //separar.style.left = (window.innerWidth / 9) + 600 + 'px';
    //separar.style.top = 355 + 'px';

    //FICHAS

    aFichas = ['1.png', '2.png', '10.png', '20.png', '50.png', '100.png'];
    aFichasDiv = new Array();

    //EMPEZAR

    url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

    peticion(url);
    document.addEventListener('click', seleccionarfichas);

    juego();


}
;