# Output of rendering/ lifecycle:

**Expected**:

- parent constructor
- parent render
- 1st Child constructor
- 1st Child render
- GrandChild constructor
- GrandChild render
- Grandchild componentDidMount
- 1st child componentDidMount
- 2nd Child constructor
- 2nd Child render
- GrandChild constructor
- GrandChild render
- Grandchild componentDidMount
- 2nd child componentDidMount
- Parent componentDidMount

**Actual :**
- parent constructor
- parent render
- 1st Child constructor
- 1st Child render
- GrandChild constructor
- GrandChild render
- 2nd Child constructor
- 2nd Child render
- GrandChild constructor
- GrandChild render
- Grandchild componentDidMount
- 1st child componentDidMount
- Grandchild componentDidMount
- 2nd child componentDidMount
- Parent componentDidMount

## Why this behaviour?

- Because of the **React lifecycle phases**.

- React rendering happens in **two phases**:
  1. **Render Phase**
  2. **Commit Phase**

- In the **Render Phase**:
  - React only calculates what needs to be displayed.
  - It calls:
    - `constructor()`
    - `render()`

  - React completes the render phase for the **entire component tree first**.
  - It goes from **Parent → Child → GrandChild**.
  - React does **not call `componentDidMount()` immediately after each child render**.

- In the **Commit Phase**:
  - After the complete tree is rendered, React updates the DOM.
  - Then React starts calling `componentDidMount()`.
  - Mounting happens from **deepest child to parent**.
  - Order:
    - GrandChild `componentDidMount()`
    - Child `componentDidMount()`
    - Parent `componentDidMount()`

- That's why React first finishes:
  - Parent constructor/render
  - All children constructor/render
  - All grandchildren constructor/render

- After that, React executes all `componentDidMount()` methods from bottom to top.

- So the actual output is:

  **Render Phase:**

  ```
  Parent constructor
  Parent render

    Child1 constructor
    Child1 render

      GrandChild constructor
      GrandChild render

    Child2 constructor
    Child2 render

      GrandChild constructor
      GrandChild render
  ```

  **Commit Phase:**

  ```
      GrandChild componentDidMount
    Child1 componentDidMount

      GrandChild componentDidMount
    Child2 componentDidMount

  Parent componentDidMount
  ```

- This behaviour improves React performance because React can prepare the complete UI first and then update the DOM in one optimized commit instead of updating after every component.
