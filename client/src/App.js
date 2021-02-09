import DetailProduct from "./components/body/detailProduct/DetailProduct";
import Products from "./components/body/products/Products";
import {BrowserRouter as Router,Route} from 'react-router-dom'


function App() {
  return (
    <Router>
   
      <Route exact path='/' component={Products} />
      <Route path='/product/:id' component={DetailProduct} />     
    
    </Router>
    
  );
}

export default App;
