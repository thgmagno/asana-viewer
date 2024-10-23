import { getData, getKeys } from '@/action'
import { DataTable } from '@/components/dataTable'
import { SelectDate } from '@/components/SelectDate'
import { columns } from './columns'

export default async function Home({
  searchParams,
}: {
  searchParams: { date: string }
}) {
  const [keys, data] = await Promise.all([
    getKeys(),
    getData(searchParams.date),
  ])

  return (
    <main>
      <SelectDate options={keys} />
      <DataTable columns={columns} data={data || []} />
    </main>
  )
}
