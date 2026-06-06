import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Something went wrong....</h1>
      <p>
        {error.status} - {error.statusText}
      </p>
    </div>
  );
};

export default Error;
