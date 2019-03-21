
# Mail Template Builder

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![nps friendly](https://img.shields.io/badge/nps-friendly-blue.svg?style=flat-square)](https://github.com/kentcdodds/nps)

## Table of Contents

- [Folder structure](#folder-structure)
  - [Static folders](#static-folders)
    - [Common](#common)
      - [Handlebar Layouts](#handlebar-layouts)
      - [Handlebar Partials](#handlebar-partials)
      - [Handlebar UI Components](#handlebar-ui-components)


##### Handlebar UI Components

Contain optional handlebar components that can help generate your markup.

These are the available UI components:

- Button: `ui-button`
- Responsive columns grid: `ui-column-grid`
- Labaled dividers: `ui-label-divider`
- Image backgrounds for IE (The styles should be defined on a case by case basis): `ui-background`

This folder also includes some IE hack.

- Responsive centered layout: `ui-layout-hack`

And you can include them the same way as the [handlebar partials](#handlebar-partials).

For more detailed information about the component's configuration, [continue reading here](https://github.com/justia/mail-template-builder/tree/develop/common/ui-components#ui-components).
