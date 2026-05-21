import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoriaIcone',
  standalone: true
})
export class CategoriaIconePipe implements PipeTransform {

  private icones: { [key: string]: string } = {
    'Fogo':        '🔥',
    'Fera':        '🐾',
    'Cristal':     '💎',
    'Velocidade':  '⚡',
    'Inteligência':'🧠',
    'Força':       '💪',
    'Inseto':      '🦟',
    'Água':        '🌊',
    'Tecnologia':  '🤖',
    'Fantasma':    '👻',
    'Impacto':     '💥',
    'Colossal':    '🏔️',
    'Planta':      '🌿',
    'Digestão':    '👅',
    'Múmia':       '🧟',
    'Elétrico':    '⚡',
    'Lobisomem':   '🐺',
    'Duplicação':  '👥'
  };

  transform(categoria: string): string {

    if (!categoria) return '';

    const icone = this.icones[categoria] || '👽';

    return `${icone} ${categoria}`;

  }

}