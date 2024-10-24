import { Task } from '../types'

export const extractOpenedTasks = (data: Task[] | null) => {
  if (!data) return []

  // Filtra tarefas que estão abertas
  const openedTasks = data.filter((task) => !task.completed)

  const monthlyCounts: { [key: string]: { count: number; slug: string } } = {}

  openedTasks.forEach((task) => {
    // Tenta criar uma nova data e verifica se é válida
    const createdAt = new Date(task.created_at)
    if (isNaN(createdAt.getTime())) {
      console.warn(`Data inválida: ${task.created_at}`)
      return // Ignora tarefas com data inválida
    }

    // Formata a data para obter o mês e ano
    const month = createdAt.toLocaleString('pt-BR', {
      month: 'short',
      year: '2-digit',
    })

    const year = createdAt.getFullYear()
    const monthNumber = String(createdAt.getMonth() + 1).padStart(2, '0') // Adiciona zero à esquerda
    const slug = `${year}-${monthNumber}`

    // Incrementa a contagem mensal
    if (!monthlyCounts[month]) {
      monthlyCounts[month] = { count: 0, slug }
    }
    monthlyCounts[month].count++
  })

  // Retorna um array de objetos com mês e total
  return Object.entries(monthlyCounts).map(([month, { count, slug }]) => ({
    month,
    total: count,
    slug,
  }))
}
