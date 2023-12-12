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
  { id: 'actions', label: 'Actions', width: 20 },
];

const TABLE_BODY = [
  {
    to: +9771234567890,
    ward: 5,
    date: '17/03/23, 11:50 am',
  },
  {
    to: +9771234567111,
    ward: 4,
    date: '7/03/23, 10:54 am',
  },
  {
    to: +9771234567222,
    ward: 1,
    date: '19/05/23, 2:50 pm',
  },
];

export default function CampaignsSMSLogsTable() {
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
