import { ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './table.module.scss'

export type TableProps = ComponentPropsWithoutRef<'table'>

export const Table = forwardRef<HTMLTableElement, TableProps>((props: TableProps, ref) => {
  const { className, ...restProps } = props
  const classNames = clsx(className ?? '', s.table)

  return <table className={classNames} {...restProps} ref={ref} />
})

export type TableHeadProps = ComponentPropsWithoutRef<'thead'>

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  (props: TableHeadProps, ref) => {
    const { className, ...restProps } = props
    const classNames = clsx(className ?? '', s.tableHead)

    return <thead className={classNames} {...restProps} ref={ref} />
  }
)

export type TableBodyProps = ComponentPropsWithoutRef<'tbody'>

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props: TableBodyProps, ref) => {
    const { className, ...restProps } = props
    const classNames = clsx(className ?? '')

    return <tbody className={classNames} {...restProps} ref={ref} />
  }
)

export type TableRowProps = ComponentPropsWithoutRef<'tr'>

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (props: TableRowProps, ref) => {
    const { className, ...restProps } = props
    const classNames = clsx(className ?? '')

    return <tr className={classNames} {...restProps} ref={ref} />
  }
)

export type TableHeadCellProps = ComponentPropsWithoutRef<'th'>

export const TableHeadCell = forwardRef<HTMLTableCellElement, TableHeadCellProps>(
  (props: TableHeadCellProps, ref) => {
    const { className, ...restProps } = props
    const classNames = clsx(s.tableHeadCell, className ?? '')

    return <th className={classNames} {...restProps} ref={ref} />
  }
)

export type TableBodyCellProps = ComponentPropsWithoutRef<'td'>

export const TableBodyCell = forwardRef<HTMLTableCellElement, TableBodyCellProps>(
  (props: TableBodyCellProps, ref) => {
    const { className, ...restProps } = props

    return <td className={`${s.tableBodyCell} ${className ?? ''}`} {...restProps} ref={ref} />
  }
)
