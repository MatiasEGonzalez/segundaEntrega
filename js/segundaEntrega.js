const categorias = ["DESAYUNO Y MERIENDA ", "ALMUERZO Y CENA ", "POSTRES ", "BEBIDAS "];

console.log("Tenemos " + categorias.length + " Categorias en el menú\n" + categorias);

let contador = 0;
let contenedor2;
let contenedor3;
const listaOrdenes = [];

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

const listaProductos = [];

listaProductos.push(new Lista(1, "pizza", 600, categorias[1], "./img/pizza.jpg"));
listaProductos.push(new Lista(2, "milanesa con pure", 550, categorias[1], "./img/milanesaConPure.jpg"));
listaProductos.push(new Lista(3, "milanesa con ensalada", 550, categorias[1], "./img/milanesaConEnsalada.jpg"));
listaProductos.push(new Lista(4, "milanesa con papas fritas", 550, categorias[1], "./img/milanesasConPapasFritas.jpg"));
listaProductos.push(new Lista(5, "asado con pure", 550, categorias[1], "./img/asadoConPure.jpg"));
listaProductos.push(new Lista(6, "asado con ensalada", 550, categorias[1], "./img/asadoConEnsalada.jpg"));
listaProductos.push(new Lista(7, "sopa de verduras", 550, categorias[1], "./img/sopa.jpg"));
listaProductos.push(new Lista(8, "pastafrola", 150, categorias[0], "./img/pastafrola.jpg"));
listaProductos.push(new Lista(9, "cafe con leche", 220, categorias[0], "./img/cafeConLeche.jpg"));
listaProductos.push(new Lista(10, "flan", 170, categorias[2], "./img/flan.jpg"));
listaProductos.push(new Lista(11, "helado", 240, categorias[2], "./img/helado.jpg"));
listaProductos.push(new Lista(12, "fernet con coca", 450, categorias[3], "./img/fernetConCoca.jpg"));
listaProductos.push(new Lista(13, "cerveza pinta", 220, categorias[3], "./img/cervezaPinta.jpg"));
listaProductos.push(new Lista(14, "cerveza botella", 340, categorias[3], "./img/cervezaBotella.jpg"));
listaProductos.push(new Lista(15, "coca cola", 170, categorias[3], "./img/cocaCola.jpg"));
listaProductos.push(new Lista(16, "sprite", 170, categorias[3], "./img/sprite.jpg"));


localStorage.setItem("listaProductosAlmacenados", JSON.stringify(listaProductos));

let limpiarOrden = document.querySelector('.limpiar');
limpiarOrden.addEventListener('click', limpiar);

function limpiar(){
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

    comida = listaProductos.find(producto => producto.nombre == ordenComida.toLowerCase());

    bebida = listaProductos.find(producto => producto.nombre == ordenBebida.toLowerCase());

    postre = listaProductos.find(producto => producto.nombre == ordenPostre.toLowerCase());

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
    for (const producto of listaProductos) {
        let contenedor = document.createElement("div");

        contenedor.innerHTML = `<div class="card">
                                <h3>${producto.id}) ${producto.nombre} $${producto.precio}</h3>
                                <img src=${producto.img} class="imagen"/>`;

        menuCatalogo.appendChild(contenedor);
    }
}
