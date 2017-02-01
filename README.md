
# JUSTIA Mail Template Builder


## Table of Contents


1. [Requirements](#requirements)
2. [Installation](#installation)
    - [NVM](#nvm)
    - [Node.js](#nodejs)
    - [Yarn](#yarn)
    - [Packages](#packages)
3. [Folder structure](#folder-structure)
    - [CSS](#css)
        - [Modules](#modules)
        - [Partials](#partials)
    - [Templates](#templates)
        - [UI Components](#ui-components)
        - [Components](#components)
    - [Images](#images)
4. [How to use](#how-to-use)
    - [Workflow configuration](#workflow-configuration)
    - [Grunt commands](#grunt-commands)
    - [Responsive behavior](#responsive-behavior)
        - [Responsive Classes](#responsive-classes)
5. [Resources](#resources)
6. [Release History](#release-history)


## Requirements

- **NVM**
- **Node.js**
- **Yarn**
- **Grunt**


## Installation

### NVM

Use the [NVM documentation](https://github.com/creationix/nvm#install-script) for this.

### Node.js

Using `nvm`, install the 6.9 version of node:

```shell
nvm install 6.9.2
```

**I highly recommend you** to set this new version of Node as **default** to be used in any new shell:

```shell
nvm alias default 6.9.2
```

You can do it manually too:

```shell
nvm use 6.9.2
```

### Yarn

Install it with the native OS package manager (if you are on a Mac, probably it will be `brew`):

```shell
brew update
brew install yarn
```

### Packages

First of all, install the Grunt Command Line Inteface globally:

```shell
npm install grunt-cli -g
```

Then, install the workflow packges in your local folder:

```
yarn install
```


## Folder structure

```
/
├── dist/
├── grunt/
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
        ├── ui-components/
        └── components/
```

Folder name | Description
----------- | -----------
`dist/` | Place where the compiled HTML with inlined CSS file and optimized images will be saved each time you build them.
`grunt/` | Contains all the Grunt modules. **DO NOT TOUCH IT unless you know what you are doing**.
`preview/` | All files related to the preview window where you see a *preview* of your work.
`src/` | Main folder where the source files of the email template are stored.
`css/scss/modules/` | [More info](#css-modules).
`css/scss/partials/` | [More info](#css-partials).
`data/` | Contains optional **.yml** data files that can be used in your templates.
`emails/` | Place where your main template(s) will go. 
`img/` | [More Info](#images)
`layouts/` | Contains the standard HTML wrapper markup. You most likely will only need one layout template, but you can have as many as you like.
`partials/ui-components/` | [More info](#ui-components).
`partials/components/` | [More info](#newsletter).


### CSS

This project uses [SASS](http://sass-lang.com/).

Media queries and responsive styles are in a separate stylesheet [preserve.scss](https://github.com/justia/justatic/blob/develop/newsletters/src/css/scss/preserve.scss) so that they don't get inlined. Go to [Responsive behavior](#responsive-behavior) to know how to set and use the responsive classes.

> **Note**: Only a few email clients support media queries. Litmus has done his homework and created this article for us: [***"Understanding Media Queries in HTML Email"***](https://litmus.com/blog/understanding-media-queries-in-html-email). Please read it :D (seriously, read it `୧( ಠ Д ಠ )୨` ).


#### Modules

Directory reserved for Sass code that doesn't cause Sass to actually output CSS. Things like mixin declarations, functions, and variables. Most of the time you won't need to modify any of these files.

This folder contains:

- `functions/`: A variety of functions for manage/modify colors, search/extend maps and do some mathematical operations. You will also find a file named **fn-shame**, where all the functions that are not properly documented with the [SassDoc annotations](http://sassdoc.com/annotations/) are.
- `mixins/`: Chunks of style rules. For now, it only has a mixin to declare a `font-face` rule.
- `settings/`: All the variables are declared here: available colors, font-sizes, dimentions and other stuff.


#### Partials

Directory where the meat of the CSS is constructed.

The following directories contain basic styles and some helper classes. So, don't modify any of the files unless you really need to:

- `layout/`: Main styles of header and footer sections, and base styles of the main content.
- `misc/`: Reset styles and some helpers for development use.
- `ui-components/`: These files style some of the handlebars compoments: buttons, dividers, columns, etc.

Now, this one is important:

- `components/`: Styles for all the *handlebar components* of the template. *Add/modify/delete* any file if you need to.

> **Note**:
> Some handlebar *UI components* or *components* will require a SASS partial. Name the new files like the handlebar component. For instance: **columnsGrid.hbs** → **columns-grid.scss**
> Notice that the hbs file name is in camelCase and the SASS file uses dashes as separators. The reason is because you will posibly include the hbs component more than once (in my opinion, if use the dash format it becomes a little anoying to select/change/add it).


### Templates

Handlebars and Assemble are used for templating.


#### UI Components

Contain optional handlebar components that can help generate your markup. Each component will typically have a corresponding SCSS file in the `ui-components/` folder. See [Partials](#partials) for more info.

For example, to include the **button.hbs** component you would use the following code in your email template:

```handlebars
{{> button url="http://google.com/" }}
```
>**Note**: You can use single -or- double quotes for attributes.

These are the available UI components that requires CSS to propertly work:

- Buttons
- Dividers with label
- Columns grid (responsive)
- Fixed columns grid (static)
- Image backgrounds for IE (It doesn't have a module per-se. The styles should be defined on a case by case basis)

This folder also includes some IE hack.

- Center layout (responsive)
- Fixed center layout (static)


#### Components

Contain all the content components of the email template. You can include them in the same way as the UI components, but without extra attributes:

```handlebars
{{> customComponent}}
```

### Images

The name of the folder says it all: place where all your source images will be stored.

You maybe asking yourself, "Oh, Great Master, How the heck should I name the new images I create?". The answer is simple my little padawan, follow this convetion: ***[projectName]-[section]-[description]-[counter]***

For instance: **welcome-connect-clients-button-01.png**

- [projectName] → **Welcome Series** → *welcome*
- [section] → **Connect with Clients** → *connect-clients*
- [description] → **According to the mockup, it's a button** → *button* `ᕕ( ՞ ᗜ ՞ )ᕗ`
- [counter] → **This is the first button of many more** → *01*

Avoid using any of the following names, **they will be ignore when uploading to the server**:

- welcome-background-01-a.png
- button-mailus-01.png
- button-mailus-02.png
- button-more-01.png
- button-more-02.png


## How to use


### Workflow configuration

Before you start, check/modify the **custom-config.js** file and make sure it has the correct configuration:

- **`conversionType`**: Type of conversion: `blast` or `newsletter`.
- **`port`**: The port on which the webserver will respond. The task will fail if the specified port is already in use.
- **`justatic_version`**: Version of Justatic to use in all absolute URL's.
- **`current_year`**: Current year. Very important to set it up correctly because it will help to categorize the images in the remote server.
- **`current_month`**: Current month. The same as the previous one.
- **`file_to_send`**: Name and extension of the template you want to test with the `grunt send` command.
- **`compressed_file_name`**: Name of the file where a copy of the **custom-config.js** file, `dist/` and `src/` folder are compressed.
- **`path`**: Object with relative and remote paths.
    - **`src`**: Folder where all development files are stored.
    - **`src_img`**: Place where all unoptimized images are. (They will be optimized with Grunt, so don't worry)
    - **`dist`**: Folder where the distribution-ready files will be placed.
    - **`dist_img`**: Optimized images go here.
    - **`preview`**: Folder for the source files of the preview mode.
    - **`live_img`**: Absolute URL for all images. Used by `grunt build` and `grunt send` commands.
    - **`remote_img_path`**: Remote folder to upload all images.


### Grunt commands

- **`grunt`**: Cleans the `dist/` folder and builds the HTML (expanded version). The compilation process will be slightly different base on the type of conversion you chose.
- **`grunt serve`**: Run the default command (`grunt`), opens a local server and keeps watching your changes until you stop the proccess.
- **`grunt build`**: Run the default command, but this time the HTML will be compressed and all URL's will be absolute.
- **`grunt send`**: Send a copy of a template to all emails listed at the end of this document.
- **`grunt upload`**: Upload all the images to the remote server.
- **`grunt zip`**: Zip the **custom-config.js** file, `src/` and `dist/` folders.

For the `grunt upload` command, you will need to create a `.ftppass` file where your user name is:

```json
{
    "key1": {
        "username": "username"
    }
}
```

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


## Resources

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
