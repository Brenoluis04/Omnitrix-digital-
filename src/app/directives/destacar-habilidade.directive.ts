import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[destacarHabilidade]',
  standalone: true
})
export class DestacarHabilidadeDirective {

  @HostBinding('style.backgroundColor')
  corFundo = '#103010';

  @HostBinding('style.border')
  borda = '2px solid #32ff32';

  @HostBinding('style.boxShadow')
  sombra = 'none';

  @HostBinding('style.transition')
  transicao = '0.3s';

  @HostBinding('style.padding')
  espacamento = '8px';

  @HostBinding('style.borderRadius')
  arredondamento = '8px';

  @HostListener('mouseenter')
  aoEntrarMouse() {
    this.sombra = '0 0 15px #32ff32';
  }

  @HostListener('mouseleave')
  aoSairMouse() {
    this.sombra = 'none';
  }

}