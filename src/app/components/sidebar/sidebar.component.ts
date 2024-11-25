import { Component, NgZone} from '@angular/core';
import { Artesao } from '../../../entities/artesao';
import { ArtesaoService } from '../../../service/artesao.service';
import { buscaArtesaoId } from '../../../environments/Artesao';
import { time } from 'console';
import { delay } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isSidebarOpen = false; 
  openModal: boolean =false; 
   id: number =0;

  constructor(private service: ArtesaoService, private zone: NgZone) {}

  artesao: Artesao = {
    id: '',
    nome: '',
    email: '',
    senha:'',
    telefone: '',
    cep:'',
    logradouro: '',
    numero:'',
    complemento:'',
    bairro:'',
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

  ngOnInit(): void {


    if (typeof localStorage !== 'undefined') {
      this.id = Number(localStorage.getItem('clienteId'));
      this.buscaPerfilId();
    } 
  }
  funcao(){
    this.buscaPerfilId();
  }

  buscaPerfilId(): void {
    
    this.service.buscaId(this.id).subscribe((resposta) => {
      this.artesao = {
        id: resposta.id,
        nome: resposta.nome,
        email: resposta.email,
        senha:resposta.senha,
        telefone: resposta.telefone,
        cep: resposta.cep,
        logradouro: resposta.logradouro,
        numero: resposta.numero,
        complemento: resposta.complemento,
        bairro: resposta.bairro,
      };
      setTimeout(() => {}, 0);
      this.zone.run(() => {
        // A detecção de mudanças será executada aqui.
      });
    });
   
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; 
  }

  AtivaModal() {
    this.openModal = true;
  }

  FechaModal = () => {
    this.openModal = false;
  }
}
