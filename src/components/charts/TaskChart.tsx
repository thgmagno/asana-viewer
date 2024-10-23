'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'

const chartData = [
  { month: '05/2021', carlos: 17, higor: 4, thiago: 0 },
  { month: '06/2021', carlos: 20, higor: 4, thiago: 0 },
  { month: '07/2021', carlos: 13, higor: 1, thiago: 0 },
  { month: '08/2021', carlos: 5, higor: 2, thiago: 0 },
  { month: '09/2021', carlos: 12, higor: 5, thiago: 0 },
  { month: '10/2021', carlos: 20, higor: 0, thiago: 0 },
  { month: '11/2021', carlos: 3, higor: 4, thiago: 0 },
  { month: '12/2021', carlos: 0, higor: 3, thiago: 0 },
  { month: '01/2022', carlos: 0, higor: 1, thiago: 0 },
  { month: '02/2022', carlos: 1, higor: 0, thiago: 0 },
  { month: '05/2022', carlos: 1, higor: 2, thiago: 2 },
  { month: '06/2022', carlos: 6, higor: 2, thiago: 1 },
  { month: '07/2022', carlos: 2, higor: 1, thiago: 0 },
  { month: '08/2022', carlos: 5, higor: 3, thiago: 0 },
  { month: '09/2022', carlos: 3, higor: 2, thiago: 1 },
  { month: '10/2022', carlos: 1, higor: 2, thiago: 0 },
  { month: '11/2022', carlos: 2, higor: 0, thiago: 1 },
  { month: '12/2022', carlos: 8, higor: 2, thiago: 0 },
  { month: '02/2023', carlos: 6, higor: 2, thiago: 0 },
  { month: '03/2023', carlos: 24, higor: 23, thiago: 0 },
  { month: '04/2023', carlos: 4, higor: 3, thiago: 0 },
  { month: '05/2023', carlos: 34, higor: 10, thiago: 1 },
  { month: '06/2023', carlos: 34, higor: 18, thiago: 2 },
  { month: '07/2023', carlos: 17, higor: 8, thiago: 1 },
  { month: '08/2023', carlos: 4, higor: 2, thiago: 0 },
  { month: '09/2023', carlos: 3, higor: 4, thiago: 2 },
  { month: '10/2023', carlos: 11, higor: 1, thiago: 0 },
  { month: '11/2023', carlos: 5, higor: 0, thiago: 1 },
  { month: '12/2023', carlos: 5, higor: 1, thiago: 0 },
  { month: '01/2024', carlos: 24, higor: 6, thiago: 0 },
  { month: '02/2024', carlos: 4, higor: 0, thiago: 1 },
  { month: '03/2024', carlos: 13, higor: 4, thiago: 1 },
  { month: '04/2024', carlos: 9, higor: 1, thiago: 5 },
  { month: '05/2024', carlos: 6, higor: 1, thiago: 1 },
  { month: '06/2024', carlos: 0, higor: 14, thiago: 3 },
  { month: '07/2024', carlos: 29, higor: 2, thiago: 19 },
  { month: '08/2024', carlos: 10, higor: 2, thiago: 11 },
  { month: '09/2024', carlos: 10, higor: 1, thiago: 12 },
  { month: '10/2024', carlos: 4, higor: 5, thiago: 8 },
]

const chartConfig = {} satisfies ChartConfig

export function TaskChart() {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="carlos"
          stroke="#4bc0c0"
          fillOpacity={0.2}
        />
        <Line
          type="monotone"
          dataKey="higor"
          stroke="#ff6384"
          fillOpacity={0.2}
        />
        <Line
          type="monotone"
          dataKey="thiago"
          stroke="#36a2eb"
          fillOpacity={0.2}
        />
      </LineChart>
    </ChartContainer>
  )
}
