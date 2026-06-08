import { useState } from 'react';

const User = (props) => {
  const { name, location } = props;
  // state variable
  const [count1] = useState(0);
  const [count2] = useState(2);
  return (
    <div className='user-div'>
      <h2>Count1 func :{count1} </h2>
      <h2>Count2 func : {count2}</h2>
      <h2>Name : {name}</h2>
      <h3>Location : {location}</h3>
      <h3>Contact : @adarshjha-exe</h3>
    </div>
  );
};

export default User;
