import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent {
  cliente: any;
  error: any;

  constructor(private route: ActivatedRoute, private router: Router, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tipoDocumento = params['tipoDocumento'];
      const numeroDocumento = params['numeroDocumento'];

      // Casos de prueba sin conexion a la API
      // const clientes = [
      //   { tipoDocumento: 'C', numeroDocumento: '12345678', nombre: 'Juan', apellido: 'Pérez' },
      //   { tipoDocumento: 'P', numeroDocumento: '87654321', nombre: 'María', apellido: 'López' }
      // ];

      // this.cliente = clientes.find(c => c.tipoDocumento === tipoDocumento && c.numeroDocumento === numeroDocumento);
      

      //Conexion a la API de SpringBoot
      this.clienteService.getCliente(tipoDocumento, numeroDocumento).subscribe({
        next: (v) => {this.cliente=v},
        error: (e) => {this.error=e.error},
      });
    });
  }

  volver(): void {
    //Navegacion boton volver
    this.router.navigate(['/']);
  }

}
