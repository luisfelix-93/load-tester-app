import { Link } from "react-router-dom"

export default function ErrorPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-600">Erro ao buscar resultados</h1>
        <p>Houve um problema ao buscar os dados do teste.</p>
        <Link to="/" className="text-blue-600 underline">Voltar para a página inicial</Link>
      </div>
    </div>
  )
}
