import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalItemComponent } from './components/modal-item/modal-item.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ModalPerfilComponent } from './components/modal-perfil/modal-perfil.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ModalClienteComponent } from './components/modal-cliente/modal-cliente.component';
import { ModalItemClienteComponent } from './components/modal-item-cliente/modal-item-cliente.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    ProdutosComponent,
    SidebarComponent,
    ProdutoComponent,
    ModalComponent,
    ModalItemComponent,
    ClientesComponent,
    ModalPerfilComponent,
    ClienteComponent,
    ModalClienteComponent,
    ModalItemClienteComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
