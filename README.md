# @e-square/bdir

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)](LICENSE)
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](CONTRIBUTING.md#commit-message-format)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](.github/PULL_REQUEST_TEMPLATE.md)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)


> A bidirectional support lib for angular

## Features

- ✅ Runtime compatible
- ✅ CDK compatible
- ✅ Language to Direction support

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [FAQ](#faq)

## Installation

### NPM

`npm install @e-square/bdir`

### Yarn

`yarn add @e-square/bdir`

## Usage

1. Import the `BDirModule`:
    ```ts
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { BDirModule } from '@e-square/bdir';
    
    @NgModule({
        imports: [
            BrowserModule,
            BDirModule
        ],
        bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

2.  Add `bdir` directive In the application wrapper:
    ```html
    <div id="app-wrapper" bdir> 
      <h1>
          Welcome to {{ title }}!
      </h1>
      <router-outlet></router-outlet>
    </div>
    ```

3.  Start using `scss mixins`:
    ```scss
    @import "~@e-square/bdir/styles/mixins";
    h1 {
      color: darkslategray;
      @include padding-start(20px);
    }
    ```

    Now the `h1` element will transpile to:

    ```scss
    h1 {
      color: darkslategray;
    }
    *[dir=ltr] h1 {
      padding-right: 20px; }
    
    *[dir=rtl] h1 {
      padding-left: 20px; }
    ```

## API

The service and directive implements Angular CDK's Directionality class and uses its API.
#### BDirService
##### Methods:
*`setLang(lang: Lang)` - Setting the current language which will determine the direction value

*`setDir(dir: Direction)` - Set the current direction value.

*`getDir$(): Observable<Direction>` - Get the current direction value as observable.

*`setLang(lang: Lang)` - Get the opposite direction value as observable.

#### BDirDirective
`bdir: 'start' | 'end'` - Will set a `dir` attribute to the hosting element with `rtl | ltr` value accordingly `start`, is the default value.
```angular2html
  <element bdir="start"></element>
  <!-- Can also be written as -->
  <element bdir></element>
```

#### Tokens
`RTL_LANGUAGES` - Define which language will consider as `rtl` languages, default value: `['he', 'ar', 'hy', 'dv', 'ff', 'ku', 'fa']`.

`DEFAULT_LANG` - Define the default language, default value: `'en'`


#### Mixins
>All `mixins` were written following to the `css` syntax, simply change **left** & **right** with **start** & **end**.

>Also the `mixins` were developed in a way that the transpiled code will be as minimal as possible.

**`*$encapsulation`** property used for inner components to be affected by their host's direction by using angular's [:host-context](https://angular.io/guide/component-styles#host-context)

`padding-start($value, $encapsulation: true)`

`padding-end($value, $encapsulation: true)`

`margin-start($value, $encapsulation: true)`

`margin-end($value, $encapsulation: true)`

`border-start($value, $encapsulation: true)`

`border-end($value, $encapsulation: true)`

`float($start: true, $encapsulation: true)`

`dir($start: true, $encapsulation: true)`

`start($value, $encapsulation: true)`

`end($value, $encapsulation: true)`

`transformTranslate($x, $y: 0, $encapsulation: true)`

`transformScale($x, $y: 1, $encapsulation: true)`

`mirror($encapsulation: true)`

## FAQ

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/itayod"><img src="https://avatars.githubusercontent.com/u/6719615?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Itay Oded</b></sub></a><br /><a href="https://github.com/ronnetzer/bdir/commits?author=itayod" title="Code">💻</a> <a href="#design-itayod" title="Design">🎨</a> <a href="https://github.com/ronnetzer/bdir/commits?author=itayod" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/ronnetzer"><img src="https://avatars.githubusercontent.com/u/1116785?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ron Netzer</b></sub></a><br /><a href="https://github.com/ronnetzer/bdir/commits?author=ronnetzer" title="Code">💻</a> <a href="#design-ronnetzer" title="Design">🎨</a> <a href="https://github.com/ronnetzer/bdir/commits?author=ronnetzer" title="Documentation">📖</a> <a href="#maintenance-ronnetzer" title="Maintenance">🚧</a> <a href="https://github.com/ronnetzer/bdir/commits?author=ronnetzer" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
