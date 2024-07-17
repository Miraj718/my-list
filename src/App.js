import './App.css';
import Edit from './components/Edit';
import Form from './components/Form';
import Home from './components/Home';
import Listdata from './components/Listdata';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from 'react-router-dom';




function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
        <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/form' element={<Form />}></Route>
          <Route exact path='/listdata' element={<Listdata/>}></Route>
          <Route exact path='/edit/:id' element={<Edit />}></Route>
        </Routes>
      </Router>


    </>
  );
}

export default App;
