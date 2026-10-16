import { Component, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;

  /** O que mostrar no lugar dos filhos quando eles quebram ao renderizar. */
  fallback: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Captura erros de renderização dos filhos e mostra o `fallback` no lugar.
 *
 * Para voltar ao normal ao trocar de página, use uma `key` que mude com a rota.
 *
 * @example
 * ```tsx
 * <ErrorBoundary key={location.pathname} fallback={<UnexpectedError />}>
 *   <Outlet />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
