import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Produto } from "../entities/produto";
import { buscaProduto,alteraProduto,cadastraProduto,deletaProduto } from "../environments/produto";



@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    urlCadastra = cadastraProduto.baseUrl;
    urlBusca = buscaProduto.baseUrl;
    urlAltera = alteraProduto.baseUrl; 
    urlDeleta = deletaProduto.baseUrl;    

    constructor(private http: HttpClient) {}

    findAll(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.urlBusca);  
    }

    cadastraProd(produto: Produto): Observable<Produto>{
        return this.http.post<Produto>(`${this.urlCadastra}`, produto);
    }

    alterarProd(id: number,produto: Produto): Observable<Produto>{
        return this.http.put<Produto>(`${this.urlAltera}${id}`, produto);
    }

    deletaProd(id: number): Observable<void> { 
        return this.http.delete<void>(`${this.urlDeleta}${id}`);
      }
}
