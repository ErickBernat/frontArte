import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../../entities/produto';
import { ProdutoService } from '../../../service/produto.service';

@Component({
  selector: 'app-produtos',
  standalone: false,
  
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements OnInit {

  list: Produto[] = []; 
  filteredItems: Produto[] = []; 
  searchText: string = '';
  openModal: boolean =false;

  constructor(private service: ProdutoService,private router: Router) {}


  filterItems(): void {
    if (this.searchText) {
      this.filteredItems = this.list.filter(item => 
        item.nome.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredItems = this.list; 
    }
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.list = resposta;
      this.filteredItems = resposta; 
    });
  }


  ngOnInit(): void {
    this.findAll();
  }

  AtivaModal() {
    this.openModal = true;
  }

  FechaModal = () => {
    this.openModal = false;
  }
  onProdutoCadastrado(): void {
    this.findAll();
  }
  navegarHome(){
    this.router.navigate(['/home']);
  }


}
