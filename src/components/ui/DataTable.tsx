import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Button } from './Button'

export interface DataTableColumn<T> {
  key: string
  header: string
  cell: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  getRowId: (row: T) => string
  empty?: ReactNode
  className?: string
  caption?: string
}

/** Structural data table shell — no sorting/filtering yet. */
export function DataTable<T>({
  columns,
  rows,
  getRowId,
  empty,
  className,
  caption,
}: DataTableProps<T>) {
  if (rows.length === 0 && empty) {
    return <>{empty}</>
  }

  return (
    <div className={cn('overflow-x-auto rounded-[var(--radius-lg)] border border-border', className)}>
      <table className="w-full min-w-[36rem] border-collapse text-left text-small">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="bg-surface-muted">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  'border-b border-border px-4 py-3 font-semibold text-foreground',
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowId(row)} className="bg-surface hover:bg-surface-muted/60">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn('border-b border-border px-4 py-3 text-foreground-secondary', column.className)}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  previousLabel: string
  nextLabel: string
  className?: string
}

/** Pagination shell — wire to real data in later milestones. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  previousLabel,
  nextLabel,
  className,
}: PaginationProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <p className="text-small text-foreground-secondary">
        {page} / {pageCount}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          {previousLabel}
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}
