import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Artesao } from "../entities/artesao";
import { alteraArtesao,deletaArtesao,buscaArtesao, cadastraArtesao } from "../environments/Artesao";


@Injectable({
    providedIn: 'root'
})
export class ArtesaoService {
    urlCadastra = cadastraArtesao.baseUrl;
    urlBusca = buscaArtesao.baseUrl;
    urlAltera = alteraArtesao.baseUrl; 
    urlDeleta = deletaArtesao.baseUrl;    

    constructor(private http: HttpClient) {}

    findAll(): Observable<Artesao[]> {
        return this.http.get<Artesao[]>(this.urlBusca);  
    }

    cadastraArtesao(artesao: Artesao): Observable<Artesao>{
        return this.http.post<Artesao>(`${this.urlCadastra}`, artesao);
    }

    alterarArtesao(id: number,artesao: Artesao): Observable<Artesao>{
        return this.http.put<Artesao>(`${this.urlAltera}${id}`, artesao);
    }

    deletaArtesao(id: number): Observable<void> { 
        return this.http.delete<void>(`${this.urlDeleta}${id}`);
      }
}
