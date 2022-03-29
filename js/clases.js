class Lista {
    constructor(id, nombre, precio, category, imgValor) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.category = category;
        this.img = imgValor;
    }

    sumarIva() {
        this.precio = this.precio * 1.21;
    }
}

class Pedido {
    constructor(comida, bebida, postre) {
        this.comida = comida;
        this.bebida = bebida;
        this.postre = postre;

    }
}