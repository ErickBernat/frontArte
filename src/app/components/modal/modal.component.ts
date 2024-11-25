import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Produto } from '../../../entities/produto';
import { ProdutoService } from '../../../service/produto.service';

@Component({
  selector: 'app-modal',
  standalone: false,
  
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isOpen: boolean = false;  
  @Output() produtoCadastrado = new EventEmitter<void>(); 
  @Input() closeModal!: () => void;
  valido: boolean = true;

  constructor(private service: ProdutoService) {}

  produto:Produto = {
    id:'',
    nome:'',
    url:'',
    valor:''
  }

  valor: number = 1

  cadastraProduto(): void {
    this.produto.valor=this.valor.toString()
    this.valido = true
    if(!this.produto.url){
      alert("Campo Url nao pode estar vazio, por favor informe!")
      this.valido=false
    }
    if(!this.produto.nome ){
      alert("Campo Nome nao pode estar vazio, por favor informe!")
      this.valido=false
    }
    if(!this.produto.valor ||Number(this.produto.valor)<=0){
      alert("Campo Valor nao pode estar vazio e deve ser maior que 0, por favor informe!")
      this.valido=false
    }
    
    if(this.valido){
      this.service.cadastraProd(this.produto).subscribe(() => {
        alert("Produto cadastrado com sucesso");
        this.produtoCadastrado.emit(); // Emite o evento para o componente pai
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
