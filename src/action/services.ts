'use server'

import { Task } from '@/lib/types'
import { kv } from '@vercel/kv'
import moment from 'moment'
import { axios } from '@/lib/axios'
import { env } from 'root/env'

export async function populateDatabase(data: Task[]) {
  const saveTasksByMonth = async (array: Task[]) => {
    const tasksByMonth = array.reduce(
      (acc, obj) => {
        const year = moment(obj.created_at).year()

        if (year >= 2024) {
          const month = moment(obj.created_at).format('YYYY-MM')
          const key = `asana-api-${month}`

          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(obj)
        }

        return acc
      },
      {} as Record<string, Task[]>,
    )

    for (const [key, value] of Object.entries(tasksByMonth)) {
      await kv.set(key, value)
    }
  }

  await saveTasksByMonth(data)
}

export async function synchronize() {
  const isSync = await kv.get('asana-api-sync')

  if (!isSync) {
    const response = await axios.get(env.API_URL)
    const { data }: { data: Task[] } = JSON.parse(response.data)

    const twelveHours = 12 * 60 * 60

    await Promise.all([
      kv.set('asana-api-sync', { ttl: twelveHours }),
      populateDatabase(data),
    ])
  }

  return null
}

export async function forceSynchronize() {
  return kv.del('asana-api-sync').then(() => synchronize())
}
