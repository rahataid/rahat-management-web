import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { IBeneficiaryDetailsTableItem } from 'src/types/beneficiaries';

type Props = {
  selected: boolean;
  row: IBeneficiaryDetailsTableItem;
};

export default function BeneficiaryDetailsTableRow({ row, selected }: Props) {
  const { timestamp, hash, event, amount } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell>
        <ListItemText primary={timestamp} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={hash} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={event} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <ListItemText primary={amount} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>
    </TableRow>
  );
}
