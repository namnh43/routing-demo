import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./page/Home";
import {Admin} from "./page/Admin";
import {ListStudent} from "./page/student/ListStudent";
import {CreateStudent} from "./page/student/CreateStudent";
import {EditStudent} from "./page/student/EditStudent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route path='/' element={<ListStudent/>}/>
          <Route path='/create-student' element={<CreateStudent/>}/>
          <Route path='/students/:id' element={<EditStudent/>}/>
        </Route>
        <Route path='/admin' element={
          <Admin></Admin>
        }/>
      </Routes>
    </div>
  );
}

export default App;
