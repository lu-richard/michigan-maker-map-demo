import styles from '../styles/app.module.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <p>This is the main page</p>
      <Outlet />
    </>
  )
}

export default App;
