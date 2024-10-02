import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { error } from 'console';
import { Producto } from '../../models/producto';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Toast, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [RouterLink, RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './listar-productos.component.html',
   styleUrls: ['./listar-productos.component.css'] // Cambiado a "styleUrls"
})

//para listar los productos
export class ListarProductosComponent {

  listProductos: Producto[] =[]

  constructor(private _productoService: ProductoService, private toastr: ToastrService) {}

  //inicializar obtener productos
  ngOnInit():void {
    this.obtenerProductos();
  }

  //para obtener los productos
  obtenerProductos(){
    this._productoService.getProductos().subscribe(data => {
        console.log(data);
        this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  //para eliminar los productos
  eliminarProducto(id: any){
    console.log(id);
    this._productoService.eliminarProducto(id).subscribe(data =>{
      this.toastr.error('El producto fue eliminado con exito', 'Producto eliminado');
      this.obtenerProductos();
    }, error => {
      console.log(error);
    });

  }
}