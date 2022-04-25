const categorias = ["DESAYUNO Y MERIENDA ", "ALMUERZO Y CENA ", "POSTRES ", "BEBIDAS "];

console.log("Tenemos " + categorias.length + " Categorias en el menú\n" + categorias);

let contador = 0;
let contenedor2;
let contenedor3;
let contenedor4;

let fecha;
let nombreApellido;
let nroPersonas;

const listaOrdenes = [];
const listaReservas = [];

function mostrarEnLista(pedidos) {

    let ul = document.getElementById("ul");
    contenedor2 = document.createElement("div");
    contenedor2.innerHTML = `        
        <br>
        <div>
            <h4 class="carrito">CARRITO</h4>  
            <p class="letras">Comida y Bebida: ${pedidos.comida} con ${pedidos.bebida}</p>
            <p class="letras">Postre: ${pedidos.postre}</p>
            <div class="imagen">
                <img src=${comida.img} />
                <img src=${bebida.img} />
                <img src=${postre.img} />  
            </div>      
        </div> 
        <br>`

    ul.appendChild(contenedor2);
}

let listaProductosMenu = "Estos son nuestros productos";
/*
const objeto1= new Lista(1, "Pizza", 600, categorias[1], "./img/pizza.jpg");
const objeto2= new Lista(2, "Milanesa con pure", 550, categorias[1], "./img/milanesaConPure.jpg");
const objeto3= new Lista(3, "Milanesa con ensalada", 550, categorias[1], "./img/milanesaConEnsalada.jpg");
const objeto4= new Lista(4, "Milanesa con papas fritas", 550, categorias[1], "./img/milanesasConPapasFritas.jpg");
const objeto5= new Lista(5, "Asado con pure", 550, categorias[1], "./img/asadoConPure.jpg");
const objeto6= new Lista(6, "Asado con ensalada", 550, categorias[1], "./img/asadoConEnsalada.jpg");
const objeto7= new Lista(7, "Sopa de verduras", 550, categorias[1], "./img/sopa.jpg");
const objeto8= new Lista(8, "Pastafrola", 150, categorias[0], "./img/pastafrola.jpg");
const objeto9= new Lista(9, "Cafe con leche", 220, categorias[0], "./img/cafeConLeche.jpg");
const objeto10= new Lista(10, "Flan", 170, categorias[2], "./img/flan.jpg");
const objeto11= new Lista(11, "Helado", 240, categorias[2], "./img/helado.jpg");
const objeto12= new Lista(12, "Fernet con coca", 450, categorias[3], "./img/fernetConCoca.jpg");
const objeto13= new Lista(13, "Cerveza pinta", 220, categorias[3], "./img/cervezaPinta.jpg");
const objeto14= new Lista(14, "Cerveza botella", 340, categorias[3], "./img/cervezaBotella.jpg");
const objeto15= new Lista(15, "Coca cola", 170, categorias[3], "./img/cocaCola.jpg");
const objeto16= new Lista(16, "Sprite", 170, categorias[3], "./img/sprite.jpg");
const listaProductos = [objeto1,objeto2,objeto3,objeto4,objeto5,objeto6,objeto7,objeto8,objeto9,objeto10,objeto11,objeto12,objeto13,objeto14,objeto15,objeto16];
*/
let listaProductosB = []

fetch('data.json')
.then((resp) => resp.json())
.then((data) => data.forEach((producto) => 
                                listaProductosB.push(new Lista(producto.id, producto.nombre, producto.precio, producto.category, producto.img))))

console.log(listaProductosB)


let limpiarOrden = document.querySelector('.limpiar');
limpiarOrden.addEventListener('click', limpiar);

function limpiar(limpiarOrden){
    limpiarOrden = true;
        if(limpiarOrden){
        document.getElementById("ordenComida").value = "";
        document.getElementById("ordenBebida").value = "";
        document.getElementById("ordenPostre").value = "";
        contenedor2.innerHTML = "";
        contenedor3.innerHTML = "";
    }
}

function encontrarOrden() {

    comida = listaProductosB.find(producto => producto.nombre == ordenComida.toLowerCase());

    bebida = listaProductosB.find(producto => producto.nombre == ordenBebida.toLowerCase());

    postre = listaProductosB.find(producto => producto.nombre == ordenPostre.toLowerCase());

    console.log(comida, bebida, postre);

    if(comida == undefined){
        console.log("Disculpe, no tenemos ese menu");
    }
    else if(bebida == undefined){
        console.log("Disculpe, no tenemos esa bebida");
    }
    else if(postre == undefined){
        console.log("Disculpe, no tenemos ese postre");
    }
      
}

function mostrarTotal(total) {

    let mostrarTotal = document.getElementById("mostrarTotal");

    contenedor3 = document.createElement("div");

    comida.sumarIva();

    bebida.sumarIva();

    postre.sumarIva();

    let totalAbonar = (comida.precio + bebida.precio + postre.precio).toFixed(2);
    
    contenedor3.innerHTML =`<br>
                            <p class="letras">TOTAL:  ${totalAbonar} (IVA INCLUIDO)</p>           
                            <br>`;

    ul.appendChild(contenedor3);

}

function confirmarPedido(){
    Swal.fire({
        icon: 'success',
        title: 'Tu pedido ha sido agregado al carrito',
        showConfirmButton: false,
        timer: 1600
      })
}



let menuCatalogo = document.querySelector('.menuCatalogo');

let renderOrden = document.querySelector('.mostrarOrden');

renderOrden.addEventListener('click', mostrarOrden);

function mostrarOrden(){
    confirmar = true;
    confirmarPedido();
    if (confirmar) {
        
        ordenComida = document.getElementById("ordenComida").value;
        ordenBebida = document.getElementById("ordenBebida").value;
        ordenPostre = document.getElementById("ordenPostre").value;

        const pedidos = new Pedido(ordenComida, ordenBebida, ordenPostre);

        listaOrdenes.push(pedidos);
        localStorage.setItem("listaPedidos", JSON.stringify(listaOrdenes));

        
        encontrarOrden();

        mostrarEnLista(pedidos);

        mostrarTotal();
    }

    console.log(listaOrdenes);
}

let renderMenu = document.querySelector('.mostrarMenu');

renderMenu.addEventListener('click', mostrarMenu);

function mostrarMenu() {
    menuCatalogo.innerHTML = '';
    for (const producto of listaProductosB) {
        let contenedor = document.createElement("div");

        contenedor.innerHTML = `<div class="card">
                                <h3>${producto.id}) ${producto.nombre} $${producto.precio}</h3>
                                <img src=${producto.img} class="imagen"/>`;

        menuCatalogo.appendChild(contenedor);
    }
}

let borrarReserva = document.querySelector('.limpiarReserva');
borrarReserva.addEventListener('click', limpiarReserva);

function limpiarReserva(limpiarReserva){
    limpiarReserva = true;
        if(limpiarReserva){
        document.getElementById("fecha").value = "";
        document.getElementById("nombreApellido").value = "";
        document.getElementById("nroPersonas").value = "";
        reservasMesas.innerHTML = "";
        
    }
}


let reservasMesas = document.querySelector('.reservasMesas');


let renderReserva = document.querySelector('.reservar');

renderReserva.addEventListener('click', reservar);

function reservar() {
    reservasMesas.innerHTML = '';
    
        let contenedor4 = document.createElement("div");

        contenedor4.innerHTML = `<div class="reservasMesas">
                                
                                <h3 class="ingresos">Fecha de reserva</h3>
                                <input class="round-corners" id = "fecha" type="text" placeholder="dia/mes">

                                <h3 class="ingresos">Ingrese su Nombre y Apellido</h3>
                                <input class="round-corners" id = "nombreApellido" type="text">

                                <h3 class="ingresos">Reserva para cuantas personas</h3>
                                <input class="round-corners" id = "nroPersonas" type="text">
                    
                                </div>`;

        reservasMesas.appendChild(contenedor4);
        
    console.log(listaReservas)
}

let mostrarReserva = document.querySelector('.verReserva');

mostrarReserva.addEventListener('click', verReserva);

function verReserva(){
   

    fecha = document.getElementById("fecha").value;
    nombreApellido = document.getElementById("nombreApellido").value;
    nroPersonas = document.getElementById("nroPersonas").value;
    
    const reservasMesas = new Reservas (fecha, nombreApellido, nroPersonas);

    listaReservas.push(reservasMesas);
    localStorage.setItem("reservasMesas", JSON.stringify(listaReservas));

    
}

verReserva()  