import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { IonContent } from '@ionic/angular/standalone';

import { ServicoAliens, Alien } from '../service/aliens.service';
import { CategoriaIconePipe } from '../pipes/categoria-icone.pipe';
import { DestacarHabilidadeDirective } from '../directives/destacar-habilidade.directive';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    CategoriaIconePipe,
    DestacarHabilidadeDirective
  ]
})
export class HomePage implements OnInit {

  private servicoAliens = inject(ServicoAliens);
  private router = inject(Router);

  aliensLista: Alien[] = [];
  alienAtualIndice = 0;
  alienSelecionado?: Alien;
  anguloAtual = 0;
  omnitrixAtivado = false;

  isDragging = false;
  dragStartAngle = 0;
  acumuladoGraus = 0;

  ngOnInit(): void {
    this.carregarAliens();
  }

  carregarAliens(): void {
    this.servicoAliens.buscarTodosAliens().subscribe({
      next: (aliens: Alien[]) => {
        this.aliensLista = aliens;
        this.alienSelecionado = aliens[0];
      }
    });
  }

  ativarOmnitrix(): void {
    if (!this.omnitrixAtivado) {
      this.omnitrixAtivado = true;
    }
  }

  verDetalhe(): void {
    if (this.alienSelecionado) {
      this.router.navigate(['/detalhe', this.alienSelecionado.id]);
    }
  }

  onDragStart(event: MouseEvent | TouchEvent): void {
    if (!this.omnitrixAtivado) return;

    this.isDragging = true;
    this.dragStartAngle = this.getAngulo(event);
    this.acumuladoGraus = 0;

    event.preventDefault();
  }

  onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;

    const anguloEvento = this.getAngulo(event);
    let delta = anguloEvento - this.dragStartAngle;

    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    this.anguloAtual += delta;
    this.acumuladoGraus += delta;
    this.dragStartAngle = anguloEvento;

    const grausPorAlien = 36;

    if (this.acumuladoGraus >= grausPorAlien) {
      this.trocarAlien(1);
      this.acumuladoGraus -= grausPorAlien;
    } else if (this.acumuladoGraus <= -grausPorAlien) {
      this.trocarAlien(-1);
      this.acumuladoGraus += grausPorAlien;
    }

    event.preventDefault();
  }

  onDragEnd(): void {
    this.isDragging = false;
  }

  private trocarAlien(direcao: 1 | -1): void {
    if (this.aliensLista.length === 0) return;

    this.alienAtualIndice =
      (this.alienAtualIndice + direcao + this.aliensLista.length)
      % this.aliensLista.length;

    this.alienSelecionado = this.aliensLista[this.alienAtualIndice];
  }

  voltarMenu(): void {
  this.router.navigate(['/']);
  }

  private getAngulo(event: MouseEvent | TouchEvent): number {

    const el = document.querySelector('.anel-externo') as HTMLElement;

    const rect = el.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    let x: number;
    let y: number;

    if (event instanceof TouchEvent) {
      x = event.touches[0].clientX - cx;
      y = event.touches[0].clientY - cy;
    } else {
      x = event.clientX - cx;
      y = event.clientY - cy;
    }

    return Math.atan2(y, x) * (180 / Math.PI);
  }

}