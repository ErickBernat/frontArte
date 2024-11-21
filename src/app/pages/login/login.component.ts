import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  email: string = '';
  senha: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  navegarProdutos(){
    const body = {
      email: this.email,
      senha: this.senha
    };

    this.http.post('http://localhost:8080/api/login', body, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (resp: any) => {
        console.log("Resposta recebida:", resp);
        if (resp==1) {
          alert("Login Realizado com sucesso");
          this.router.navigate(['/produtos']);
        } else {
          alert("Email ou senha invalidos, por favor tente novamente.");
        }
      },
      error: (resp :any) => {
        console.error("Erro na requisição:", resp);
        alert(resp.error?.erro || "Email ou senha invalidos, por favor tente novamente.");
      }
    });
  }

  mudaTela(){
    this.router.navigate(['/cadastro']);
  }

 
}
