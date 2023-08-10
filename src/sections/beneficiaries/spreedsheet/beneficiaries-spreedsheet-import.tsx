import Iconify from '@components/iconify/iconify';
import { Button } from '@mui/material';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { fields } from './data-points';

interface IBeneficiariesSpreedsheetImport<T extends Record<string, unknown>> {
  isOpen: boolean;
  onSubmit: (data: any, file: File) => void;
  handleOpenClose: VoidFunction;
}

const BeneficiariesSpreedsheetImport = <T extends Record<string, unknown>>({
  isOpen,
  handleOpenClose,
  onSubmit,
}: IBeneficiariesSpreedsheetImport<T>) => (
  <>
    <Button
      variant="outlined"
      startIcon={<Iconify icon="mingcute:add-line" />}
      color="success"
      onClick={handleOpenClose}
    >
      Upload File
    </Button>

    <ReactSpreadsheetImport
      isOpen={isOpen}
      fields={fields}
      onClose={handleOpenClose}
      onSubmit={onSubmit}
    />
  </>
);

export default BeneficiariesSpreedsheetImport;
