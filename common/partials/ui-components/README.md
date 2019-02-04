
# UI Components

## Buttons

Attributes | Type | Description
---------- | ---- | -----------
`class` | `string` | List of custom classes to stilize the button.
`buttonLink` | `string` | Link of the button.
`moreWhite` | `boolean` | White "Read More" button.
`moreBlue` | `boolean` | Blue "Read More" button.
`mailusWhite` | `boolean` | White "Email Us" button.
`mailusBlue` | `boolean` | Blue "Email Us" button.
`custom` | `boolean` | Custom button.
`imagePath` | `string` | Custom image path. Only available when `custom` is `true`.
`imageAlt` | `string` | Custom image alt. Only available when `custom` is `true`.

### Usage

```handlebars

<!-- Simple -->
{{> ui-button moreBlue=true buttonLink="https://www.justia.com/" }}

<!-- Custom classes -->
{{> ui-button moreBlue=true buttonLink="https://www.justia.com/" class="class-1 class-2 class-n" }}

<!-- Custom button -->
{{> ui-button custom=true buttonLink="https://www.justia.com/" imagePath="path/to/image.jpg" imageAlt="Lorem Ipsum" }}
```


## Image backgrounds for IE

Attributes | Type | Description
---------- | ---- | -----------
`bgStart` | `boolean` | Whether or not to include the opening hack code.
`absolutePath` | `boolean` | If true, you can pass an absolute path to the `image` attribute. <br>Otherwise the image will be called from the path defined in `default.imageDirSrc`.
`classes` | `string` | List of custom classes to stilize the button.
`responsiveClasses` | `string` | List of custom classes to keep in the final HTML and add responsive behavior.
`image` | `string` | Name of any image located in the `image/` folder.
`dimensions` | `string` | Witdh and Height properties in CSS syntax.
`bgColor` | `string` | Hexadecimal color.
`content` | `boolean` | Whether or not the image will have real content above the image.
`bgEnd` | `boolean` | Whether or not to include the ending hack code.
