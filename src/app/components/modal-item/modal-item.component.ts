import { Component } from '@angular/core';
import { Input,EventEmitter,Output } from '@angular/core';
import { Produto } from '../../../entities/produto';
import { ProdutoService } from '../../../service/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-item',
  standalone: false,
  
  templateUrl: './modal-item.component.html',
  styleUrl: './modal-item.component.scss'
})
export class ModalItemComponent {
  @Output() produtoAlt = new EventEmitter<void>(); 
  valido: boolean = true;
  @Input() closeModal!: () => void;
  @Input() isOpen: boolean = false;  

  produto: Produto = {
    id:'',
    nome: '',
    url: '',
    valor:''
  };

  @Input() idI: number | undefined;
  @Input() nomeI: string | undefined;
  @Input() urlI: string | undefined;
  @Input() valorI:number| undefined;
  valor: number = 1

  constructor(private service: ProdutoService,private router: Router ) {}

  ngOnChanges(): void {
    this.produto = {
      id: this.idI?.toString() || '', 
      nome: this.nomeI || '',
      url: this.urlI || '',
      valor: this.valorI?.toString() || '', 
    };
    this.valor = Number(this.produto.valor);
  }

  

  alterarProduto(): void {
      this.service.alterarProd(Number(this.idI),this.produto).subscribe(
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

  timestamp: number = Date.now();
  alteraFecha(){
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
    if(!this.valor || Number(this.valor)<=0){
      alert("Campo Valor nao pode estar vazio e deve ser maior que 0, por favor informe!")
      this.valido=false
    }
    if(this.valido){
      this.timestamp = Date.now();
      this.alterarProduto();
      this.produtoAlt.emit();
      this.closeModal();
    }
  }

  

}
