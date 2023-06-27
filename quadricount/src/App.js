import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from './Test';
import ViewQuadriPages from './views/ViewQuadriPages';
import CreateQuadriPage from './views/CreateQuadriPage';
import Container from 'react-bootstrap/Container';
import ViewOneQuadriPage from './views/ViewOneQuadriPage';

function App() {
  return (
    
    <div className="App">
      <Container>
        <BrowserRouter>
            <Routes>
              <Route path="/header" element={ <Test /> }/>
              <Route path="/list" element={ <ViewQuadriPages/> }/>
              <Route path="/create-new-count" element={ <CreateQuadriPage /> }/>
              <Route path="/quadricount/:id" element={ <ViewOneQuadriPage /> }/>

            </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
