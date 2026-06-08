import User from './User';
import UserClass from './UserClass';
export const About = () => {
  return (
    <div>
      <h1>Welcome to the About Page</h1>
      <User name={'Adarsh Jha func'} location={'BLR func'} />
      <UserClass name={'Adarsh Jha Class'} username={'@adarshjha-exe class'} />
    </div>
  );
};
