import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Layout } from '@components/layout/Layout';
import { syncStatusFixture } from '@test/fixtures/api.fixtures';
import { createFakeApiService, respondByUrl } from '@test/utils/fake-api.service';
import { renderWithProviders } from '@test/utils/render-with-providers';

function BrokenPage(): never {
  throw new Error('quebrou');
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows the unexpected error page and keeps the header', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const api = createFakeApiService();
    respondByUrl(api, { '/sync/status': syncStatusFixture });

    renderWithProviders(
      <Routes>
        <Route element={<Layout />}>
          <Route path="/broken" element={<BrokenPage />} />
        </Route>
      </Routes>,
      { api, route: '/broken' },
    );

    expect(await screen.findByRole('heading', { name: 'Algo deu errado' })).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Erro inesperado');
    expect(screen.getByRole('link', { name: 'Ir para o início' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Ver status' })).toHaveAttribute('href', '/status');
    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument();
  });
});
