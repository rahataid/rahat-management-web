import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Iconify from 'src/components/iconify';

const CampaignReportPhoneTable = ({ data = [] }: any) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Phone Number</TableCell>
          <TableCell>Call Date</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Attempts</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length &&
          data?.map((row: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{row?.phoneNumber}</TableCell>
              <TableCell>{row?.callDate}</TableCell>
              <TableCell>{row?.duration} second</TableCell>
              <TableCell>
                {' '}
                {row?.disposition === 'ANSWERED' ? (
                  <Button style={{ color: 'white', backgroundColor: 'green' }}>
                    {row?.disposition}
                  </Button>
                ) : (
                  <Button style={{ color: 'white', backgroundColor: 'red' }}>
                    {row?.disposition}
                  </Button>
                )}
              </TableCell>
              <TableCell>{row?.attempts}</TableCell>
              <TableCell>
                <Button>
                  <Iconify icon="solar:eye-bold" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CampaignReportPhoneTable;
