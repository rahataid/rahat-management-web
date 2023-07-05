'use client';

// mui
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
// components
import { useSettingsContext } from 'src/components/settings';

export default function TransactionDetailsView() {
  const { hash } = useParams();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <div>This Is Transaction Details View Of {hash}</div>
    </Container>
  );
}
