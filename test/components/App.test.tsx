import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ApiProvider } from '@contexts/ApiProvider';
import { createFakeApiService } from '@test/utils/fake-api.service';
import { createTestQueryClient } from '@test/utils/query-client';
import { ThemeProvider } from '@theme/ThemeProvider';

import { App } from '@routes/App';

describe('App', () => {
  it('renders the layout with the main landmark', () => {
    const api = createFakeApiService();
    api.get.mockReturnValue(new Promise(() => undefined));

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <ApiProvider api={api}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ApiProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});
