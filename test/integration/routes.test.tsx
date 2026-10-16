import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { AppRoutes } from '@routes/AppRoutes';
import {
  currenciesFixture,
  latestRatesFixture,
  syncStatusFixture,
} from '@test/fixtures/api.fixtures';
import { createFakeApiService, respondByUrl } from '@test/utils/fake-api.service';
import { renderWithProviders } from '@test/utils/render-with-providers';

function renderRoutes(route: string) {
  const api = createFakeApiService();
  respondByUrl(api, {
    '/currencies': currenciesFixture,
    '/exchange-rates/latest/BRL': latestRatesFixture,
    '/sync/status': syncStatusFixture,
  });

  return renderWithProviders(<AppRoutes />, { api, route });
}

describe('routes', () => {
  it('shows the 404 page for an unknown route', async () => {
    renderRoutes('/nao-existe');

    expect(
      await screen.findByRole('heading', { name: 'Página não encontrada' }),
    ).toBeInTheDocument();
  });

  it('navigates without reloading and moves the active menu item', async () => {
    renderRoutes('/');
    const nav = screen.getByRole('navigation', { name: 'Principal' });

    await userEvent.click(within(nav).getByRole('link', { name: 'Histórico' }));

    expect(await screen.findByRole('heading', { level: 1, name: 'Histórico' })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'Histórico' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(document.title).toBe('Histórico · Converter');
  });

  it('shows the latest data date in the footer', async () => {
    renderRoutes('/status');

    expect(await screen.findByText('Dados mais recentes: 28/09/2026')).toBeInTheDocument();
  });
});
