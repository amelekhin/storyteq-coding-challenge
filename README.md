# Storyteq Coding Challenge
## Project Setup

The `npm init vue@latest` script was used to bootstrap the project. There are no third-party dependencies used in this project, except the ones that are added by the init script.

- Built with Vue 3 and Composition API
- Written in TypeScript
- Uses Pinia for state management.


### Install dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


## Data

- A city is represented by a `string`
- A book is represented by a `BookEntity`
```typescript
interface BookEntity {
  title: string;
  author: string;
}
```

There are two Pinia stores:

- `books` – contains a list of `BookEntity` objects that represent books
- `cities` – contains a list of strings that represent cities.

## Components

### SearchBox

Implements an autocomplete box that searches over a dataset of unknown type. It accepts a `data` prop, 
which is an array of items of unknown type, and a `getKey` function, which generates a string 
key from an item. If `getKey` is not defined, `String` is used to produce such a key for convenience 
when data is represented by primitive types.

SearchBox uses `getKey` to filter out only those items that match the value in the text input.

The data items and the first parameter of `getKey` is of `unknown` type because [it's not currently possible](https://github.com/vuejs/core/issues/3102) to implement a generic-typed component with the Composition API in a straightforward and convenient way.

It also accepts a slot which accepts an item from the dataset and represents an item in the results list, 
in case when an item is represented by an object. If the slot is not passed, a `String(dataItem)` is rendered as an item of the results list.

### BookSearchBoxItem

Represents an item of the `BookEntity` type. Renders its title and author.

