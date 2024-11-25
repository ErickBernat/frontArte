import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cliente } from "../entities/cliente";

import { buscaCliente,cadastraCliente,alteraCliente,deletaCliente } from "../environments/Cliente";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    urlCadastra = cadastraCliente.baseUrl;
    urlBusca = buscaCliente.baseUrl;
    urlAltera = alteraCliente.baseUrl; 
    urlDeleta = deletaCliente.baseUrl; 

    constructor(private http: HttpClient) {}

    findAll(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.urlBusca);  
    }

    cadastraCliente(Cliente :Cliente): Observable<Cliente>{
        return this.http.post<Cliente>(`${this.urlCadastra}`, Cliente);
    }

    alterarCliente(id: number,cliente: Cliente): Observable<Cliente>{
        return this.http.put<Cliente>(`${this.urlAltera}${id}`, cliente);
    }

    deletaCliente(id: number): Observable<void> { 
        return this.http.delete<void>(`${this.urlDeleta}${id}`);
      }
}
