# 1. Why we **can’t** just add the event listener directly in the component body

React component re‑renders itself whenever its state or props change.  
Every time React re‑renders the component, **all the code inside the function body runs again**.

If you write something like this:

```jsx
function MyComponent() {
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return <div>Hello</div>;
}
```

Then:

- On the first render → one listener is attached ✅
- On the second render (e.g., because a state changed) → **another** listener is attached ❌
- On the third render → yet another… ❌❌

Now you have **multiple copies** of the same listener all firing at once, memory is being wasted, and you can never remove the old ones properly. That’s a bug.

---

### 2. What is `useEffect` and why we use it here

`useEffect` is React’s way of saying:  
_“Run this code **after** the component appears on the screen, and give me a chance to **clean up** when the component disappears or before the effect runs again.”_

It’s the perfect place for “side‑effects” – things that reach outside React, like:

- Talking to the browser (event listeners, timers)
- Fetching data
- Manually changing the DOM

For online/offline detection, we want to:

- **Start listening** when the component first shows up.
- **Stop listening** when the component is removed (so we don’t leave garbage behind).

`useEffect` handles both.

---

### 3. Why the empty array `[]` – running only once

The second argument of `useEffect` is called the **dependency array**.

- If you pass nothing → the effect runs **after every render** (usually not what you want for listeners).
- If you pass `[]` (empty array) → the effect runs **only once**, right after the component first appears (mounts).
- If you pass `[someState]` → the effect runs only when `someState` changes.

For a global online/offline event, we need the listener to be attached **just one time** per component instance.  
That’s exactly what `[]` does: it tells React _“set this up once, and then forget about it until the component dies.”_

When the component unmounts (is removed from the screen), the **cleanup function** returned by the effect runs, and we remove the event listener.  
This way, we never leave a dangling listener.

---

### 4. Putting it all together (the right way)

```jsx
import { useEffect, useState } from 'react';

function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }

    // Attach listeners ONCE when component mounts
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup function: runs when the component unmounts
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // <-- empty array = run only on mount

  return <div>You are {isOnline ? 'online 🟢' : 'offline 🔴'}</div>;
}
```

- The listener is added **only once** (thanks to `[]`).
- If the component is ever removed from the page, the cleanup function **removes** the listener so it doesn’t keep running in the background.
- No duplicates, no memory leaks.

---

That’s the whole reason we use `useEffect` + empty array for global event listeners. You only want to listen **once**, and you want to stop listening when the listener is no longer needed.

## If the effect runs only once, and then never again, how does it still know when the online/offline event happens and update the state ?

Here’s the key point:  
**The event listeners are attached to the browser window only once, but they stay there forever (until you remove them).**  
_They work independently of React’s re-renders._

---

### Let’s break it step by step

1. **Mount:** When the component first appears, `useEffect` runs.  
   It does two things:
   - It creates two functions, `handleOnline` and `handleOffline`.
   - It gives these functions to the browser, saying: _“Hey window, please call `handleOnline` when the internet comes back, and `handleOffline` when it goes down.”_

2. **After mount:** The effect is done. It never runs again because the dependency array is empty `[]`.  
   BUT the browser **still has those two functions**. Every time the network status changes, the browser calls the correct function.

3. **Inside those functions, we call `setIsOnline(true)` or `setIsOnline(false)`.**  
   This `setIsOnline` is the state setter from React. Even though the effect itself is not re-running, the functions inside it **still live** and can still call `setIsOnline` because they “remember” the state setter (thanks to JavaScript closures).

4. **When `setIsOnline` is called,** React re-renders the component with the new state value.  
   The component UI updates. But the event listeners on the window **do not get re-added** (they were already there from step 1). They just keep doing their job.

---

### So in short:

- **Empty dependency array** → effect runs **once**, sets up the listeners.
- **Listeners remain active** and call the state setter when the browser fires the event.
- **State setter triggers re-render**, and the UI updates.
- No need to re‑run the effect because the listeners were already attached and are still there.

That’s why online/offline changes are captured correctly, even though the effect runs only once.
