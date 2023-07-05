'use client';

// mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';

export default function TransactionDetailsView() {
    const settings = useSettingsContext();
    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <div>This Is Transaction Details View</div>
        </Container>
    )
}