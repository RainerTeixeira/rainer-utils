/**
 * Hook para Detecção de Dispositivos Móveis
 *
 * Custom hook que detecta se o usuário está em um dispositivo móvel
 * baseado na biblioteca rainersoft/utils.
 *
 * @module @rainersoft/ui/hooks
 * @author Rainer Teixeira
 */

'use client';

import * as React from 'react';
import { isMobile } from '../dom';

/**
 * Hook useIsMobile
 *
 * Detecta se o viewport atual é considerado mobile usando rainersoft/utils.
 * Wrapper reativo para a função isMobile().
 *
 * @returns {boolean} true se a viewport é mobile, false caso contrário
 *
 * @example
 * import { useIsMobile } from '@rainersoft/ui'
 *
 * function MyComponent() {
 *   const isMobile = useIsMobile()
 *   return <div>{isMobile ? <MobileMenu /> : <DesktopMenu />}</div>
 * }
 */
export function useIsMobile() {
  const [isMobileState, setIsMobileState] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMobileState(isMobile());
  }, []);

  return isMobileState;
}

