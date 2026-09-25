---
title: Reference
description: Explore Previewly's API, its options, return values and SVG serialization.
---

This page documents the public API exposed by Previewly. In most cases, you'll only interact with the [`getPreviewly()`](/docs/reference#getpreviewly) function and the objects it returns.

## `getPreviewly()`

Generates a low-quality image placeholder (LQIP) from an image buffer.

### Signature

```ts
function getPreviewly(
  src: Buffer | Uint8Array,
  options?: GetPreviewlyOptions
): Promise<GetPreviewlyReturn>
```

### Parameters

#### `src`

**Type:** `Buffer`
**Required:** Yes

The source image to process.

```ts
const previewly = await getPreviewly(buffer);
```

#### `options`

**Type:** `GetPreviewlyOptions`
**Required:** No

Configuration options that control how the placeholder is generated.

## `GetPreviewlyOptions`

### `autoOrient`

**Type:** `boolean`
**Default:** `false`

Automatically rotates the image according to its EXIF orientation metadata before generating the placeholder.

### `size`

**Type:** `number`
**Default:** `4`

The size of the generated placeholder image, in pixels.

The value must be an integer between **4** and **64**.

Larger values produce more detailed placeholders but slightly increase processing time and output size.

### `format`

**Type:** `ImageFormats`
**Default:** `"webp"`

Specifies the output format used for the generated placeholder image.

```ts
type ImageFormats =
  | "png"
  | "jpg"
  | "jpeg"
  | "webp"
  | "avif";
```

### `brightness`

**Type:** `number`
**Default:** `1`

Applies a brightness multiplier to the generated placeholder.

Values greater than `1` increase the brightness, while values below `1` make the image darker.

### `saturation`

**Type:** `number`
**Default:** `1.2`

Adjusts the color saturation of the placeholder.

Higher values produce more vibrant colors, while lower values create a more muted appearance.

### `hue`

**Type:** `number`
**Default:** `0`

Rotates the image hue by the specified number of degrees.

If omitted, no hue transformation is applied.

### `removeAlpha`

**Type:** `boolean`
**Default:** `false`

Removes the alpha channel from transparent images before generating the placeholder.

### `getExif`

**Type:** `boolean`
**Default:** `false`

Includes the image EXIF metadata in the returned [`metadata`](/docs/reference#metadata) object when available.

## Return value

[`getPreviewly()`](/docs/reference#getpreviewly) returns a [`Promise<GetPreviewlyReturn>`](/docs/reference#getpreviewlyreturn).

## `GetPreviewlyReturn`

### `base64`

**Type:** `string`

A Base64-encoded data URL that can be used directly as an image source.

```ts
<img src={previewly.base64} />
```

### `color`

**Type:** `GetPreviewlyColor`

The dominant color extracted from the image.

```ts
interface GetPreviewlyColor {
  hex: string;
  r: number;
  g: number;
  b: number;
}
```

Example:

```ts
console.log(previewly.color.hex);
// "#74A2D8"
```

### `css`

**Type:** `GetPreviewlyCSS`

A CSS representation of the placeholder using gradients.

```ts
interface GetPreviewlyCSS {
  backgroundImage: string;
  backgroundPosition: string;
  backgroundSize: string;
  backgroundRepeat: "no-repeat";
}
```

Example:

```ts
element.style.backgroundImage = previewly.css.backgroundImage;
```

### `svg`

**Type:** `GetPreviewlySVG`

A structured SVG representation of the generated placeholder.

This value is intended to be passed to [`serializeSVG()`](/docs/reference#serializesvg) before being embedded into HTML or converted into a string.

```ts
const svg = serializeSVG(previewly.svg);
```

### `pixels`

**Type:** `GetPreviewlyPixel[][]`

A two-dimensional array containing the generated placeholder pixels.

Each pixel is represented by the following structure:

```ts
interface GetPreviewlyPixel {
  r: number;
  g: number;
  b: number;
  a?: number;
}
```

This property is useful if you want to build your own renderer or perform custom processing.

### `metadata`

**Type:** `GetPreviewlyMetadata`

Contains information about the processed image.

```ts
interface GetPreviewlyMetadata {
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  originalFormat: string;
  // Additional EXIF metadata when available.
}
```

When [`getExif`](/docs/reference#getexif) is enabled, this object also includes the EXIF metadata extracted from the source image.

## `serializeSVG()`

Converts a Previewly SVG object into a serialized SVG string.

This helper is useful when you want to embed the generated SVG directly into HTML, convert it into a data URL, or use it anywhere a string representation of the SVG is required.

### Signature

```ts
function serializeSVG(svg: GetPreviewlySVG): string
```

### Parameters

#### `svg`

**Type:** `GetPreviewlySVG`
**Required:** Yes

The SVG object returned by [`getPreviewly()`](/docs/reference#getpreviewly).

```ts
const previewly = await getPreviewly(buffer);

const svg = serializeSVG(previewly.svg);
```

## Return value

**Type:** `string`

A serialized SVG document.

The returned value is a valid SVG string that can be:

- Embedded directly into HTML.
- Converted into a Base64 or URL-encoded data URL.
- Stored or transmitted as plain text.
- Used anywhere an SVG string is expected.
