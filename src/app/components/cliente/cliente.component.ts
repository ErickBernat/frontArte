import { Component } from '@angular/core';
import { Input,Output,EventEmitter } from '@angular/core';
import { ClienteService } from '../../../service/cliente.service';
import { Cliente } from '../../../entities/cliente';

@Component({
  selector: 'app-cliente',
  standalone: false,
  
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent {
  openModal: boolean =false;
  @Output() produtoAlterado = new EventEmitter<void>(); 
  @Output() produtoDeletado = new EventEmitter<void>();

  cliente: Cliente = {
    id:'',
    nome: '',
    telefone: ''
  };

  @Input() id: number | undefined;
  @Input() nome: string | undefined;
  @Input() telefone: string | undefined;

  ngOnInit(): void {
    
    this.cliente = {
      id: this.id?.toString() || '', 
      nome: this.nome || '',
      telefone:this.telefone || ''
    };
  }

  alterar(){
    alert('Cliente alterado com sucesso');
    this.produtoAlterado.emit()
  }


  constructor(private service: ClienteService ) {}

  deletaCliente(event: Event): void {
    
    event.stopPropagation();
    if (!this.id) {
      alert('Erro: O ID do cliente não foi fornecido.');
      return;
    }
  
    const confirmacao = window.confirm('Tem certeza de que deseja deletar este cliente ?');
    if (!confirmacao) {
      return;
    }
  
    this.service.deletaCliente(this.id).subscribe(
      () => {
        this.produtoDeletado.emit();
        alert('Cliente deletado com sucesso');
        
      },
      (erro) => {
        console.error('Erro ao deletar o cliente:', erro);
        alert('Erro ao deletar o cliente.');
      }
    );
  }


  AtivaModal() {
    this.openModal = true;
  }

  FechaModal = () => {
    this.openModal = false;
  }

}
