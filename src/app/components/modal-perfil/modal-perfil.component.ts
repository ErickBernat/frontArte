import { Component } from '@angular/core';
import { Input,EventEmitter,Output } from '@angular/core';
import { Artesao } from '../../../entities/artesao';
import { ArtesaoAlt } from '../../../entities/artesaoAlt';
import { ArtesaoService } from '../../../service/artesao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-perfil',
  standalone: false,
  
  templateUrl: './modal-perfil.component.html',
  styleUrl: './modal-perfil.component.scss'
})
export class ModalPerfilComponent {
  @Output() usuarioAlt = new EventEmitter<void>(); 
  @Output() usuarioAlterado = new EventEmitter<void>(); 
  valido: boolean = true;
  @Input() closeModal!: () => void;
  @Input() isOpen: boolean = false;
  @Input() nome:string='';
  
  @Input() artesao: Artesao = {
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

  artesaoI: ArtesaoAlt = {
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
    estado: "",
      cidade: ""
  } 
    

  constructor(private service: ArtesaoService,private router: Router ) {}

  formatarTelefoneInput(event: any): void {
    let telefone = event.target.value;
  
    // Remove todos os caracteres não numéricos
    telefone = telefone.replace(/\D/g, '');
  
    // Aplica a máscara
    if (telefone.length > 0) {
      telefone = telefone.replace(/^(\d{2})(\d)/, '($1) $2'); // DDD
    }
    if (telefone.length > 10) {
      telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2'); // Número com hífen
    }
  
    // Atualiza o valor no input
    event.target.value = telefone;
  }
  ngOnInit(): void {
    this.artesaoI = {
      id: this.artesao.id,
      nome: this.artesao.nome,
      email: this.artesao.email,
      senha:this.artesao.senha,
      telefone: this.artesao.telefone,
      cep:this.artesao.cep,
      logradouro: this.artesao.logradouro,
      numero:this.artesao.numero,
      complemento:this.artesao.complemento,
      bairro:this.artesao.bairro,
      estado: "SP",
      cidade: "São Paulo"
      } 
      

  }

  


  handleBackgroundClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-perfil')) {
      this.closeModal();
    }
  }
  validarTelefone(telefone: string): boolean {
    const somenteNumeros = telefone.replace(/\D/g, '');
  
    if (somenteNumeros.length !== 11) {
      alert("telefone deve conter 11 digitos")
      return false;
    }
  
    const ddd = parseInt(somenteNumeros.substring(0, 2), 10);
    if (ddd < 11 || ddd > 99) {
      alert("DDD invalido")
      return false;
    }
  
    if (somenteNumeros[2] !== '9') {
      alert("Primeiro digito deve começar com 9")
      return false;
    }
  
    return true;
  }

  logoff(){
    alert("Ate breve, "+this.artesao.nome)
    localStorage.removeItem('clienteId');
    this.router.navigate(['/login']);
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
  validarCampos(): boolean {
    if (!this.artesaoI.nome || !this.artesaoI.email || !this.artesaoI.telefone || !this.artesaoI.cep || !this.artesaoI.logradouro || !this.artesaoI.numero || !this.artesaoI.bairro) {
      this.valido = false;
      alert('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    let resp=this.validarTelefone(this.artesaoI.telefone)
   if(!resp){
    return false
   }
    this.valido = true;
    return true;
  }

  alterarArtesao(): void {
    if(this.validarCampos()){
      this.artesaoI.cep=this.formatarCep(this.artesaoI.cep)
    this.service.alterarArtesao(Number(this.artesaoI.id),this.artesaoI).subscribe(
      () => {
        alert("Usuario Alterado com sucesso")
      },
      (erro) => {
        console.error('Erro ao altera usuario:', erro);
        alert('Erro ao altera usuario.');
      }
    );
    }
    
  
}

  alteraFecha(){
    this.valido = true
    if(this.valido){
      this.alterarArtesao()
      this.usuarioAlt.emit();
      this.closeModal();
    }
  }
}
