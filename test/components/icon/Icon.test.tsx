import { mdiWeatherNight } from '@mdi/js';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Icon } from '@components/icon/Icon';

describe('Icon', () => {
  it('renders the mdi path as a decorative svg', () => {
    const { container } = render(<Icon name="themeDark" size={24} />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg?.querySelector('path')).toHaveAttribute('d', mdiWeatherNight);
  });
});
