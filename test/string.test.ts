/**
 * Testes básicos para @rainersoft/utils
 */

import { textToSlug, capitalize, truncate } from '../src/string';

describe('String Utilities', () => {
  describe('textToSlug', () => {
    it('deve converter texto para slug', () => {
      expect(textToSlug('Meu Post Incrível!')).toBe('meu-post-incrivel');
    });

    it('deve remover acentos', () => {
      expect(textToSlug('São Paulo')).toBe('sao-paulo');
    });

    it('deve remover hífens do início e fim', () => {
      expect(textToSlug('-teste-')).toBe('teste');
    });

    it('deve handle texto vazio', () => {
      expect(textToSlug('')).toBe('');
    });
  });

  describe('capitalize', () => {
    it('deve capitalizar palavras', () => {
      expect(capitalize('rainer teixeira')).toBe('Rainer Teixeira');
    });

    it('deve handle texto vazio', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('truncate', () => {
    it('deve truncar texto longo', () => {
      expect(truncate('Texto muito longo', 10)).toBe('Texto m...');
    });

    it('deve manter texto curto', () => {
      expect(truncate('Curto', 10)).toBe('Curto');
    });
  });
});
