import "./App.css";
import ProductPage from "./pages/user/ProductPage";
import {Routes, Route} from 'react-router-dom';
import LandingPage from "./pages/user/LandingPage";

function App() {

  return (<div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/product' element={<ProductPage />} />
        {/* <Route path='/product/:idcategory' element={<ProductPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
