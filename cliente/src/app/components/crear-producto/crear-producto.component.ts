import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Console, error, log } from 'console';
//importaciones para las ANIMACIONES
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
//importaciones para mis clases
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';


@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, NgIf],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})


export class CrearProductoComponent {
  //variables de entorno
  productoForm: FormGroup;
  titulo = "CREAR PRODUCTO"
  id: string;

  //constructor
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _productoService: ProductoService, private aRouter: ActivatedRoute) {
    // Inicializamos las variables y damos la obligación de que los campos se tengan que llenar
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.esEditar();
  }


  //metodo que me almacena los valores de mi formulario
  agregarProducto() {
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      cantidad: this.productoForm.get('cantidad')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if (this.id !== null) {
      //editamos producto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info('Producto Actualizado', 'El producto se actualizo con exito!');
        this.router.navigate(['/'])
      }, error => {
        console.log(error);
        this.productoForm.reset; //resetea el formulario si pasa un error
      })

    } else {
      //para verificar que mis datos se estan almacenando
      console.log(PRODUCTO);
      //agregaos producto
      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
        //mesaje de exito
        this.toastr.success('Producto Creado', 'El producto se creo con exito!');
        //otra forma de redireccionar mis botones, sin necesidad de ponerlo en el html
        this.router.navigate(['/'])
      }, error => {
        console.log(error);
        this.productoForm.reset; //resetea el formulario si pasa un error
      })
    }
  }

  //para validar si el id se puede editar
  esEditar() {
    if (this.id !== null) {
      this.titulo = 'EDITAR PRODUCTO';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          cantidad: data.cantidad,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      })
    }
  }
}