import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Relatorios from "./pages/Relatorios";
import Loading from "./pages/Loading";
import ErrorPage from "./pages/Error";
import DetalheResumo from "./pages/DetalheResumo";
import Resumo from "./pages/Resumo";
import Home from "./pages/Home";
import Teste from "./pages/Teste";
import HCMonitor from "./pages/HC-Monitor";
import HCDetails from "./pages/HC-Details";
import DNSChecker from "./pages/DNS-Checker";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import Settings from "./pages/Settings";

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
          <Route path="endpoint/:endpointId" element={<HCDetails/>} />
          <Route path="dns-checker" element={<DNSChecker />} />
          <Route path="analysis/:id" element={<Analysis />} />
          <Route path="history/:domain" element={<History />} />
          <Route path="settings_smtp" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
