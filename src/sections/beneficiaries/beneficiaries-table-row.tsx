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
import { IBeneficiariesItem } from 'src/types/beneficiaries';

// ----------------------------------------------------------------------

type Props = {
  row: IBeneficiariesItem;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  selected: boolean;
};

export default function BeneficiariesTableRow({
  row,
  onViewRow,
  onEditRow,
  selected,
  onSelectRow,
}: Props) {
  const { name, bankStatus, internetAccess, phoneOwnership, projects } = row;

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
          primary={projects || 'N/A'}
          primaryTypographyProps={{ typography: 'body2' }}
        />
        {/* <Label variant="soft">{projects || 'N/A'}</Label> */}
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {' '}
        <Label variant="soft">{internetAccess}</Label>
      </TableCell>

      <TableCell>
        <Label variant="soft">{phoneOwnership}</Label>
      </TableCell>
      <TableCell>
        <Label variant="soft">{bankStatus}</Label>
      </TableCell>

      <TableCell sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="View Details" placement="top" arrow>
          <IconButton onClick={onViewRow}>
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
