import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    //Propiedades de los inputs
    this.formulario = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(11),
        Validators.pattern('^[0-9]*$')
      ]]
    });
  }
  //meotodo para separar por comas
  formatNumber(event: Event): void {
    let input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    input.value = value;
    console.log("hola"+input.value);
    console.log(this.formulario.get('numeroDocumento'));
    

    this.formulario.get('numeroDocumento')?.setValue(value.replace(/,/g, ''), { emitEvent: false });
    console.log(this.formulario.get('numeroDocumento')?.value);
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const { tipoDocumento, numeroDocumento } = this.formulario.value;
      this.router.navigate(['/resumen'], { queryParams: { tipoDocumento, numeroDocumento } });
    }
  }

}
