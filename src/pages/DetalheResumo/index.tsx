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
        <div>
          <h2 className="text-3xl font-bold text-center mb-2">Visão Geral do Teste</h2>
          <p className="text-muted-foreground text-center mb-8">Um resumo do teste de carga executado.</p>
          <ResumoSection
            url={data.url}
            requests={data.requests}
            concurrency={data.concurrency}
            stats={data.stats}
          />
        </div>
      </section>

      {/* Página 2: Gráfico de Status Code */}
      <section className="h-screen snap-start flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold mb-2">Distribuição de Status Codes</h2>
        <p className="text-muted-foreground mb-8">Como a API respondeu a cada requisição.</p>
        <StatusCodeChart result={data.result} />
      </section>

      {/* Página 3: Gráfico de Tempo de Resposta */}
      <section className="h-screen snap-start flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold mb-2">Linha do Tempo de Resposta</h2>
        <p className="text-muted-foreground mb-8">A variação do tempo de resposta ao longo do teste.</p>
        <ResponseTimeChart result={data.result} />
      </section>

      {/* Página 4 */}
      <section className="h-screen snap-start flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold mb-2">Histograma de Tempo de Resposta</h2>
        <p className="text-muted-foreground mb-8">A frequência dos tempos de resposta.</p>
        <ResponseTimeHistogram result={data.result} />
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
              i === currentPage ? "bg-primary w-4 h-4" : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  )
}
