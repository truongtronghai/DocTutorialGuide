# React Testing Setup with Vitest + React Testing Library

## 1. Install Packages

```bash
npm install -D vitest
npm install -D jsdom
npm install -D @testing-library/react
npm install -D @testing-library/user-event
npm install -D @testing-library/jest-dom
```

---

## 2. Configure Vitest

Update `vite.config.js`:

```js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
```

### Notes

* `globals: true` allows usage of:

  * `describe`
  * `it`
  * `expect`
    without importing them.

* `environment: "jsdom"` creates a fake browser environment.

* `setupFiles` points to a setup file that runs before tests.

---

## 3. Create Setup File

Create:

```txt
src/test/setup.js
```

Content:

```js
import "@testing-library/jest-dom";
```

This enables matchers such as:

```js
expect(element).toBeInTheDocument();
expect(button).toBeDisabled();
expect(input).toHaveValue("hello");
```

---

## 4. Add Test Script

Update `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch"
  }
}
```

Run tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

---

# Example 1: Testing a JavaScript Function

## Source File

```txt
src/utils/sum.js
```

```js
export function sum(a, b) {
  return a + b;
}
```

## Test File

```txt
src/utils/sum.test.js
```

```js
import { sum } from "./sum";

describe("sum", () => {
  it("adds two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("adds negative numbers", () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});
```

Run:

```bash
npm run test
```

---

# Example 2: Testing a React Component

## Component

```txt
src/components/Counter.jsx
```

```jsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <span>{count}</span>

      <button
        onClick={() => setCount(c => c + 1)}
      >
        Increment
      </button>
    </>
  );
}
```

---

## Test File

```txt
src/components/Counter.test.jsx
```

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Counter } from "./Counter";

describe("Counter", () => {
  it("increments when clicked", async () => {
    render(<Counter />);

    const button = screen.getByRole("button", {
      name: /increment/i,
    });

    await userEvent.click(button);

    expect(
      screen.getByText("1")
    ).toBeInTheDocument();
  });
});
```

---

# Understanding the Tools

## Vitest

Provides:

```js
describe()
it()
test()
expect()

beforeEach()
afterEach()

vi.fn()
vi.mock()
vi.spyOn()
```

Example:

```js
describe("sum", () => {
  it("works", () => {
    expect(1 + 1).toBe(2);
  });
});
```

---

## React Testing Library

Provides:

```js
render()
screen
```

Example:

```js
render(<Counter />);

screen.getByRole("button");
```

---

## user-event

Provides realistic user interactions:

```js
await userEvent.click(button);

await userEvent.type(input, "hello");

await userEvent.selectOptions(select, "admin");
```

---

## jest-dom

Provides additional matchers:

```js
toBeInTheDocument()
toBeDisabled()
toBeEnabled()
toHaveValue()
toHaveTextContent()
toBeVisible()
```

Example:

```js
expect(button).toBeDisabled();

expect(
  screen.getByText("Success")
).toBeInTheDocument();
```

---

# Recommended Folder Structure

```txt
src/
├── components/
│   ├── Counter.jsx
│   └── Counter.test.jsx
│
├── utils/
│   ├── sum.js
│   └── sum.test.js
│
├── test/
│   └── setup.js
│
└── main.jsx
```

Keep test files next to the files they test.

Examples:

```txt
Button.jsx
Button.test.jsx

useAuth.js
useAuth.test.js

sum.js
sum.test.js
```

This makes tests easy to find and maintain.

---

# Testing Workflow

For React components:

```txt
Render Component
        ↓
Find Element
        ↓
User Interaction
        ↓
Assertion
```

Example:

```js
render(<Counter />);

const button = screen.getByRole("button");

await userEvent.click(button);

expect(
  screen.getByText("1")
).toBeInTheDocument();
```

Read as:

```txt
Render Counter
Find button
Click button
Verify count becomes 1
```

Focus on user behavior rather than implementation details.
