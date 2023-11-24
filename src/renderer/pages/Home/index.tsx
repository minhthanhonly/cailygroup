import { Button } from '../../components/Button';

export const Home = () => {
  return (
    <div>
      <h2>Home page</h2>
      <Button href="/module" color="orange" size="medium" onClick={}>
        Login
      </Button>
    </div>
  );
};
