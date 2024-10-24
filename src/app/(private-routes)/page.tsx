import { ForceSync } from '@/components/ForceSync'
import Link from 'next/link'

export default async function Home() {
  return (
    <main>
      <h1>Home</h1>
      <ForceSync />
      <Link href="/geral">Geral</Link>
    </main>
  )
}
