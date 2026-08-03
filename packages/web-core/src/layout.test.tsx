import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { RootLayout } from './layout';

describe('RootLayout', () => {
  it('renders an html shell with a skip-to-content link', () => {
    const html = renderToStaticMarkup(
      <RootLayout htmlClassName="fonts" bodyClassName="body-class">
        <main id="main-content">Content</main>
      </RootLayout>
    );

    expect(html).toContain('<html lang="en" class="fonts">');
    expect(html).toContain('<body class="body-class">');
    expect(html).toContain('Skip to main content');
    expect(html).toContain('<main id="main-content">Content</main>');
  });

  it('uses a custom lang attribute', () => {
    const html = renderToStaticMarkup(
      <RootLayout lang="es">
        <div>Contenido</div>
      </RootLayout>
    );

    expect(html).toContain('<html lang="es">');
  });
});
