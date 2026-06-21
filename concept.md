# component lifting - closure

**Setup:** Maan lo `menus = [A, B, C]` → indices `0, 1, 2`
`useState(0)` → `showIndex = 0`

### Render #1 (page load)

`menus.map((menu, index) => ...)` chal raha hai. Har iteration mein `index` ki **apni alag, fixed value** hoti hai:

| iteration | index | menu | banne wala arrow function                            |
| --------- | ----- | ---- | ---------------------------------------------------- |
| 1st       | `0`   | A    | `() => setShowIndex(0)` — isko **fn0** bol lete hain |
| 2nd       | `1`   | B    | `() => setShowIndex(1)` — **fn1**                    |
| 3rd       | `2`   | C    | `() => setShowIndex(2)` — **fn2**                    |

Yaha samjho key point: jab tum `() => setShowIndex(index)` likhte ho, ye function **us waqt ke `index` ki value apne andar "lock" kar leta hai (closure)**. fn0, fn1, fn2 — teen alag-alag function objects hain, har ek apna khud ka index yaad rakhe hue hai. Koi shared variable nahi hai jo "step" ho raha ho.

Ab teeno `RestaurantCategory` ko prop milta hai:

- A → `setShowIndex` prop = `fn0`
- B → `setShowIndex` prop = `fn1`
- C → `setShowIndex` prop = `fn2`

> ⚠️ Thoda confusing naming hai: child component mein prop ka naam bhi `setShowIndex` hai, but ye **useState ka real setter NAHI hai** — ye wo wrapper function hai jo parent ne banaya tha. Bas naam same hai, cheez alag hai.

### Click hota hai B pe

B wale `RestaurantCategory` instance ka `handleClick` chalta hai:

```js
const handleClick = () => {
  setShowIndex(); // ye is instance ka prop hai = fn1
};
```

`fn1` matlab `() => setShowIndex(1)`. Ye call hote hi andar wala **real** `setShowIndex` (jo parent ke `useState` se aaya) chalta hai value `1` ke saath → React state update schedule karta hai: `showIndex = 1`.

### Render #2 (re-render)

State change hua, parent re-render hua → map **phir se** chalta hai, naye closures banate hain:

- index `0` (A): `0===1` → false
- index `1` (B): `1===1` → **true** ✅
- index `2` (C): `2===1` → false

B expand, A/C collapse.

### TL;DR

Index "step" nahi ho raha — **har card ko apna fixed index closure ke through pehle se mil chuka hota hai jab wo render hua tha.** Click sirf wahi fixed value ko state setter tak pohcha deta hai. Phir state change → re-render → naye closures, naya comparison, jo match kare wahi expand.

Code badhiya hai waise, sirf ek suggestion: prop ka naam `setShowIndex` ki jagah `onExpand` ya `handleCategoryClick` rakh do — confusion kam ho jayega ki ye state setter nahi, sirf callback hai.
