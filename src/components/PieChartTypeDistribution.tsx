import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { Message } from '@/types'
import { messages } from '../data/messages'

// Подсчет количества сообщений по типам + ошибки
const getChartData = (data: Message[]) => {
  const counts: Record<string, number> = {}

  data.forEach(msg => {
    const type = msg.type.toString()
    if (msg.isError) {
      counts['Ошибки'] = (counts['Ошибки'] || 0) + 1
    } else {
      counts[type] = (counts[type] || 0) + 1
    }
  })

  return Object.entries(counts).map(([name, value]) => ({ name, value }))
}

// Цвета: 0, 1, 2 и Ошибки
const COLORS: Record<string, string> = {
  '0': '#8884d8',
  '1': '#82ca9d',
  '2': '#ffc658',
  'Ошибки': '#8b0000', // тёмно-красный
}

export default function PieChartTypeDistribution() {
  const data = getChartData(messages)

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#ccc'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
