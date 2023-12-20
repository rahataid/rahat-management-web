import Scrollbar from '@components/scrollbar';
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

const TABLE_HEAD = [
  { id: 'date', label: 'Date', width: 150 },
  { id: 'duration', label: 'Duration', width: 100 },
  { id: 'type', label: 'Type', width: 100 },
  { id: 'status', label: 'Status', width: 100 },
];

const data = [
  {
    date: '29 Nov, 2023',
    duration: 5,
    type: 'Call',
    status: 'Success',
  },
  {
    date: '8 Jan, 2023',
    duration: 0,
    type: 'Call',
    status: 'Fail',
  },
  {
    date: '15 Sep, 2023',
    duration: 16,
    type: 'Call',
    status: 'Success',
  },
];

export default function LogsDetailsTable() {
  return (
    <Card>
      <CardHeader title="All Logs" />
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
              {data.length &&
                data?.map((bodyCell: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{bodyCell.date}</TableCell>
                    <TableCell>{bodyCell.duration} seconds</TableCell>
                    <TableCell>{bodyCell.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={bodyCell.status}
                        color={bodyCell.status === 'Success' ? 'success' : 'error'}
                        sx={{ fontWeight: 'bold', width: 80 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </CardContent>
    </Card>
  );
}
