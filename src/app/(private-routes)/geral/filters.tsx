'use client'

import { ChooseAssignee } from '@/components/ChooseAssignee'
import { ChooseStatus } from '@/components/ChooseStatus'
import { extractAssignees } from '@/lib/helpers/extractAssignees'
import { Task } from '@/lib/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  data: Task[]
}

export function Filters({ data }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const haveSearch =
    searchParams.get('status') || searchParams.get('atribuicao')

  const handleClear = () => {
    replace(pathname)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <ChooseStatus />
      <ChooseAssignee data={extractAssignees(data)} />
      {haveSearch && (
        <button onClick={handleClear} className="text-sm">
          Limpar filtros
        </button>
      )}
    </div>
  )
}
