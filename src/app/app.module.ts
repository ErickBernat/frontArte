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




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    ProdutosComponent,
    SidebarComponent,
    ProdutoComponent
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
