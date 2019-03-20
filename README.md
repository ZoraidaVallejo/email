
# Mail Template Builder

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![nps friendly](https://img.shields.io/badge/nps-friendly-blue.svg?style=flat-square)](https://github.com/kentcdodds/nps)

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
  - [nvm](#nvm)
  - [Node v8.10](#node-v810)
  - [npm5](#npm5)
  - [Packages](#packages)
- [Folder structure](#folder-structure)
  - [Static folders](#static-folders)
    - [Common](#common)
      - [Handlebar Layouts](#handlebar-layouts)
      - [Handlebar Partials](#handlebar-partials)
      - [Handlebar UI Components](#handlebar-ui-components)
  - [Editable folders: `src`](#editable-folders-src)
    - [SCSS](#scss)
      - [SCSS Modules](#scss-modules)
      - [SCSS Partials](#scss-partials)
    - [Images](#images)
    - [Data](#data)
- [How to use](#how-to-use)
  - [Workflow configuration](#workflow-configuration)
  - [Commands](#commands)
    - [Caveats](#caveats)
  - [Responsive behavior](#responsive-behavior)
    - [Responsive Classes](#responsive-classes)
- [Resources](#resources)
  - [Recipients for testing](#recipients-for-testing)
  - [Useful links](#useful-links)


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




### Responsive behavior

To set a responsive behavior to any element, you will add all the classes you require in a `responsive` attribute:

```html
<td class="..." responsive="[Responsive classes]">
  [Content]
</td>
```

**You MUST not use the `class` attribute for responsive !!** Because when the final HTML is build, the `class` will be stripped out from the HTML. So, only use it for development purposes (identifiers).

If you really need a class in the final HTML, use the `id` attribute. The workflow will replace it with `class`.

> You maybe asking yourself, "WTF?" `╚═| ~ ಠ ₒ ಠ ~ |═╝`
>
> It worked... so... `d–(^ ‿ ^ )z`


#### Responsive Classes

- **`collapse-one`**: Force a 100% width.
- **`mobile-reset-width`**: Reset the width of an element.
- **`mobile-reset-height`**: Reset the height.
- **`mobile-reset-bg-image`**: Remove any image set as a background.
- **`mobile-hide`**: Hide it.
- **`mobile-align-center`**: Center the text and if the element has a smaller width than its parent, it will be centered as well.
- **`mobile-fz-20`**: Chage the `font-size` to 20px.
- **`mobile-padding-top`**: Force a top padding of 10px.
- **`mobile-padding-right`**: Top → 10px.
- **`mobile-padding-bottom`**: Botom → 10px.
- **`mobile-padding-left`**: Left → 10px.
- **`mobile-padding-horizontal-sides`**: Right & Left → 10px.
- **`mobile-padding-vertical-sides`**: Top & Bottom → 10px.
- **`mobile-padding-full`**: All sides → 10px.
- **`mobile-padding-uneven-top`**: Top → 45px.
- **`mobile-padding-uneven-bottom`**: Bottom → 45px.
- **`mobile-padding-uneven-full`**: All Sides → 45px.
- **`mobile-no-padding-top`**: Remove the top padding.
- **`mobile-no-padding-bottom`**: Remove the bottom padding.
- **`mobile-no-padding-horizontal-sides`**: Remove the right and left paddings.
- **`mobile-no-float`**: Reset float to none.
- **`mobile-no-border`**: Remove all borders.


## Resources

### Recipients for testing

Use the following accounts to test desktop and web-based email clients:

Client | Account | Description
------ | ------- | -----------
Gmail | Use the Justia account for this one. | [More info](#add-another-email-account) about how to register a new mail account in Mailgun.
Outlook.com | diego.miguel.tester@outlook.com | **Password:** *diet32coke*
Yahoo! | jmailtester@yahoo.com | **Password:** *diet32coke*
AOL | jmailtester@aol.com | **Password:** *diet32coke* <br> **Security question:** <br> *What was the name of your first pet? → puppy*
Apple Mail | Use one of the previous accounts. | I recommend you to include the Justia account. <br>Check [this article](https://support.apple.com/en-us/HT204093#setup) if you don't know how to do it.

### Useful links

- http://www.leemunroe.com/responsive-email-design/ (Really good)
- https://css-tricks.com/override-gmail-mobile-optimized-email/ (Check this post when the template is not responsive)
- http://mailbuild.rookiewebstudio.com/build?demo=Prorio
- http://handlebarsjs.com/
- https://litmus.com/blog/understanding-media-queries-in-html-email
- https://backgrounds.cm/
- https://www.campaignmonitor.com/blog/email-marketing/2012/12/using-web-fonts-in-email/
- http://stylecampaign.com/blog/2015/02/webfont-support-in-email/
- https://www.campaignmonitor.com/dev-resources/will-it-work/webfonts/
- http://ceagon.com/tools/charts
- https://litmus.com/community/templates
