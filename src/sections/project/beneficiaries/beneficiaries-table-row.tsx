// @mui
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
// components
import Iconify from 'src/components/iconify';
//
import Label from '@components/label/label';
import { Checkbox } from '@mui/material';
import { IProjectBeneficiariesItem } from 'src/types/project';

// ----------------------------------------------------------------------

type Props = {
  row: IProjectBeneficiariesItem;
  onViewRow: VoidFunction;
};

export default function BeneficiariesTableRow({ row, onViewRow }: Props) {
  const { name, bankStatus, internetAccess, phoneOwnership,isApproved,gender } = row;

  const quickEdit = useBoolean();

  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox/>
      </TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
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

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
      <Label variant="soft">{isApproved}</Label>
        </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
      <ListItemText primary={gender} primaryTypographyProps={{ typography: 'body2' }} />
        </TableCell>

      <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="View Details" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={() => onViewRow()}>
            <Iconify color="#118D57" icon="iconamoon:eye-light" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
