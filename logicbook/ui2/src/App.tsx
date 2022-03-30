import Routes from './Routes';
import { BrowserRouter } from "react-router-dom";
import StoreProvider from './store';

function App() {
  return (
    <div>
      <StoreProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;
