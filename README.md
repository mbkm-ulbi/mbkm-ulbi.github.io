# ULBI MBKM Github Pages (MPA)

- [uhtml](https://github.com/WebReflection/uhtml)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [Tailwind (Standalone-CLI)](https://tailwindcss.com/blog/standalone-cli)
- [View Transition MPA](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API/Using#basic_mpa_view_transition)
- [Render Blocking](https://fullystacked.net/render-blocking-on-purpose/)
- [jsDelivr](https://www.jsdelivr.com/)

### VS Code

##### Plugin

- Prettier - Code formatter
- Tailwind CSS Intellisense
- lit-plugin
- Live Server

##### Setting (JSON)

```json
"tailwindCSS.experimental.classRegex":
    [["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*?)[\"'`]"]]
```

## Development

- Run Live Server
- Watch tailwind css

```bash
tailwindcss -i ./src/css/raw/main.css -o ./src/css/minify/main.min.css --watch
```

#### Minifying CSS

```bash
tailwindcss -i ./src/css/raw/choices.css -o ./src/css/minify/choices.min.css --minify
tailwindcss -i ./src/css/raw/filepond.css -o ./src/css/minify/filepond.min.css --minify
tailwindcss -i ./src/css/raw/flatpickr.css -o ./src/css/minify/flatpickr.min.css --minify
tailwindcss -i ./src/css/raw/notify.css -o ./src/css/minify/notify.min.css --minify
tailwindcss -i ./src/css/raw/main.css -o ./src/css/minify/main.min.css --minify
```

#### BaseUrl

```js
// each .html dev-mode
<base href="/" />
// each .html prod-mode
<base href="https://mbkm-ulbi.github.io/" />

// settings.js dev-mode
export const baseUrl = "/";
export const slugUri = "/mbkm-fe/";
// settings.js prod-mode
export const baseUrl = "https://mbkm-ulbi.github.io/";
export const slugUri = "/mbkm-fe/"
```

## Switch Mode

If you have [bun](https://bun.sh/) installed, and
Tailwind (Standalone-CLI) (that can be accessed globally as `tailwindcss`)
you can easily switch mode by run this code.

```bash
bun switch-mode.js prod
or
bun switch-mode.js dev
```

This command will rewrite your base url, and watch/minifying tailwind css
