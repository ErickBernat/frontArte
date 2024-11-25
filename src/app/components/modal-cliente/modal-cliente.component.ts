import { Component, Input, Output,EventEmitter  } from '@angular/core';
import { Cliente } from '../../../entities/cliente';
import { ClienteService } from '../../../service/cliente.service';

@Component({
  selector: 'app-modal-cliente',
  standalone: false,
  
  templateUrl: './modal-cliente.component.html',
  styleUrl: './modal-cliente.component.scss'
})
export class ModalClienteComponent {
  @Input() isOpen: boolean = false;  
  @Output() clienteCadastrado = new EventEmitter<void>(); 
  @Input() closeModal!: () => void;
  valido: boolean = true;

  constructor(private service: ClienteService) {}

  cliente:Cliente = {
    id:'',
    nome:'',
    telefone:'',
  }
  formatarTelefoneInput(event: any): void {
    let telefone = event.target.value;
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length > 0) {
      telefone = telefone.replace(/^(\d{2})(\d)/, '($1) $2'); 
    }
    if (telefone.length > 10) {
      telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2'); 
    }
    event.target.value = telefone;
  }

  validarTelefone(telefone: string): boolean {
    const somenteNumeros = telefone.replace(/\D/g, '');
  
    // Deve ter exatamente 11 dígitos
    if (somenteNumeros.length !== 11) {
      alert("Telefone deve conter 11 digitos")
      return false;
    }
  
    // Verifica se o DDD é válido (01 a 99)
    const ddd = parseInt(somenteNumeros.substring(0, 2), 10);
    if (ddd < 11 || ddd > 99) {
      alert("DDD invalido")
      return false;
    }
  
    // Verifica se o primeiro dígito do número é 9 (para celular)
    if (somenteNumeros[2] !== '9') {
      alert("Primeiro digito deve começar com 9")
      return false;
    }
  
    return true;
  }

  cadastraCliente(): void {

    this.valido = true

    if(!this.cliente.nome ){
      alert("Campo Nome nao pode estar vazio, por favor informe!")
      this.valido=false
    }
    let resp=this.validarTelefone(this.cliente.telefone)
    if(!resp){
     this.valido=false
    }
    
    
    if(this.valido){
      this.service.cadastraCliente(this.cliente).subscribe(() => {
        alert("Cliente cadastrado com sucesso");
        this.clienteCadastrado.emit(); // Emite o evento para o componente pai
        this.closeModal();
      });
    }
    
  }

  handleBackgroundClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-artesao')) {
      this.closeModal();
    }
  }
}
