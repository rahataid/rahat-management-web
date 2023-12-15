import Iconify from '@components/iconify';
import Label from '@components/label/label';
import Scrollbar from '@components/scrollbar';
import { TablePaginationCustom, useTable } from '@components/table';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

const TABLE_HEAD = [
  { id: 'to', label: 'To', width: 150 },
  { id: 'ward', label: 'Ward', width: 20 },
  { id: 'date', label: 'Date', width: 150 },
  { id: 'duration', label: 'Duration', width: 100 },
  { id: 'status', label: 'Status', width: 100 },
  { id: 'attempts', label: 'Attempts', width: 20 },
  { id: 'actions', label: 'Actions', width: 20 },
];

export default function CampaignsCallLogsTable({ data = [] }: any) {
  const table = useTable();
  return (
    <>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEAD?.map((headCell) => (
                <TableCell key={headCell.id} width={headCell.width}>
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length &&
              data?.map((bodyCell: any) => (
                <TableRow key={bodyCell.id}>
                  <TableCell>{bodyCell.phoneNumber}</TableCell>
                  <TableCell>{bodyCell.ward}</TableCell>
                  <TableCell>{bodyCell.callDate}</TableCell>
                  <TableCell>{bodyCell.duration}</TableCell>
                  <TableCell>
                    {/* <Button
                    variant="contained"
                    color={bodyCell.disposition === 'NO ANSWER' ? 'error' : 'success'}
                  >
                    {bodyCell.disposition === 'NO ANSWER' ? 'fail' : 'success'}
                  </Button> */}
                    <Label variant="soft">{bodyCell.disposition}</Label>
                  </TableCell>
                  <TableCell>{bodyCell.attempts}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton>
                        <Iconify color="#118D57" icon="iconamoon:eye-light" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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
