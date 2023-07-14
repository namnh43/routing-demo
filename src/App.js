import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./page/Home";
import {Admin} from "./page/Admin";
import {ListTour} from "./page/student/ListTour";
import {CreateTour} from "./page/student/CreateTour";
import {EditTour} from "./page/student/EditTour";
import {DetailTour} from "./page/student/DetailTour";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/tours/' element={<Home/>}>
          <Route path='' element={<ListTour/>}/>
          <Route path='create-tour' element={<CreateTour/>}/>
          <Route path=':id' element={<EditTour/>}/>
          <Route path='detail/:id' element={<DetailTour/>}/>
        </Route>
        <Route path='/admin' element={
          <Admin></Admin>
        }/>
      </Routes>
    </div>
  );
}

export default App;
