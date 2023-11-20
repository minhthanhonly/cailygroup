import { PublicRoutes } from './routes/routes';
import { config } from './config';

export default function App() {
  return <PublicRoutes routes={config} />;
}
