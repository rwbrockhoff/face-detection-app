import './App.css';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SignIn from './containers/SignIn/SignIn';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <div className="App">
      <Navigation isAuthenticated={isAuthenticated} />
      {isAuthenticated ? <Outlet /> : <SignIn />}
    </div>
  );
}

export default App;
