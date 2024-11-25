import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ArtesaoService } from '../../../service/artesao.service';
import { Artesao } from '../../../entities/artesao';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  email: string = '';
  senha: string = '';
  id:string='';
  artesao: Artesao ={
    id: '',
    nome: '',
    email: '',
    telefone:'',
    cep:'',
    logradouro:'',
    numero:'',
    complemento:'',
    bairro:'',
    senha:'',
  } ;
  cliente: any = null;

  constructor(private http: HttpClient,private service: ArtesaoService,private router: Router) {}


  navegarProdutos() {
    if (!this.email || !this.senha) {
      alert('Por favor, preencha o email e a senha.');
      return;
    }
  
    const body = {
      email: this.email,
      senha: this.senha
    };
  
    this.http.post('http://localhost:8080/api/login', body, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (resp: any) => {
        console.log("Resposta recebida:", resp);
        const valida = resp > 0;
  
        if (valida) {
          this.findAllAndNavigate();
        } else {
          alert("Email ou senha inválidos, por favor tente novamente.");
        }
      },
      error: (resp: any) => {
        console.error("Erro na requisição:", resp);
        alert(resp.error?.erro || "Erro durante o login, tente novamente.");
      }
    });
  }
  
  findAllAndNavigate(): void {
    this.service.findAll().subscribe((resposta) => {
      this.cliente = resposta.find((cliente: any) => cliente.email === this.email);
  
      if (this.cliente) {
        this.id = this.cliente.id;
        alert('Login realizado com sucesso. ID do cliente: ' + this.id);
        localStorage.setItem('clienteId', this.id);
        this.router.navigate(['/produtos']);
      } else {
        alert('Erro: Cliente não encontrado.');
      }
    });
  }

  mudaTela(){
    this.router.navigate(['/cadastro']);
  }

 
}
