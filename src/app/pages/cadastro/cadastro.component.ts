import { Component, Input, Output } from '@angular/core';
import { Artesao } from '../../../entities/artesao';
import { ArtesaoService } from '../../../service/artesao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  valido: boolean = true;

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

  constructor(private service: ArtesaoService,private router: Router) {}

  cadastraArtesao(): void {
    this.valido = true
    if(!this.artesao.nome ){
      alert("Nome nao pode estar vazio, por favor informe!")
      this.valido=false
    }
    if(!this.artesao.email){
      alert("E-mail nao pode estar vazio, por favor informe!")
      this.valido=false
    }
    if(!this.artesao.senha){
      alert("Senha nao pode estar vazio, por favor informe!")
      this.valido=false
    }
    if(!this.artesao.telefone){
      alert("Telefone nao pode estar vazio, por favor informe!")
      this.valido=false
    }
    if(!this.artesao.cep){
      alert("Cep nao pode estar vazio, por favor informe!")
      this.valido=false
    }if(!this.artesao.logradouro){
      alert("Logradouro nao pode estar vazio, por favor informe!")
      this.valido=false
    }if(!this.artesao.numero){
      alert("Numero nao pode estar vazio, por favor informe!")
      this.valido=false
    }if(!this.artesao.complemento){
      alert("Complemento nao pode estar vazio, por favor informe!")
      this.valido=false
    }if(!this.artesao.bairro){
      alert("Bairro nao pode estar vazio, por favor informe!")
      this.valido=false
    }
    
    if(this.valido){
      this.service.cadastraArtesao(this.artesao).subscribe({
        next: (resp: any) => {
          console.log("Resposta recebida:", resp);
          if (resp.nome==this.artesao.nome) {
            alert("Cadastrado realizado com sucesso");
            this.router.navigate(['/login']);
          }
        },
        error: (resp :any) => {
          console.error("Erro na requisição:", resp);
          alert(resp.error?.erro || "Informaçoes incorretas, por favor tente novamente.");
        }
      });

    }
    
  }

  mudaTela(){
    this.router.navigate(['/produtos']);
  }

}
