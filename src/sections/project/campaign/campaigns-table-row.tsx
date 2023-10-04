// @mui
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
// types
// components
import Iconify from 'src/components/iconify';
//
import Label from '@components/label/label';
import { Checkbox } from '@mui/material';
import { fDateTime } from '@utils/format-time';
import { ICampaignItem } from 'src/types/campaigns';

// ----------------------------------------------------------------------

type Props = {
  row: ICampaignItem;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;

  onSelectRow: VoidFunction;
  selected: boolean;
};

export default function CampaignsTableRow({
  row,
  onViewRow,
  onEditRow,
  selected,
  onSelectRow,
}: Props) {
  const { name, status, createdAt, totalAudiences, transport, type } = row;

  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell>
        <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {' '}
        <ListItemText
          primary={fDateTime(createdAt, 'dd MMM, yyyy p')}
          primaryTypographyProps={{ typography: 'body2' }}
        />{' '}
      </TableCell>

      <TableCell>
        <Label variant="soft">{type}</Label>
      </TableCell>
      <TableCell>
        {' '}
        <Label variant="soft">{status}</Label>
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {' '}
        <ListItemText primary={transport} primaryTypographyProps={{ typography: 'body2' }} />{' '}
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {' '}
        <ListItemText
          primary={totalAudiences}
          primaryTypographyProps={{ typography: 'body2' }}
        />{' '}
      </TableCell>

      <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="View Details" placement="top" arrow>
          <IconButton color="inherit" onClick={() => onViewRow()}>
            <Iconify color="#118D57" icon="iconamoon:eye-light" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton onClick={onEditRow}>
            <Iconify color="#118D57" icon="material-symbols:edit-sharp" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
