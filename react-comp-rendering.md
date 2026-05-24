# React Mapping & Component Rendering

## STEP 1: JSX with Map

```js
<div id='body-res-container'>
  {resData.map((restaurant) => (
    <RestaurantCard restaurantData={restaurant} />
  ))}
</div>
```

### Internally

```js
React.createElement(
  'div',
  {id='body-res-container'},
  resData.map((restaurant) => {
    return React.createElement(RestaurantCard, {
      restaurantData: restaurant,
    });
  }),
);
```

### This part:

```js
resData.map((restaurant) => {
  return React.createElement(RestaurantCard, {
    restaurantData: restaurant,
  });
});
```

### Returns:

```js
[
  React.createElement(RestaurantCard, {
    restaurantData: { id: 1, name: 'KFC' },
  }),

  React.createElement(RestaurantCard, {
    restaurantData: { id: 2, name: 'Dominos' },
  }),
];
```

---

## STEP 2: React Receives Array as CHILDREN of Div

> **Very important:** This array is NOT passed to `RestaurantCard`.  
> Instead it becomes children of `<div>`.

### Equivalent to:

```js
React.createElement('div', {id='body-res-container'}, [
  React.createElement(RestaurantCard, {
    restaurantData: { id: 1, name: 'KFC' },
  }),

  React.createElement(RestaurantCard, {
    restaurantData: { id: 2, name: 'Dominos' },
  }),
]);
```

---

## STEP 3: React Renders Each Component One by One

### React sees:

```js
[
  <RestaurantCard ... />,
  <RestaurantCard ... />
]
```

### Then React internally does something like:

```js
RestaurantCard({
  restaurantData: { id: 1, name: 'KFC' },
});

RestaurantCard({
  restaurantData: { id: 2, name: 'Dominos' },
});
```

### Now your component runs:

```js
const RestaurantCard = (props) => {
  console.log(props);
};
```

### Console outputs:

**1st console:**

```js
{
  restaurantData: { id: 1, name: 'KFC' }
}
```

**2nd console:**

```js
{
  restaurantData: { id: 2, name: 'Dominos' }
}
```
