import { renderSync } from 'sass';
import { readFileSync } from 'fs';

describe('mixins test', () => {
  function setup(source: string) {
    return renderSync({
      importer: (url) => {
        let filePath = `styles/${url.includes('utils') ? `_${url}` : url}.scss`;
        if (!process.cwd().includes('packages/bdir')) {
          filePath = `packages/bdir/${filePath}`;
        }

        return {
          contents: readFileSync(`./${filePath}`).toString(),
        };
      },
      data: `
        @import 'mixins';
        ${source}
        `,
    }).css.toString();
  }

  it('should create an encapsulated content', () => {
    const source = `
      h1 {
        @include encapsulation(true, '.test') {
          height: 10px;
        };
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for border end', () => {
    const source = `
      h1 {
        @include border-end(1px solid black);
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for border-radius', () => {
    const source = `
      h1 {
        @include border-radius(0 2px 2px 0);
      }

      h2 {
        @include border-radius(4px 2px);
      }

      h3 {
        @include border-radius(4px 2px 5px);
      }

      h4 {
        @include border-radius(4px, true, false);
      }

      h5 {
        @include border-radius(4px 2px, false);
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for border-radius-start', () => {
    const source = `
      h1 {
        @include border-radius-start(2px);
      }

      h2 {
        @include border-radius-start(2px, 4px, false);
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for border-radius-end', () => {
    const source = `
      h1 {
        @include border-radius-end(2px);
      }

      h2 {
        @include border-radius-end(2px, 4px, false);
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for margin end', () => {
    const source = `
      h1 {
        @include margin-end(20px);
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for padding start', () => {
    const source = `
      h1 {
        @include padding-start(20px);
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for float', () => {
    const source = `
      div {
        @include float();
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for dir', () => {
    const source = `
      div {
        @include dir(true);
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for start (left / right) positioning', () => {
    const source = `
      div {
        @include start(40px);
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for translating', () => {
    const source = `
      div {
        @include transformTranslate(5px, 5px);
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for scaling', () => {
    const source = `
      div {
        @include transformScale(5px, 5px);
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for mirroring', () => {
    const source = `
      div {
        @include mirror();
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });

  it('should create an rtl ltr support for rotating', () => {
    const source = `
      div {
        @include transformRotate(45deg);
      }
    `;
    const css = setup(source);
    expect(css).toMatchSnapshot();
  });
});
