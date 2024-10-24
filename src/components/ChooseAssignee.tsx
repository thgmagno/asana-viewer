'use client'

import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function ChooseAssignee({ data }: { data: string[] }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams)
    const currentValue = params.get('atribuicao')

    if (newValue === 'todos' || newValue === currentValue) {
      params.delete('atribuicao')
    } else {
      params.set('atribuicao', newValue.toLowerCase())
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select onValueChange={(e) => handleChange(e)}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Filtrar por atribuição" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Colaboradores</SelectLabel>
          <SelectItem value="todos">Todos</SelectItem>
          {data.map((name) => (
            <SelectItem key={name} value={name.split(' ')[0]}>
              {name.split(' ')[0]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
