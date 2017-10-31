
# Mail Template Builder


## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
  - [nvm](#nvm)
  - [Node v7.10](#node-v710)
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


## Requirements

- **nvm**
- **Node v7.10**
- **npm5**
- **Grunt**


## Installation

### nvm

Use the [nvm documentation](https://github.com/creationix/nvm#install-script) to install it.

### Node v7.10

Using `nvm`, install node v7.10:

```shell
nvm install 7.10
```

**I highly recommend you** to set this new version of Node as **default** to be used in any new shell:

```shell
nvm alias default 7.10
```

You can do it manually too:

```shell
nvm use 7.10
```

### npm5

Install it globally with the following command:

```shell
npm install -g npm
```

### Packages

First of all, install the Grunt Command Line Inteface globally:

```shell
npm install grunt-cli -g
```

Then, install the workflow packges in your local folder:

```
npm install
```


## Folder structure

```
/
├── changelog/
├── common/
├── dist/
├── examples/
├── grunt/
├── preview/
├── public/
├── scripts/
└── src/
    ├── css/
    ├── data/
    ├── emails/
    ├── img/
    ├── partials/
    └── scss/
        ├── modules/
        └── partials/
```

### Static folders

This folders contain the workflow functionality and other files for it to work properly.

Folder name | Description
----------- | -----------
`changelog/` | Store all the log files that document the changes of each version.
`common/` | Contain common [layouts](#handlebar-layouts), [partials](#handlebar-partials) and [ui-components](#handlebar-ui-components) for the email templates.
`dist/` | Place where the compiled HTML with inlined CSS file and optimized images will be saved each time you build them.
`examples/` | Mail template starters: it includes Blast, Newsletter, Oyez and Proposal (pdf).
`grunt/` | Contain all the Grunt modules. **DO NOT TOUCH IT unless you know what you are doing**.
`preview/` | All files related to the preview window where you see a _preview_ of your work.
`public/` | Folder where the final HTML files are stored.
`scripts/` | Script files related to the workflow. **DO NOT TOUCH THEM unless you know what you are doing**.


#### Common

##### Handlebar Layouts

This folder contains the standard HTML wrapper markup for different types of templates:

- Blast
- Newsletter (Open Sans font)
- Newsletter (Arial font)
- PDF print

##### Handlebar Partials

Contain all the partials of the email template. To include them use the following snippet:

```handlebars
{{> custom-partial }}
```

Depending on the partial it may accept attributes to customize the result:

```handlebars
{{> custom-partial booleanAttribute=true stringAttribute="lorem" variableAttribute=customPartial.value }}
```

>**Note**: You can use single -or- double quotes for attributes.

##### Handlebar UI Components

Contain optional handlebar components that can help generate your markup. Each component will typically have a corresponding SCSS file.

These are the available UI components that requires CSS to propertly work:

- Button: `ui-button`
- Responsive columns grid: `ui-column-grid`
- Static columns grid: `ui-fixed-column-grid`
- Labaled dividers: `ui-label-divider`
- Image backgrounds for IE (The styles should be defined on a case by case basis): `ui-background`

This folder also includes some IE hack.

- Responsive centered layout: `ui-layout-hack`
- Static centered layout: `ui-fixed-layout-hack`

And you can include them the same way as the [handlebar partials](#handlebar-partials).


### Editable folders: `src`

The `src/` folder contains the source files (styles, custom handlebars, data, etc) of the email templates.

Folder name | Description
----------- | -----------
`data/` | Contain **.json** data files that can be used in your templates [More info](#data).
`emails/` | Place where your main template(s) will go. 
`img/` | [More Info](#images)
`partials/` | [More info](#ui-components).
`scss/modules/` | [More info](#scss-modules).
`scss/partials/` | [More info](#scss-partials).


#### SCSS

This project uses [SASS](http://sass-lang.com/).

Media queries and responsive styles are in a separate stylesheet [preserve.scss](https://github.com/justia/justatic/blob/develop/newsletters/src/scss/preserve.scss) so that they don't get inlined. Go to [Responsive behavior](#responsive-behavior) to know how to set and use the responsive classes.

> **Note**: Only a few email clients support media queries. Litmus has done his homework and created this article for us: [***"Understanding Media Queries in HTML Email"***](https://litmus.com/blog/understanding-media-queries-in-html-email). Please read it :D (seriously, read it `୧( ಠ Д ಠ )୨` ).

##### SCSS Modules

Directory reserved for SASS code that doesn't cause SASS to actually output CSS. Things like mixin declarations, functions, and variables. Most of the time you won't need to modify any of these files.

Since this project uses the [frontend helpers](https://github.com/justia/frontend-helpers) module, the following folders only contain custom code:

- `functions/`: Custom/hardcoded functions specific for the current conversion.
- `mixins/`: Custom/hardcoded mixins specific for the current conversion.
- `settings/`: Custom/hardcoded variables specific for the current conversion.

##### SCSS Partials

Directory where the meat of the CSS is constructed.

The following directories contain basic styles and some helper classes. So, don't modify any of the files unless you really need to:

- `layout/`: Main styles of header and footer sections, and base styles of the main content.
- `misc/`: Reset styles and some helpers for development use.
- `ui-components/`: These files style some of the handlebars compoments: buttons, dividers, columns, etc.

Now, this one is important:

- `components/`: Styles for all the *handlebar components* of the template. *Add/modify/delete* any file if you need to.

> **Note**:
> Some handlebar *UI components* or *components* will require a SASS partial. Name the new files like the handlebar component. For instance: **ui-columns-grid.hbs** → **ui-columns-grid.scss**
> Notice that the hbs file name is in camelCase and the SASS file uses dashes as separators. The reason is because you will posibly include the hbs component more than once (in my opinion, if use the dash format it becomes a little anoying to select/change/add it).

#### Images

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

#### Data

Contain JSON files where the main information is stored. These files are used along with the handlebar components and shared the same name but separated by underscores.

For instance: The information showed in `custom-component.hbs` component is feeded by `customComponent.json` file.

To access the data saved on these files, use the following syntax:

```handlebars
{{{ customComponent.path.to.data }}}
```


There are some cases that you will need different content for the same block, specially for the newsletters (Clients and JLD). In that case you can define two main objects in the JSON file:

```json
{
  "clients": {
    "data": "Specific to the client's newsletter"
  },
  "jld": {
    "data": "Specific to the JLD's newsletter"
  }
}
```


## How to use


### Workflow configuration

Before you start, check/modify the **custom-config.json** file and make sure it has the correct configuration:

- **`version`**: Workflow version which the current conversion is compatible with. If this value is not defined, the workflow will assume the conversion is compiled with a workflow version 1.
- **`conversionType`**: Type of conversion: `blast`, `newsletter`, `oyez` and `proposal`.
- **`port`**: The port on which the webserver will respond. The task will fail if the specified port is already in use.
- **`justaticVersion`**: Version of Justatic to use in all absolute URL's.
- **`currentYear`**: Current year. Very important to set it up correctly because it will help to categorize the images in the remote server.
- **`currentMonth`**: Current month. The same as the previous one.
- **`compressedFileName`**: Name of the file where a copy of the **custom-config.json** file, `dist/` and `src/` folder are compressed.
- **`path`**: Object with relative and remote paths.
  - **`src`**: Folder where all development files are stored.
  - **`srcImg`**: Place where all unoptimized images are. (They will be optimized with Grunt, so don't worry)
  - **`dist`**: Folder where the distribution-ready files will be placed.
  - **`distImg`**: Optimized images go here.
  - **`preview`**: Folder for the source files of the preview mode.
  - **`liveImg`**: Absolute URL for all images. Used by `grunt build` and `grunt send` commands.
  - **`remoteImgPath`**: Remote folder to upload all images.


### Commands

- **Grunt**:
  - **`grunt`**: Clean the `dist/` folder and build the HTML (expanded version). The compilation process will be slightly different base on the type of conversion you chose.
  - **`grunt serve`**: Run the default command (`grunt`), open a local server and keep watching your changes until you stop the proccess.
  - **`grunt report`**: Get CSV files with the links and image tags from the dist files. You can find the generated files within the `tags/` folder. Once done, create a spreadsheet on the [Newsletters & Blast Reports](https://drive.google.com/drive/folders/0B7PrUnUkDf7UX3p5d1ZlN2FKTzQ) folder.
  - **`grunt upload`**: Upload all the images to the remote server.
- **Node (nps)**:
  - **`nps build`**: This command does the following:
    - Reformat all json files realted to the current conversion, including the `custom-config.json` and all the files within the `data/` folder.
    - Run **stylelint** and check all the SASS files realated to this conversion. The process will stop if there are errors.
    - Build the files (`grunt build`) and prepare them for distribution. The report will also be created during the process.
  - **`nps publish`**: This command is similar to the previous one but with more steps:
    - After the distribution files are ready, all the HTML files located in the `dist/` folder are copied to the `public/` folder and categorized by type, year and month. For instance, it will copy the HTML files of a newsletter conversion to `public/newsletter/2017/05/`.
    - Compress the **custom-config.json** file, `src/` and `dist/` folders.
    - Delete all the folders and files that were zipped and the `tags/` folder.

For the `grunt upload` command, you will need to create a `.ftppass` file where your user name is:

```json
{
  "key1": {
    "username": "username"
  }
}
```

#### Caveats

- You will have to backup the zip file on S3 manually after runninf the `grunt publish` command.
- The `grunt upload` command will fail if the parent folder of the direct parent folder doesn't exists remotely. For instance, if you are trying to upload all the images to `/emails/images/lawyer-directory/2018/01` but `2018/` doesn't exist, it will fail.


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
