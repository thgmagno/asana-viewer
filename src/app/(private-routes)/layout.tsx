import { synchronize } from '@/action/services'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await synchronize()

  return <>{children}</>
}
