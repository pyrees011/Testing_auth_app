import logo from './logo.svg';
import Register from './pages/Register';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
