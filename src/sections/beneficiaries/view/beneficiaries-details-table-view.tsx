import Scrollbar from '@components/scrollbar/scrollbar';
import { Card, Table, TableBody, TableContainer } from '@mui/material';
import { useState } from 'react';
import {
    TableEmptyRows,
    TableHeadCustom,
    TableNoData,
    TablePaginationCustom,
    emptyRows,
    useTable,
} from 'src/components/table';
import { IBeneficiaryDetailsTableItem, IBeneficiaryDetailsTableList } from 'src/types/beneficiaries';

import BeneficiariesDetailsTableRow from './beneficiaries-details-table-row';

type Props = {
  data: IBeneficiaryDetailsTableList;
};

const TABLE_HEAD = [
  { id: 'timestamp', label: 'Timestamp' },
  { id: 'hash', label: 'Transaction Hash' },
  { id: 'event', label: 'Event' },
  { id: 'amount', label: 'Amount' },
];

export default function BeneficiariesDetailsTableView({ data }: Props) {
  const table = useTable();
  const [tableData, setTableData] = useState(data);
  const dataFiltered = tableData;
  const denseHeight = table.dense ? 52 : 72;

  const notFound = !dataFiltered.length;

  return (
    <Card>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row: IBeneficiaryDetailsTableItem) => (
                  <BeneficiariesDetailsTableRow
                    key={row.hash}
                    row={row}
                    selected={table.selected.includes(row.hash)}
                  />
                ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={dataFiltered.length}
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
