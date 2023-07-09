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
import { IVendorItem } from 'src/types/vendors';

// ----------------------------------------------------------------------

type Props = {
  row: IVendorItem;
  onViewRow: VoidFunction;
};

export default function VendorTableRow({ row, onViewRow }: Props) {
  const { name, phone, projectInvolved } = row;

  const quickEdit = useBoolean();

  // const popover = usePopover();

  return (
    <TableRow hover>
      {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

      <TableCell>
        <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={projectInvolved} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={phone} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Details" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={() => onViewRow()}>
            <Iconify icon="iconamoon:eye-light" />
          </IconButton>
        </Tooltip>

        {/* <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}
      </TableCell>
    </TableRow>
  );
}
