import { ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './table.module.scss'

export type TableProps = ComponentPropsWithoutRef<'table'>

export const Table = forwardRef<HTMLTableElement, TableProps>((props: TableProps, ref) => {
  const { className, ...restProps } = props

  return <table className={`${s.table} ${className ?? ''}`} {...restProps} ref={ref} />
})

export type TableHeadProps = ComponentPropsWithoutRef<'thead'>

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  (props: TableHeadProps, ref) => {
    const { className, ...restProps } = props

    return <thead className={`${s.tableHead} ${className ?? ''}`} {...restProps} ref={ref} />
  }
)

export type TableBodyProps = ComponentPropsWithoutRef<'tbody'>

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props: TableBodyProps, ref) => {
    const { className, ...restProps } = props

    return <tbody className={`${className ?? ''}`} {...restProps} ref={ref} />
  }
)

export type TableRowProps = ComponentPropsWithoutRef<'tr'>

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (props: TableRowProps, ref) => {
    const { className, ...restProps } = props

    return <tr className={`${className ?? ''}`} {...restProps} ref={ref} />
  }
)

export type TableCellProps = ComponentPropsWithoutRef<'th'>

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (props: TableCellProps, ref) => {
    const { className, ...restProps } = props

    return <th className={`${s.tableCell} ${className ?? ''}`} {...restProps} ref={ref} />
  }
)
