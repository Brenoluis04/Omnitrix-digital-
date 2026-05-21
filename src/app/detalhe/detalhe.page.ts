import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

import { ServicoAliens, Alien } from '../service/aliens.service';
import { CategoriaIconePipe } from '../pipes/categoria-icone.pipe';
import { DestacarHabilidadeDirective } from '../directives/destacar-habilidade.directive';

@Component({
  selector: 'app-detalhe',
  templateUrl: 'detalhe.page.html',
  styleUrls: ['detalhe.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    CategoriaIconePipe,
    DestacarHabilidadeDirective
  ]
})
export class DetalhePage implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private servicoAliens = inject(ServicoAliens);

  alien?: Alien;

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.servicoAliens.buscarAlienPorId(id).subscribe({
      next: (alien) => {
        this.alien = alien;
      }
    });

  }

  voltar(): void {
  this.router.navigate(['/home']);
}

}