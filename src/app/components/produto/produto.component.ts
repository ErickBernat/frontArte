import { Component } from '@angular/core';
import { Input,Output,EventEmitter } from '@angular/core';
import { ProdutoService } from '../../../service/produto.service';
import { Produto } from '../../../entities/produto';

@Component({
  selector: 'app-produto',
  standalone: false,
  
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent {
  openModal: boolean =false;
  @Output() produtoAlterado = new EventEmitter<void>(); 
  @Output() produtoDeletado = new EventEmitter<void>();

  produto: Produto = {
    id:'',
    nome: '',
    url: '',
    valor:''
  };
  @Input() id: number | undefined;
  @Input() nome: string | undefined;
  @Input() url: string | undefined;
  @Input() valor:number| undefined;

  ngOnInit(): void {
    
    this.produto = {
      id: this.id?.toString() || '', 
      nome: this.nome || '',
      url: this.url || '',
      valor: this.valor?.toString() || '', 
    };
  }

  alterar(){
    alert('Produto alterado com sucesso');
    this.produtoAlterado.emit()
  }


  constructor(private service: ProdutoService ) {}

  deletaProduto(event: Event): void {
    
    event.stopPropagation();
    if (!this.id) {
      alert('Erro: O ID do produto não foi fornecido.');
      return;
    }
  
    const confirmacao = window.confirm('Tem certeza de que deseja deletar este produto?');
    if (!confirmacao) {
      return;
    }
  
    this.service.deletaProd(this.id).subscribe(
      () => {
        this.produtoDeletado.emit();
        alert('Produto deletado com sucesso');
        
      },
      (erro) => {
        console.error('Erro ao deletar o produto:', erro);
        alert('Erro ao deletar o produto.');
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
