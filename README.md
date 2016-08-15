
# JUSTIA Newsletter v1.1.0


## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Folder structure](#folder-structure)
    - [CSS](#css)
        - [Modules](#modules)
        - [Partials](#partials)
    - [Templates](#templates)
        - [Components](#components)
        - [Newsletter](#newsletter)
4. [How to use](#how-to-use)
    - [Set Year and Month](#set-year-and-month)
    - [Grunt commands](#grunt-commands)
    - [Responsive behavior](#responsive-behavior)
        - [Responsive Classes](#responsive-classes)
5. [File Version Control](#file-version-control)
    - [Version](#version)
    - [Workflow](#workflow)
6. [Resources](#resources)
7. [Recipients](#recipients)
8. [Release History](#release-history)


## Requirements

- **NVM** → [Install NVM](https://github.com/creationix/nvm)
- **Node.js** → Using `nvm`, install the 5.11 version of node. You can find the intructions in the `nvm` documentation.
- **Grunt** & **grunt-cli** installed globally → `npm install grunt-cli -g`


## Installation

Open a new terminal window and go to the `newsletters/` folder. Then change the node version to 5.11:

```
cd ~/path/to/newsletters/
nvm use 5.11
```

Or you can just use the following command (there is a `.nvmrc` file where the node version is declared):

```
nvm use
```

Then, install all the packapges and wait:

```
npm install
```


## Folder structure

```
/
├── dist/
├── grunt/
├── log/
├── preview/
└── src/
    ├── css/
    │   └── scss/
    │       ├── modules/
    │       └── partials/
    ├── data/
    ├── emails/
    ├── img/
    ├── layouts/
    └── partials/
        ├── components/
        └── newsletter/
```

Folder name | Description
----------- | -----------
`dist/` | Place where the compiled HTML with inlined CSS file and optimized images will be saved each time you build them.
`grunt/` | Contains all the Grunt modules. **Do not touch it unless you know what you are doing**.
`log/` | Folder where the previous newsletter are stored in a zip file.
`preview/` | All files related to the preview window where you see a ***preview*** of your work.
`src/` | Main container folder of the newsletter source files.
`css/scss/modules/` | [More info](#css-modules).
`css/scss/partials/` | [More info](#css-partials).
`data/` | Contains optional .yml data files that can be used in your templates.
`emails/` | Place where your main template will go. 
`img/` | The name of the folder says it all.
`layouts/` | Contains the standard HTML wrapper markup. You most likely will only need one layout template, but you can have as many as you like.
`partials/components/` | [More info](#components).
`partials/newsletter/` | [More info](#newsletter).


### CSS

This project uses [SCSS](http://sass-lang.com/).

Media queries and responsive styles are in a separate stylesheet [preserve.scss](https://github.com/justia/justatic/blob/develop/newsletters/src/css/scss/preserve.scss) so that they don't get inlined. Go to [Responsive behavior](#responsive-behavior) to know how to set and use the responsive classes.

> **Note**: Only a few email clients support media queries. Litmus has done his homework and created this article for us: [***"Understanding Media Queries in HTML Email"***](https://litmus.com/blog/understanding-media-queries-in-html-email). Please read it :D (seriously, read it `୧( ಠ Д ಠ )୨` ).


#### Modules

Directory reserved for Sass code that doesn't cause Sass to actually output CSS. Things like mixin declarations, functions, and variables. Most of the time you won't need to modify any of these files.

This folder contains:

- **functions**: A variety of functions for manage/modify colors, search/extend maps and do some mathematical operations. You will also find a file named `fn-shame`, where all the functions that are not properly documented with the [SassDoc annotations](http://sassdoc.com/annotations/) are.
- **mixins**: Chunks of style rules. For now, it only has a mixin to declare a `font-face` rule.
- **settings**: All the variables are declared here: available colors, font-sizes, dimentions and other stuff.


#### Partials

Directory where the meat of the CSS is constructed.

The following directories contain basic styles and some helper classes to create the newsletter. So, don't modify any file unless you really need to:

- **components**: These files style some of the handlebars compoments: buttons and dividers with label. If you need another hbs component, please create a SCSS file with the same name and include all the styles here.
- **layout**: Main styles of header and footer sections, and base styles of the main content containers.
- **misc**: Reset styles and some helpers for development use.

Now, this one is important:

- **widgets**: Styles for all the block of the newsletter. *Add/modify/delete* SCSS files if you need to.


### Templates

Handlebars and Assemble are used for templating.


#### Components

Contains optional `.hbs` files that can help generate your markup. Each component will typically have a corresponding SCSS file in `src/css/scss/_{{component_name}}.scss`.

To use a component, for example `/partials/components/button.hbs` you would use the following code in your emails template.

>**Note**: You can use single -or- double quotes for attributes.

```handlebars
{{> button buttonBlue=true url="http://google.com/" }}
```


#### Newsletter

Contains all the `.hbs` blocks of the newsletter content. To use a partial, for example `/partials/newsletter/welcome-{{year}}-{{month}}.hbs` you will use the following code in your emails template:

```handlebars
{{> welcome-2016-08}}
```


## How to use


### Set Year and Month

Before you start, check/modify the **Gruntfile.js** files and make sure it has the correct year and month:

```javascript
data: {
    currentYear: '2016',
    currentMonth: '08'
}
```

### Grunt commands

- **`grunt`**: Cleans the `dist` folder and build the HTML (expanded version).
- **`grunt serve`**: Runs the default command (`grunt`), opens a local host and keeps watching your changes until you stop the proccess.
- **`grunt build`**: Runs the default command, but this time the HTML will be compressed and all URL's will be absolute.
- **`grunt send`**: Sends a copy of the Newsletter to the emails listed at the end of this document.
- **`grunt upload`**: Uploads all the images to the remote server → `/mnt/files/emails/images/newsletters`.
- **`grunt zip`**: Zip the `src/` and `dist/`.


### Responsive behavior

To set a responsive behavior to any element, you will add all the classes you require in a `responsive` attribute:

```html
<td class="..." responsive="[Responsive classes]">
    [Content]
</td>
```

**You MUST not use the `class` attribute for responsive !!** Because when the final HTML is build, the `class` will be stripped out from the HTML. So, only use it for development purposes (identifiers).

If you really need a class in the final HTML, use the `id` attribute. The workflow will replace it with `class`.

> You maybe asking yourself, "WTF?"   ╚═| ~ ಠ ₒ ಠ ~ |═╝
> 
> It worked... so...   d–(^ ‿ ^ )z


#### Responsive Classes

- **`collapse-one`**: Force a 100% width.
- **`mobile-reset-width`**: Resets the width of an element.
- **`mobile-reset-height`**: Resets the height.
- **`mobile-reset-bg-image`**: Removes any image set as a background.
- **`mobile-hide`**: Hides it.
- **`mobile-align-center`**: Centers the text and if the element has a smaller width than its parent, it will be centered as well.
- **`mobile-padding-top`**: Forces a top padding of 10px.
- **`mobile-padding-bottom`**: Botom → 10px.
- **`mobile-padding-horizontal-sides`**: Right & Left → 10px.
- **`mobile-padding-vertical-sides`**: Top & Bottom → 10px.
- **`mobile-padding-full`**: All sides → 10px.
- **`mobile-padding-uneven-top`**: Top → 45px.
- **`mobile-padding-uneven-bottom`**: Bottom → 45px.
- **`mobile-padding-uneven-full`**: All Sides → 45px.
- **`mobile-no-padding-top`**: Removes the top padding.
- **`mobile-no-padding-bottom`**: Removes the bottom padding.
- **`mobile-no-padding-horizontal-sides`**: Removes the right and left paddings.
- **`mobile-no-float`**: Resets float to none.
- **`mobile-no-border`**: Removes all borders.


## File Version Control


### Version

You will bump it up only when you modify something from the file's content. Even if it's a minor change like update a single variable, change a color or a selector.

This only applies to most of the SCSS files except **`main.scss`** and all the files in the **`widgets/` directory**. And most of the **Handlebars components** except **all the files in the **`newsletter/` folder**.

The main reason for these exclusions is that the styles and content can and will change each month.


### Workflow

Defined in `main.scss`, `preserve.scss` and in the main template (`newsletter-{{year}}-{{month}}.hbs`).

Tells which version of the main workflow said file and its children compatible with.


## Resources

- http://mailbuild.rookiewebstudio.com/build?demo=Prorio
- http://handlebarsjs.com/
- https://litmus.com/blog/understanding-media-queries-in-html-email
- https://backgrounds.cm/
- https://www.campaignmonitor.com/blog/email-marketing/2012/12/using-web-fonts-in-email/
- http://stylecampaign.com/blog/2015/02/webfont-support-in-email/
- https://www.campaignmonitor.com/dev-resources/will-it-work/webfonts/
- http://ceagon.com/tools/charts
- https://litmus.com/community/templates


## Recipients

Client | Recipient
------ | ---------
Gmail | digznav@gmail.com
Outlook.com | digznav@hotmail.com
Apple Mail | vinnz@me.com
Yahoo! | digznav@yahoo.fr
AOL | digznav@aol.com


## Release History

Version | Date | Description
------- | ---- | -----------
v1.1.0 | 2016-08-03 | Remove duplicated variables in `default.yml` and keep the ones in the `Gruntfile.js` where the year and month of the current newsletter are been declared. Moves all the images and newsletter blocks to use its main container folder, instead using especific ones (`img/2016/08/` → `img/`).
v1.0.0 | 2016-07-28 | Delete unnecessary modules. Set version to all files. Create documentation.
v0.1.0 | 2016-07-01 | Initial workflow.


