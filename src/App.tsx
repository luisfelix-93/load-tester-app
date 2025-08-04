import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Teste";
import Relatorios from "./pages/Relatorios";
import Loading from "./pages/Loading";
import ErrorPage from "./pages/Error";
import DetalheResumo from "./pages/DetalheResumo";
import Resumo from "./pages/Resumo";
import Home from "./pages/Home";
import Teste from "./pages/Teste";
import HCMonitor from "./pages/HC-Monitor";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="loadtest" element={<Teste/>}/>
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="loading/:testId" element={<Loading />} />
          <Route path="error" element={<ErrorPage/>}/>
          <Route path="resumo" element={<Resumo/>}/>
          <Route path="resumo/:testId" element={<DetalheResumo />} />
          <Route path="monitor" element={<HCMonitor/>} />
          <Route path="monitor/:endpointId" element={<HCMonitor/>} />
        </Route>
      </Routes>
    </Router>
  );
}
