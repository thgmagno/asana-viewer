'use server'

import { Task } from '@/lib/types'
import { kv } from '@vercel/kv'
import { redirect } from 'next/navigation'

export async function getData(key?: string) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
  const defaultKey = `${currentYear}-${currentMonth}`

  const data: Task[] | null = await kv.get(`asana-api-${key ?? defaultKey}`)
  return data
}

export async function getKeys() {
  const keys = await kv
    .keys('*')
    .then((keys) =>
      keys
        .filter((key) => key !== 'asana-api-sync')
        .map((key) => key.slice(10)),
    )

  return keys
}

export async function getAllData(): Promise<Task[] | []> {
  const keys = await getKeys()
  const allData = await Promise.all(
    keys.map((key) => kv.get(`asana-api-${key}`)),
  )

  return allData.flat() as Task[]
}

export async function getDataById(id: string) {
  const data = (await getAllData()).filter((dt) => dt.gid === id)[0]

  if (!data) redirect('/geral')

  return data
}
