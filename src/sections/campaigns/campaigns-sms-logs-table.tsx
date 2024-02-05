import Scrollbar from '@components/scrollbar';
import { TableNoData } from '@components/table';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { fDateTime } from '@utils/format-time';

const TABLE_HEAD = [
  { id: 'to', label: 'To', width: 150 },
  { id: 'date', label: 'Date', width: 150 },
];

export default function CampaignsSMSLogsTable({ data = [] }: any) {
  return (
    <>
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
            {data?.map((bodyCell: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{bodyCell.audience?.details?.phone}</TableCell>
                <TableCell>{fDateTime(bodyCell.createdAt, 'dd MMM, yyyy p')}</TableCell>
              </TableRow>
            ))}
            <TableNoData notFound={!data?.length} />
          </TableBody>
        </Table>
      </Scrollbar>
    </>
  );
}
