import Scrollbar from '@components/scrollbar/scrollbar';
import { Card, Table, TableBody, TableContainer } from '@mui/material';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  emptyRows,
  useTable,
} from 'src/components/table';
import { IBeneficiaryDetailsTableItem } from 'src/types/beneficiaries';

import BeneficiariesDetailsTableRow from './beneficiaries-details-table-row';

type Props = {
  data: any[];
};

const TABLE_HEAD = [
  {
    id: 'Topic',
    label: 'Topic',
  },
  {
    id: 'Processed By',
    label: 'Processed By',
  },
  { id: 'timestamp', label: 'Timestamp' },
  { id: 'txHash', label: 'Transaction Hash' },
  { id: 'amount', label: 'Amount' },
];

export default function BeneficiariesDetailsTableView({ data }: Props) {
  const table = useTable();
  const denseHeight = table.dense ? 52 : 72;

  const notFound = !data.length;

  return (
    <Card>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={data.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />

            <TableBody>
              {data.map((row: IBeneficiaryDetailsTableItem) => (
                <BeneficiariesDetailsTableRow
                  key={row.hash}
                  row={row}
                  selected={table.selected.includes(row.hash)}
                />
              ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, data.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={data.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </Card>
  );
}
