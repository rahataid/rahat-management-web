import Iconify from '@components/iconify';
import Scrollbar from '@components/scrollbar';
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
  { id: 'duration', label: 'Duration', width: 150 },
  { id: 'status', label: 'Status', width: 100 },
  { id: 'attempts', label: 'Attempts', width: 20 },
  { id: 'actions', label: 'Actions', width: 20 },
];

const TABLE_BODY = [
  {
    to: +9771234567890,
    ward: 5,
    date: '17/03/23, 11:50 am',
    durations: '0 seconds',
    status: 'fail',
    attempts: 9,
  },
  {
    to: +9771234567111,
    ward: 4,
    date: '7/03/23, 10:54 am',
    durations: '45 seconds',
    status: 'success',
    attempts: 3,
  },
  {
    to: +9771234567222,
    ward: 1,
    date: '19/05/23, 2:50 pm',
    durations: '0 seconds',
    status: 'fail',
    attempts: 7,
  },
];

export default function CampaignsCallLogsTable() {
  return (
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
          {TABLE_BODY.map((bodyCell) => (
            <TableRow>
              <TableCell>{bodyCell.to}</TableCell>
              <TableCell>{bodyCell.ward}</TableCell>
              <TableCell>{bodyCell.date}</TableCell>
              <TableCell>{bodyCell.durations}</TableCell>
              <TableCell>{bodyCell.status}</TableCell>
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
  );
}
