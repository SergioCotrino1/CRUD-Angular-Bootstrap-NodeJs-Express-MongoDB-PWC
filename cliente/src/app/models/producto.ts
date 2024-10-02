export class Producto {
    //variables que traemos desde el back
    _id?: string;
    nombre: string;
    categoria: string;
    cantidad: number;
    ubicacion: string;
    precio: number;

    constructor(nombre: string, categoria: string, cantidad: number, ubuicacion: string, precio: number) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad=cantidad;
        this.ubicacion = ubuicacion;
        this.precio = precio;

    }
}