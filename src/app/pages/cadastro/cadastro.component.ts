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

  validarTelefone(telefone: string): boolean {
    const somenteNumeros = telefone.replace(/\D/g, '');
  
    // Deve ter exatamente 11 dígitos
    if (somenteNumeros.length !== 11) {
      alert("Telefone deve conter 11 digitos")
      return false;
    }
  
    // Verifica se o DDD é válido (01 a 99)
    const ddd = parseInt(somenteNumeros.substring(0, 2), 10);
    if (ddd < 11 || ddd > 99) {
      alert("DDD invalido")
      return false;
    }
  
    // Verifica se o primeiro dígito do número é 9 (para celular)
    if (somenteNumeros[2] !== '9') {
      alert("Primeiro digito deve começar com 9")
      return false;
    }
  
    return true;
  }

  formatarCep(cep: string): string {
    if (cep.includes('-')) {
      return cep;
    }
    if (cep.length === 8) {
      return `${cep.substring(0, 5)}-${cep.substring(5)}`;
    }
    throw new Error('O CEP deve ter exatamente 8 dígitos ou estar corretamente formatado.');
  }

  cadastraArtesao(): void {
    console.log("Dados enviados para cadastro:", this.artesao);
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
    let resp=this.validarTelefone(this.artesao.telefone)
    if(!resp){
     this.valido=false
    }
    if(!this.artesao.cep){
      alert("Cep nao pode estar vazio, por favor informe!")
      this.valido=false
    }if(!this.artesao.logradouro){
      alert("Logradouro nao pode estar vazio, por favor informe!")
      this.valido=false
    }if(!this.artesao.numero || Number(this.artesao.numero)<=0){
      alert("Numero nao pode estar vazio e deve ser maior que zero, por favor informe!")
      this.valido=false
    }if(!this.artesao.complemento){
      alert("Complemento nao pode estar vazio, por favor informe!")
      this.valido=false
    }if(!this.artesao.bairro){
      alert("Bairro nao pode estar vazio, por favor informe!")
      this.valido=false
    }
    
    
    if(this.valido){
      this.formatarCep(this.artesao.cep)
      this.service.cadastraArtesao(this.artesao).subscribe({
        next: (resp: any) => {
          console.log("Resposta recebida:", resp);
          if (resp.nome==this.artesao.nome) {
            alert("Cadastrado realizado com sucesso");
            this.router.navigate(['/login']);
          }
        },
        error: (resp :any) => {
          console.error("Já exite um artesao cadastrado com essas informaçoes:", resp);
          alert(resp.error?.erro || "Já exite um artesao cadastrado com essas informaçoes, por favor tente novamente.");
        }
      });

    }
    
  }

  mudaTela(){
    this.router.navigate(['/produtos']);
  }

}
