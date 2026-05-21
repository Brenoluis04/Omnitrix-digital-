import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Alien {
  id: number;
  nome: string;
  planeta: string;
  especie: string;
  categoria: string;
  habilidades: string[];
  descricao: string;
  historiaRaca: string;
  curiosidades: string[];
  fotoRealUrl: string;
  corPrimaria: string;
  corSecundaria: string;
  imagemUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicoAliens {

  private http = inject(HttpClient);

  private apiUrl = 'https://6a0b62505aa893e1015a32e1.mockapi.io/Aliens';

  buscarTodosAliens(): Observable<Alien[]> {
    return this.http.get<Alien[]>(this.apiUrl);
  }

  buscarAlienPorId(id: number): Observable<Alien | undefined> {
    return this.http.get<Alien>(`${this.apiUrl}/${id}`);
  }

}