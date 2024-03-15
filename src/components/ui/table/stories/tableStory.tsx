import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'

export const TableStory = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>
            <Typography variant={'subtitle2'}>Name</Typography>
          </TableHeadCell>
          <TableHeadCell>
            <Typography variant={'subtitle2'}>Name</Typography>
          </TableHeadCell>
          <TableHeadCell>
            <Typography variant={'subtitle2'}>Name</Typography>
          </TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableBodyCell>
            <Typography variant={'body2'}>ACSSSSSSSSSSSSSSSSSSSSSSSSSName</Typography>
          </TableBodyCell>
          <TableBodyCell>
            <Typography variant={'body2'}>Name</Typography>
          </TableBodyCell>
          <TableBodyCell>
            <Typography variant={'body2'}>Name</Typography>
          </TableBodyCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
