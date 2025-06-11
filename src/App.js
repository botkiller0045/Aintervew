import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Interview from './Pages/Interview';
import Feedback from './Pages/Feedback';
import Home from './Pages/Home';

function App() {
    return (
		<h1 className="bg-red-400">
			<Navbar/>

			<div className='h-[4rem] bg-richblack-900 -z-10'>

			</div>
			<Routes>
				<Route path='/sign_up'
					element={<SignUp/>}
				/>

				<Route path='/log_in'
					element={<LogIn/>}
				/>	

				<Route path='/dashboard'
					element={<Dashboard/>}
				/>

				<Route path='/interview/:id'
					element={<Interview/>}
				/>

				<Route path='/feedback/:id'
					element={<Feedback/>}
				/>

				<Route path='/'
					element={<Home/>}
				/>
			</Routes>
		</h1>
    );
}

export default App;
