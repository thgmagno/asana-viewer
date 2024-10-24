'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CheckCircle, Circle, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { DataTableColumnHeader } from '@/components/dataTable/DataTableColumnHeader'
import { Entity, Task } from '@/lib/types'

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => {
      const value = row.getValue('name') as string
      const truncate = (value: string) =>
        value.split(' ').slice(0, 6).join(' ').concat('...')
      return truncate(value)
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
    cell: ({ row }) => {
      const createdAt = new Date(
        String(row.getValue('created_at')),
      ).toLocaleDateString()
      return <span>{createdAt}</span>
    },
  },
  {
    accessorKey: 'completed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const completed = row.getValue('completed')
      const Icon = completed ? CheckCircle : Circle
      const statusText = completed ? 'Finalizado' : 'Em aberto'

      return (
        <span className="flex items-center gap-1 text-sm">
          <Icon className="h-4 w-4 text-muted-foreground" /> {statusText}
        </span>
      )
    },
  },
  {
    accessorKey: 'assignee',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Atribuição" />
    ),
    cell: ({ row }) => {
      const assignee: Entity = row.getValue('assignee')
      const [firstName = 'N/A', ...rest] = assignee?.name?.split(' ') || []
      const lastName = rest.pop() || ''
      return `${firstName} ${lastName}`
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/geral/${task.gid}`}>Visualizar</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableHiding: false,
  },
]
