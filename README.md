# CSS Validator Javascript Action

This action validates input CSS files with CSSTree.

## Inputs

## `css-files`

**Required** The directory in which to look for CSS files

## Outputs

## `validated`

Whether the validator detected any errors.

## Example usage

```js
uses: actions/css-validator-action@1.0.0
with:
    css-files: '/public/css'
```
