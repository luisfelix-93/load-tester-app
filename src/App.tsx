import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Início";
import Relatorios from "./pages/Relatorios";
import Loading from "./pages/Loading";
import ErrorPage from "./pages/Error";
import DetalheResumo from "./pages/DetalheResumo";
import Resumo from "./pages/Resumo";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="loading/:testId" element={<Loading />} />
          <Route path="error" element={<ErrorPage/>}/>
          <Route path="resumo" element={<Resumo/>}/>
          <Route path="resumo/:testId" element={<DetalheResumo />} />
        </Route>
      </Routes>
    </Router>
  );
}
