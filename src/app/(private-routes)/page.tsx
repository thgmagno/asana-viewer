import { getData, getKeys } from '@/action'
import { SelectDate } from '@/components/SelectDate'

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
    </main>
  )
}
