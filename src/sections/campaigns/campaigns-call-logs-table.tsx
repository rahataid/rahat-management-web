import Iconify from '@components/iconify/iconify';
import Scrollbar from '@components/scrollbar';
import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { useParams, useRouter } from '@routes/hook';
import { paths } from '@routes/paths';

const TABLE_HEAD = [
  { id: 'to', label: 'To', width: 150 },
  { id: 'date', label: 'Date', width: 150 },
  { id: 'duration', label: 'Duration', width: 100 },
  { id: 'status', label: 'Status', width: 100 },
  { id: 'attempts', label: 'Attempts', width: 20 },
  { id: 'actions', label: 'Actions', width: 20 },
];

export default function CampaignsCallLogsTable({ data = [] }: any) {
  const { push } = useRouter();
  const params = useParams();

  const handleViewLogDetail = (campaignId: string, logId: number) => {
    push(paths.dashboard.general.campaigns.logDetails(campaignId, logId));
  };
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
              data?.map((bodyCell: any, index: number) => (
                <TableRow key={bodyCell.id}>
                  <TableCell>{bodyCell.phoneNumber}</TableCell>
                  <TableCell>{bodyCell.callDate}</TableCell>
                  <TableCell>{bodyCell.duration}</TableCell>
                  <TableCell>
                    <Chip
                      label={bodyCell.disposition === 'ANSWERED' ? 'Success' : 'Fail'}
                      color={bodyCell.disposition === 'ANSWERED' ? 'success' : 'error'}
                      sx={{ fontWeight: 'bold', width: 80 }}
                    />
                  </TableCell>
                  <TableCell>{bodyCell.attempts}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton onClick={() => handleViewLogDetail(params.logId, index)}>
                        <Iconify color="#118D57" icon="iconamoon:eye-light" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </>
  );
}
