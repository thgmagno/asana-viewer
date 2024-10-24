'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function SelectDate({ options }: { options: string[] }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
  const defaultValue =
    searchParams.get('date') || `${currentYear}-${currentMonth}`

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('pt-br', {
      month: 'short',
      year: '2-digit',
    }).format(
      new Date(Number(date.slice(0, 4)), Number(date.slice(5, 7)) - 1, 1),
    )

  const handleChange = (newValue: string) => {
    setOpen(false)
    const params = new URLSearchParams(searchParams)
    if (newValue === defaultValue) {
      setValue(defaultValue)
      params.delete('date')
      return replace(pathname)
    } else {
      setValue(newValue)
      params.set('date', newValue)

      replace(`${pathname}?${params.toString()}`)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? formatDate(options.find((option) => option === value) as string)
            : 'Data...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar data..." />
          <CommandList>
            <CommandEmpty>Não há resultados.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={handleChange}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {formatDate(option)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
