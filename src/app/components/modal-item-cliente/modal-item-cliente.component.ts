import { Component } from '@angular/core';
import { Input,EventEmitter,Output } from '@angular/core';
import { Cliente } from '../../../entities/cliente';
import { ClienteService } from '../../../service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-item-cliente',
  standalone: false,
  
  templateUrl: './modal-item-cliente.component.html',
  styleUrl: './modal-item-cliente.component.scss'
})
export class ModalItemClienteComponent {
  @Output() produtoAlt = new EventEmitter<void>(); 
  valido: boolean = true;
  @Input() closeModal!: () => void;
  @Input() isOpen: boolean = false;  

  cliente: Cliente= {
    id:'',
    nome: '',
    telefone:''
  };

  @Input() idI: number | undefined;
  @Input() nomeI: string | undefined;
  @Input() telefoneI: string | undefined;

  constructor(private service: ClienteService,private router: Router ) {}
  formatarTelefoneInput(event: any): void {
    let telefone = event.target.value;
  
    // Remove todos os caracteres não numéricos
    telefone = telefone.replace(/\D/g, '');
  
    // Aplica a máscara
    if (telefone.length > 0) {
      telefone = telefone.replace(/^(\d{2})(\d)/, '($1) $2'); // DDD
    }
    if (telefone.length > 10) {
      telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2'); // Número com hífen
    }
  
    // Atualiza o valor no input
    event.target.value = telefone;
  }

  validarTelefone(telefone: string): boolean {
    const somenteNumeros = telefone.replace(/\D/g, '');
  
    // Deve ter exatamente 11 dígitos
    if (somenteNumeros.length !== 11) {
      alert("telefone deve conter 11 digitos")
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


  ngOnInit(): void {
    
    this.cliente = {
      id: this.idI?.toString() || '', 
      nome: this.nomeI || '',
      telefone:this.telefoneI || ''
    };
  }

  

  alterarProduto(): void {
      this.service.alterarCliente(Number(this.idI),this.cliente).subscribe(
        () => {
          
        },
        (erro) => {
          console.error('Erro ao deletar o produto:', erro);
          alert('Erro ao deletar o produto.');
        }
      );
    
  }

  handleBackgroundClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-artesao')) {
      this.closeModal();
    }
  }

  alteraFecha(){
    this.valido = true
    if (this.idI === undefined) {
      alert('Erro: O ID do produto não foi fornecido.');
      return;
    }
    if(!this.cliente.nome ){
      alert("Nome nao pode estar vazio")
      this.valido=false
    }
   let resp=this.validarTelefone(this.cliente.telefone)
   if(!resp){
    this.valido=false
   }
      
    if(this.valido){
      this.alterarProduto();
      this.produtoAlt.emit();
      this.closeModal();
    }
  }

  

}
