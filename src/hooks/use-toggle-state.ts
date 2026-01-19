/**
 * Hook customizado para gerenciar estado de toggle com persistência
 * 
 * @module components/social/hooks/use-toggle-state
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { useState, useEffect } from 'react';

/**
 * Configuração de persistência do estado do toggle.
 */
export interface StorageConfig {
  /** Tipo de armazenamento a utilizar. */
  type?: 'localStorage' | 'sessionStorage' | 'memory' | 'none';
  /** Chave para salvar o estado quando houver persistência. */
  key?: string;
  /** Tempo de vida em minutos para expirar o valor persistido. */
  ttl?: number; // minutos
}

/**
 * Opções para o hook {@link useToggleState}.
 */
export interface ToggleStateOptions {
  /** Valor inicial do toggle (padrão: false). */
  initialValue?: boolean;
  /** Configuração de persistência. */
  storage?: StorageConfig;
  /** Callback acionada ao alternar o estado. */
  onToggle?: (isActive: boolean) => void;
}

/**
 * Hook para gerenciar estado toggle com persistência opcional e callback.
 * Retorna helpers para alternar, definir e obter flags de carregamento.
 */
export function useToggleState({
  initialValue = false,
  storage = { type: 'localStorage' },
  onToggle
}: ToggleStateOptions = {}) {
  const [isActive, setIsActive] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar estado persistido
  useEffect(() => {
    if (storage.type === 'none') {
      setIsLoading(false);
      return;
    }

    try {
      const storageKey = storage.key || 'toggle-state';
      const storageObj = storage.type === 'localStorage' ? localStorage : sessionStorage;
      const stored = storageObj.getItem(storageKey);

      if (stored) {
        const data = JSON.parse(stored);
        
        // Verificar TTL se especificado
        if (storage.ttl && data.timestamp) {
          const age = (Date.now() - data.timestamp) / (1000 * 60);
          if (age > storage.ttl) {
            storageObj.removeItem(storageKey);
            setIsLoading(false);
            return;
          }
        }
        
        setIsActive(data.value);
      }
    } catch (error) {
      console.warn('Error loading toggle state:', error);
    } finally {
      setIsLoading(false);
    }
  }, [storage]);

  // Salvar estado quando mudar
  const saveState = (newValue: boolean) => {
    setIsActive(newValue);
    onToggle?.(newValue);

    if (storage.type === 'none') return;

    try {
      const storageKey = storage.key || 'toggle-state';
      const storageObj = storage.type === 'localStorage' ? localStorage : sessionStorage;
      
      const data = {
        value: newValue,
        timestamp: storage.ttl ? Date.now() : undefined
      };
      
      storageObj.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Error saving toggle state:', error);
    }
  };

  const toggle = () => saveState(!isActive);
  const setActive = (value: boolean) => saveState(value);

  return {
    isActive,
    isLoading,
    toggle,
    setActive,
    setIsActive: saveState
  };
}
