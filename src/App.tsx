import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Início";
import Relatorios from "./pages/Relatorios";
import Resumo from "./pages/Resumo";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="resumo/:testId" element={<Resumo />} />
        </Route>
      </Routes>
    </Router>
  );
}
