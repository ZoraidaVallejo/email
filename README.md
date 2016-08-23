
# JUSTIA Mail Template Builder v1.1.0


## Table of Contents


1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Folder structure](#folder-structure)
    - [CSS](#css)
        - [Modules](#modules)
        - [Partials](#partials)
    - [Templates](#templates)
        - [UI Components](#ui-components)
        - [Components](#components)
    - [Images](#images)
4. [How to use](#how-to-use)
    - [Grunt configuration](#grunt-configuration)
    - [Grunt commands](#grunt-commands)
    - [Responsive behavior](#responsive-behavior)
        - [Responsive Classes](#responsive-classes)
5. [File Version Control](#file-version-control)
    - [Version](#version)
    - [Workflow](#workflow)
6. [Mailgun configuration](#mailgun-configuration)
    - [Login information](#login-information)
    - [Recipients](#recipients)
    - [Add another email account](#add-another-email-account)
7. [Resources](#resources)
8. [Release History](#release-history)


## Requirements

- **NVM** → [Install NVM](https://github.com/creationix/nvm)
- **Node.js** → Using `nvm`, install the 5.11 version of node. You can find the intructions in the `nvm` documentation.
- **Grunt** & **grunt-cli** installed globally → `npm install grunt-cli -g`


## Installation

Open a new terminal window and change the node version to 5.11:

```
nvm use 5.11
```

Or you can just use the following command (there is a **.nvmrc** file where the node version is declared):

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
        ├── ui-components/
        └── components/
```

Folder name | Description
----------- | -----------
`dist/` | Place where the compiled HTML with inlined CSS file and optimized images will be saved each time you build them.
`grunt/` | Contains all the Grunt modules. **DO NOT TOUCH IT unless you know what you are doing**.
`log/` | Folder where the previous email templates are stored in zip files.
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

Contains optional handlebar components that can help generate your markup. Each component will typically have a corresponding SCSS file in the `ui-components/` folder. See [Partials](#partials) for more info.

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

Contains all the content components of the email template. You can include them in the same way as the UI components, but without extra attributes:

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


## How to use


### Grunt configuration

Before you start, check/modify the **Gruntfile.js** file and make sure it has the correct configuration:

- **`port`**: The port on which the webserver will respond. The task will fail if the specified port is already in use.
- **`justatic_version`**: Version of Justatic to use in all absolute URL's.
- **`current_year`**: Current year. Very important to set it up correctly because it will help to categorize the images in the remote server.
- **`current_month`**: Current month. The same as the previous one.
- **`file_to_send`**: Name and extension of the template you want to test with the `grunt send` command.
- **`compressed_file_name`**: Name of the file where a copy of the **Gruntfile.js** file, `dist/` and `src/` folder are compressed.
- **`secrets`**: File where the mailgun configuration is saved. **Don't touch it.**
- **`path`**: Object with relative and remote paths.
    - **`src`**: Folder where all development files are stored.
    - **`src_img`**: Place where all unoptimized images are. (They will be optimized with Grunt, so don't worry)
    - **`dist`**: Folder where the distribution-ready files will be placed.
    - **`dist_img`**: Optimized images go here.
    - **`preview`**: Folder for the source files of the preview mode.
    - **`live_img`**: Absolute URL for all images. Used by `grunt build` and `grunt send` commands.
    - **`remote_img_path`**: Remote folder to upload all images.


### Grunt commands

- **`grunt`**: Cleans the `dist/` folder and builds the HTML (expanded version).
- **`grunt serve`**: Runs the default command (`grunt`), opens a local server and keeps watching your changes until you stop the proccess.
- **`grunt build`**: Runs the default command, but this time the HTML will be compressed and all URL's will be absolute.
- **`grunt send`**: Sends a copy of a template to all emails listed at the end of this document.
- **`grunt upload`**: Uploads all the images to the remote server.
- **`grunt zip`**: Zips the **Gruntfile.js** file, `src/` and `dist/` folders.


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


## File Version Control


### Version

You will bump it up only when you modify something from the file's content. Even if it's a minor change like update a single variable, change a color or a selector.

This only applies to most of the SCSS files except **`main.scss`** and all the files in the **`widgets/` directory**. And most of the **Handlebars components** except **all the files in the **`newsletter/` folder**.

The main reason for these exclusions is that the styles and content can and will change each month.


### Workflow

Defined in **main.scss**, **preserve.scss** and in the main template (**newsletter-{{year}}-{{month}}.hbs**).

Tells which version of the main workflow said file and its children compatible with.


## Mailgun configuration

Mailgun is used to send test emails to all the [recipients](#recipients) below. Since we are using a free account, we are limited to send 10,000 mails per month. But I think this is more than enough, but still be careful `໒( ͡ᵔ ▾ ͡ᵔ )७`.

### Login information

**Username** | **Password**
------------ | ------------
diego.miguel@justia.com | diet32coke


### Recipients

Client | Account | Description
------ | ------- | -----------
Gmail | Use the Justia account for this one. | [More info](#add-another-email-account) about how to register a new mail account in Mailgun.
Outlook.com | diego.miguel.tester@outlook.com | **Password:** *diet32coke*
Yahoo! | jmailtester@yahoo.com | **Password:** *diet32coke*
AOL | jmailtester@aol.com | **Password:** *diet32coke* <br> **Security question:** <br> *What was the name of your first pet? → puppy*
Apple Mail | Use one of the previous accounts. | I recommend you to include the Justia account. <br>Check [this article](https://support.apple.com/en-us/HT204093#setup) if you don't know how to do it.


### Add another email account

> **Note:** You need log in first to modify this section.

Go to the [Authorized Recipients](https://mailgun.com/app/testing/recipients) section and "Invite a New Recipient" to the list (Mailgun will ask you to verify the new account before you can use it).

Now open the **secrets.js** file and include the new account in the `"recipient"` option.

And you are ready to go `s( ^ ‿ ^)-b`.


## Resources

- http://www.leemunroe.com/responsive-email-design/ (Really good)
- http://mailbuild.rookiewebstudio.com/build?demo=Prorio
- http://handlebarsjs.com/
- https://litmus.com/blog/understanding-media-queries-in-html-email
- https://backgrounds.cm/
- https://www.campaignmonitor.com/blog/email-marketing/2012/12/using-web-fonts-in-email/
- http://stylecampaign.com/blog/2015/02/webfont-support-in-email/
- https://www.campaignmonitor.com/dev-resources/will-it-work/webfonts/
- http://ceagon.com/tools/charts
- https://litmus.com/community/templates


## Release History

Version | Date | Description
------- | ---- | -----------
v1.2.0 | 2016-08-23 | Changed all the workflow to work for multiple templates. <br> Created specific email accouts for testing.
v1.1.0 | 2016-08-03 | Remove duplicated variables in **default.yml** and keep the ones in the **Gruntfile.js** where the year and month of the current newsletter are been declared. <br> Moves all the images and newsletter blocks to use its main container folder, instead using especific ones (`img/2016/08/` → `img/`).
v1.0.0 | 2016-07-28 | Delete unnecessary modules. <br> Set version to all files. <br> Create documentation.
v0.1.0 | 2016-07-01 | Initial workflow.


