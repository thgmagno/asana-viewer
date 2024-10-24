import { NotepadText } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { extractOpenedTasks } from '@/lib/helpers/extractOpenedTasks'
import { getAllData } from '@/action'
import Link from 'next/link'

export async function Header() {
  const allData = await getAllData()
  const openedTasks = extractOpenedTasks(allData)

  return (
    <Alert>
      <NotepadText className="h-4 w-4" />
      <AlertTitle>Resumo!</AlertTitle>
      <AlertDescription>
        <div className="flex flex-wrap items-center gap-2">
          <p>Tarefas em aberto: </p>
          <div className="inline-flex rounded-md border bg-zinc-100 p-1">
            {openedTasks.map((task) => (
              <Link
                key={task.month}
                href={{ query: { date: task.slug, status: 'aberto' } }}
                className="rounded-md border-r p-1 last:border-none hover:bg-zinc-200"
              >
                {task.month} <b>({task.total})</b>
              </Link>
            ))}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
