import { getData, getKeys } from '@/action'

export default async function Home({
  searchParams,
}: {
  searchParams: { date: string }
}) {
  const [keys, data] = await Promise.all([
    getKeys(),
    getData(searchParams.date),
  ])

  return <main></main>
}
