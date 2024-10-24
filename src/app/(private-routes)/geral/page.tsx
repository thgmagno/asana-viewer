import { getData, getKeys } from '@/action'
import { DataTable } from '@/components/dataTable'
import { SelectDate } from '@/components/SelectDate'
import { columns } from './columns'
import { orderByDateDesc } from '@/lib/helpers/orderByDateDesc'
import { Filters } from './filters'
import { Header } from './header'

export default async function Geral({
  searchParams,
}: {
  searchParams: { date: string; status: string; atribuicao: string }
}) {
  const [keys, data] = await Promise.all([
    getKeys(),
    getData(searchParams.date),
  ])

  const searchStatus = searchParams.status
  const searchAssignee = searchParams.atribuicao

  const ordered = orderByDateDesc(data)
  const filtered = ordered.filter((task) => {
    const assigneeMatches =
      !searchAssignee ||
      String(task.assignee?.name).toLowerCase().startsWith(searchAssignee)

    const statusMatches =
      !searchStatus || task.completed === (searchStatus === 'finalizado')

    return assigneeMatches && statusMatches
  })

  return (
    <main>
      <Header />
      <div className="flex gap-2">
        <SelectDate options={keys} />
        <Filters data={data || []} />
      </div>
      <DataTable columns={columns} data={filtered} />
    </main>
  )
}
