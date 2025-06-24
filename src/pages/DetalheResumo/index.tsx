import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTestResults } from "@/api/loadtester"
import { saveAs } from "file-saver"
import { Button } from "@/components/ui/button"
import ResumoSection from "@/components/ResumoSection"
import StatusCodeChart from "@/components/StatusCodeChart"
import ResponseTimeChart from "@/components/ResponseTimeChart"
import { cn } from "@/lib/utils"
import ResponseTimeHistogram from "@/components/ResponseTimeHistogram"
import AverageTimeByStatusChart from "@/components/AverageTimeByStatusChart"

export default function DetalheResumo() {
  const { testId } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const fetchResults = async () => {
      if (!testId) return
      const result = await getTestResults(testId)
      if (result) setData(result)
      setLoading(false)
    }
    fetchResults()
  }, [testId])

  const exportToJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    saveAs(blob, `load-test-${data._id}.json`)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const index = Math.round(e.currentTarget.scrollTop / window.innerHeight)
    setCurrentPage(index)
  }

  if (loading) return <p className="text-center mt-8">Carregando...</p>
  if (!data) return <p className="text-center mt-8 text-red-500">Resultados não encontrados.</p>

  return (
    <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory" onScroll={handleScroll}>
      {/* Página 1: Resumo */}
      <section className="h-screen snap-start flex items-center justify-center px-4">
        <ResumoSection
          url={data.url}
          requests={data.requests}
          concurrency={data.concurrency}
          stats={data.stats}
        />
      </section>

      {/* Página 2: Gráfico de Status Code */}
      <section className="h-screen snap-start flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold mb-4">Status Code por Requisição</h2>
        <StatusCodeChart result={data.result} />
      </section>

      {/* Página 3: Gráfico de Tempo de Resposta */}
      <section className="h-screen snap-start flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold mb-4">Tempo de Resposta por Requisição</h2>
        <ResponseTimeChart result={data.result} />
      </section>

      {/* Página 4 */}
      <section className="h-screen snap-start flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold mb-4">Histograma do Tempo de Resposta</h2>
        <ResponseTimeHistogram result={data.result} />
      </section>
      {/* Exportar botão fixo */}
      <div className="fixed bottom-4 right-4 z-10">
        <Button onClick={exportToJson}>Exportar como JSON</Button>
      </div>

      {/* Página 5 */}
      <section className="h-screen snap-start flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold mb-4">Tempo Médio de Requisição por Status Code</h2>
        <AverageTimeByStatusChart result={data.result} />
      </section>

      {/* Exportar botão fixo */}
      <div className="fixed bottom-4 right-4 z-10">
        <Button onClick={exportToJson}>Exportar como JSON</Button>
      </div>

      {/* Indicador de página */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              i === currentPage ? "bg-blue-500 w-4 h-4" : "bg-gray-400"
            )}
          />
        ))}
      </div>
    </div>
  )
}
