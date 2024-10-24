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

export function ChooseStatus() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams)
    const currentValue = params.get('status')

    if (newValue === 'todos' || newValue === currentValue) {
      params.delete('status')
    } else {
      params.set('status', newValue)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select onValueChange={(e) => handleChange(e)}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Filtrar por status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="aberto">Em aberto</SelectItem>
          <SelectItem value="finalizado">Finalizado</SelectItem>
          <SelectItem value="todos">Todos</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
