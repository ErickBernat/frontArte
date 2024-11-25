import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../../entities/cliente';
import { ClienteService } from '../../../service/cliente.service';


@Component({
  selector: 'app-clientes',
  standalone: false,
  
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

  list: Cliente[] = []; 
  filteredItems: Cliente[] = []; 
  searchText: string = '';
  openModal: boolean =false;

  constructor(private service: ClienteService,private router: Router) {}


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
