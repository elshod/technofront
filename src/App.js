import Header from "./components/header";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Mobile from "./components/mobile";
import RouterList from "./RouterList";
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Header/>
        <Nav/>
        <RouterList/>
        <Footer/>
        <Mobile/>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
