import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
//import "bootstrap/dist/js/bootstrap.bundle.min.js"

//  PAGE IMPORT
import SubmitTransaction from './pages/SubmitTransaction'
import Laporan from './pages/Laporan'
import Stok from './pages/Stok'
import Home from "./pages/Home"


function App() {
  
  
  return (
    <div>
      <div id="modal-root"/>
      <Router>
        <Routes>
          <Route path="/laporan" exact element={<Laporan/>}/>
          <Route path='/transaksi' exact element={<SubmitTransaction/>} />
          <Route path="/stok" exact element={<Stok/>} />
          <Route path='/' exact element={<Home/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
