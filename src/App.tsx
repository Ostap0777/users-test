
import './App.css';
import { BrowserRouter, Route, Router, Routes,} from 'react-router-dom';
import User from './components/User/User';
import EditUser from './components/EditUser/EditUser';

function App() {
  return (
	<BrowserRouter>
	<Routes>
		<Route path='/' element={<EditUser/>}/>
		<Route path='/user' element={<User/>}/>
	</Routes>
	</BrowserRouter>
  );
}

export default App;
