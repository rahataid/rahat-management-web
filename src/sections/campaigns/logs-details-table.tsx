import Scrollbar from '@components/scrollbar';
import { TableNoData } from '@components/table';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { fDateTime } from '@utils/format-time';

const TABLE_HEAD = [
  { id: 'date', label: 'Date', width: 150 },
  { id: 'duration', label: 'Duration', width: 100 },
  { id: 'type', label: 'Type', width: 100 },
  { id: 'status', label: 'Status', width: 100 },
];

export default function LogsDetailsTable({ data = [] }: any) {
  return (
    <Card>
      <CardHeader title="All Attempts" />
      <CardContent>
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
              {data.length ? (
                data?.map((bodyCell: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{fDateTime(bodyCell?.callDate, 'dd MMM, yyyy p')}</TableCell>
                    <TableCell>
                      {bodyCell.duration} {bodyCell.duration === '1' ? 'second' : 'seconds'}
                    </TableCell>
                    <TableCell>Call</TableCell>
                    <TableCell>
                      <Chip
                        label={bodyCell.disposition === 'ANSWERED' ? 'Success' : 'Fail'}
                        color={bodyCell.disposition === 'ANSWERED' ? 'success' : 'error'}
                        sx={{ fontWeight: 'bold', width: 80 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableNoData notFound={!data.length} />
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </CardContent>
    </Card>
  );
}
