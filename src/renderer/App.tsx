import { PublicRoutes } from './router';
import { config } from './router/router';

export default function App() {
  return <PublicRoutes routes={config} />;
}
