import Scrollbar from '@components/scrollbar';
import { TablePaginationCustom, useTable } from '@components/table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

const TABLE_HEAD = [
  { id: 'to', label: 'To', width: 150 },
  // { id: 'ward', label: 'Ward', width: 20 },
  { id: 'date', label: 'Date', width: 150 },
  // { id: 'actions', label: 'Actions', width: 20 },
];

export default function CampaignsSMSLogsTable({ data = [] }: any) {
  const table = useTable();
  return (
    <>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEAD.map((headCell) => (
                <TableCell key={headCell.id} width={headCell.width}>
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((bodyCell: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{bodyCell.audience?.details?.phone}</TableCell>
                {/* <TableCell>{bodyCell.audience?.details?.ward ?? '-'}</TableCell> */}
                <TableCell>{bodyCell.audience?.details?.smsDate ?? '-'}</TableCell>
                {/* <TableCell>
                  <Tooltip title="View Details">
                    <IconButton>
                      <Iconify color="#118D57" icon="iconamoon:eye-light" />
                    </IconButton>
                  </Tooltip>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePaginationCustom
        count={data?.length || 0}
        page={table.page}
        rowsPerPage={table?.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </>
  );
}
