import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTestResults } from "@/api/loadtester"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ResponseTimeChart from "@/components/ResponseTimeChart"
import StatusCodeChart from "@/components/StatusCodeChart"

export default function Resumo() {
  const { testId } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      if (!testId) return
      const result = await getTestResults(testId)
      if (result) setData(result)
      setLoading(false)
    }
    fetchResults()
  }, [testId])

  if (loading) return <p className="text-center mt-8">Carregando...</p>
  if (!data) return <p className="text-center mt-8 text-red-500">Resultados não encontrados.</p>

  const { url, requests, concurrency, stats, result } = data

  // Função utilitária para evitar erro de null
  const formatValue = (value: number | null) => {
    return value !== null ? value.toFixed(3) : '-'
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Resumo do Teste</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Teste</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>URL:</strong> {url}</p>
          <p><strong>Número de requisições:</strong> {requests}</p>
          <p><strong>Concorrência:</strong> {concurrency}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Status</h3>
            <p><strong>Sucesso:</strong> {stats.successCount}</p>
            <p><strong>Falhas:</strong> {stats.failedCount}</p>
            <p><strong>Requests por segundo:</strong> {stats.requestsPerSecond?.toFixed(2)}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tempo Total</h3>
            <p><strong>Mínimo:</strong> {stats.totalTime.min}s</p>
            <p><strong>Médio:</strong> {formatValue(stats.totalTime.avg)}s</p>
            <p><strong>Máximo:</strong> {stats.totalTime.max}s</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Time to First Byte</h3>
            <p><strong>Mínimo:</strong> {stats.timeToFirstByte.min !== null ? `${stats.timeToFirstByte.min}s` : '-'}</p>
            <p><strong>Médio:</strong> {formatValue(stats.timeToFirstByte.avg)}s</p>
            <p><strong>Máximo:</strong> {stats.timeToFirstByte.max !== null ? `${stats.timeToFirstByte.max}s` : '-'}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Time to Last Byte</h3>
            <p><strong>Mínimo:</strong> {stats.timeToLastByte.min !== null ? `${stats.timeToLastByte.min}s` : '-'}</p>
            <p><strong>Médio:</strong> {formatValue(stats.timeToLastByte.avg)}s</p>
            <p><strong>Máximo:</strong> {stats.timeToLastByte.max !== null ? `${stats.timeToLastByte.max}s` : '-'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gráficos do Teste</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Status Code por Requisição</h3>
            <StatusCodeChart result={result} />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Tempo de Resposta por Requisição</h3>
            <ResponseTimeChart result={result} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
