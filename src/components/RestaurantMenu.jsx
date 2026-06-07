import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [resMenu, setResMenu] = useState([]);
  async function fetchRestaurantMenu() {
    const data = await fetch(
      `https://proxy.corsfix.com/?https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.7333148&lng=76.7794179&restaurantId=${id}`,
    );
    const jsonData = await data.json();
    console.log(jsonData);
    setResMenu(jsonData);
  }

  useEffect(() => {
    fetchRestaurantMenu();
  }, []);

  if (resMenu.length === 0) {
    return <p>Loading.....</p>;
  }

  const name = resMenu?.data?.cards[2]?.card?.card?.info?.name;
  const resMenuCards =
    resMenu?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR.cards[2]?.card
      .card.itemCards;
  console.log(resMenuCards);

  return (
    <div>
      <h1>{name + ' Menu'}</h1>
      {resMenuCards &&
        resMenuCards.map((resCard) => {
          return (
            <li key={resCard.card.info.id}>
              {resCard.card.info.name} - ₹{resCard.card.info.defaultPrice / 100}
            </li>
          );
        })}
    </div>
  );
};

export default RestaurantMenu;
/**
Render mechanism :
component has two phases:

1. **Initial Render** (empty state)
2. **Re-render** (after API data arrives)

---

## Before component starts

You import hooks:

```jsx
import { useEffect, useState } from 'react';
```

React now knows you want:

* `useState` → remember data between renders
* `useEffect` → run side effects after render

---

# 🔥 FIRST RENDER

React calls your component function:

```jsx
const RestaurantMenu = () => {
```

Think:

```text
React: "Give me JSX. I am executing your function."
```

---

## Step 1: useState runs

```jsx
const [resMenu, setResMenu] = useState([]);
```

React creates state.

Memory:

```text
resMenu = []
```

Now:

```js
setResMenu
```

is a function that can update this value later.

Current situation:

```text
React memory:

resMenu ----> []
```

---

## Step 2: Function declaration

React sees:

```jsx
async function fetchRestaurantMenu() {
   ...
}
```

Nothing happens.

Important:

Defining function ≠ executing function

Example:

```js
function hello(){
 console.log("hi")
}
```

No output until:

```js
hello()
```

So API not called yet.

---

## Step 3: useEffect registered

React reaches:

```jsx
useEffect(() => {
  fetchRestaurantMenu();
}, []);
```

React says:

> "Okay, after I finish painting UI, I will execute this."

It does NOT run immediately.

---

## Step 4: name calculation

Now:

```jsx
const name = resMenu?.data?.cards[2]?.card?.card?.info?.name;
```

Currently:

```js
resMenu = []
```

So:

```js
[].data
```

doesn't exist.

Because of optional chaining:

```js
?.
```

No crash.

Result:

```js
name = undefined
```

---

## Step 5: menu calculation

```jsx
const resMenuCards =
    resMenu?.data?.cards[5]
```

Again:

```js
resMenu = []
```

Result:

```js
resMenuCards = undefined
```

---

## Step 6: console

```jsx
console.log(resMenuCards);
```

prints:

```text
undefined
```

---

## Step 7: condition check

```jsx
if (resMenu.length === 0) {
    return <p>Loading.....</p>;
}
```

Current:

```js
resMenu = []
```

so:

```js
resMenu.length
```

is:

```js
0
```

condition:

```js
0 === 0
```

true ✅

React returns:

```html
<p>Loading.....</p>
```

Browser shows:

```
Loading.....
```

---

# Browser painted UI

Now first render finished.

After render React runs:

```jsx
useEffect(() => {
 fetchRestaurantMenu();
}, []);
```

---

# 🔥 API CALL STARTS

Now this function executes:

```jsx
async function fetchRestaurantMenu()
```

---

## Step 8: fetch

```js
const data = await fetch(url);
```

JavaScript waits.

Meanwhile UI:

```
Loading.....
```

continues showing.

After response:

```js
data = Response object
```

Example:

```js
{
 status:200,
 body:ReadableStream
}
```

---

## Step 9: Convert JSON

```js
const jsonData = await data.json();
```

Response becomes object:

```js
{
 data:{
   cards:[...]
 }
}
```

---

## Step 10: Update state

```js
setResMenu(jsonData);
```

Huge moment 🔥

You are telling React:

> "Change my state"

Before:

```js
resMenu = []
```

After:

```js
resMenu = {
 data:{
  cards:[]
 }
}
```

Whenever state changes:

```
STATE UPDATE
      |
      v
RE-RENDER
```

---

# 🔥 SECOND RENDER

React again calls:

```jsx
RestaurantMenu()
```

from the top.

---

## Step 11: useState again

```jsx
const [resMenu,setResMenu]=useState([])
```

This time React says:

"I already have updated value"

So:

```js
resMenu =
{
 data:{
   cards:[]
 }
}
```

Not:

```js
[]
```

---

## Step 12: useEffect

```jsx
useEffect(()=>{
 fetchRestaurantMenu();
},[])
```

Will it call API again?

No ❌

Because dependency array:

```js
[]
```

means:

> only after first render

---

## Step 13: name extraction

Now:

```js
const name =
resMenu?.data?.cards[2]?.card?.card?.info?.name;
```

Data exists.

Result:

```js
name = "KFC"
```

---

## Step 14: menu extraction

```js
const resMenuCards =
resMenu?.data?.cards[5]
...
.itemCards;
```

Now:

```js
resMenuCards = [
 {
  card:{
    info:{
      id:1,
      name:"Burger",
      price:12000
    }
  }
 }
]
```

---

## Step 15: Loading check again

```jsx
if(resMenu.length===0)
```

Now:

```js
resMenu = {}
```

Objects don't have length.

```js
resMenu.length
```

is:

```js
undefined
```

Check:

```js
undefined === 0
```

false

So continue.

---

# Step 16: JSX returned

```jsx
return (
<div>
<h1>{name+" Menu"}</h1>
```

Output:

```html
KFC Menu
```

---

Then:

```jsx
resMenuCards.map()
```

Loop starts.

Example:

```js
[
 Burger,
 Pizza,
 Fries
]
```

becomes:

```html
<li>Burger - ₹120</li>

<li>Pizza - ₹200</li>

<li>Fries - ₹80</li>
```

---

# Complete lifecycle picture

```
RestaurantMenu called
          |
          v
useState([])
          |
          v
resMenu = []
          |
          v
JSX Loading
          |
          v
Browser Paint
          |
          v
useEffect runs
          |
          v
API call
          |
          v
setResMenu(data)
          |
          v
STATE CHANGE
          |
          v
Component re-render
          |
          v
resMenu has data
          |
          v
Display Menu
```

This exact pattern is called **Render → Commit → Effect → State Update → Re-render** and it is the foundation behind React hooks.

 */
