'use client';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
// types
//
import {
  Button,
  Card,
  CardContent,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

type MenuOptions = {
  title: string;
  onClick: () => void;
  show: boolean;
  icon?: string;
}[];

const HeaderActions = () => {
  const [isOpen, setOpen] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const params = useParams();

  const rightOptions: MenuOptions = [
    {
      title: 'Edit Campaign',
      onClick: () => {
        router.push(paths.dashboard.general.campaigns.edit(params.id as unknown as number));
      },
      icon: 'tabler:edit',
      show: true,
    },
    {
      title: 'Trigger Campaign',
      onClick: () => {},
      icon: 'grommet-icons:trigger',
      show: true,
    },
  ];
  const leftOptions: MenuOptions = [
    {
      title: 'Beneficiaries',
      onClick: () => {
        router.push(paths.dashboard.general.campaigns.edit(params.id as unknown as number));
      },
      show: true,
    },
    {
      title: 'Vendors',
      onClick: () => {},
      show: true,
    },
  ];

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('event', event);
    setOpen(event.currentTarget);
  }, []);

  const renderOptions = (title: string, options: MenuOptions) => (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        endIcon={
          isOpen ? <Iconify icon="mingcute:up-line" /> : <Iconify icon="mingcute:down-line" />
        }
      >
        {title}
      </Button>
      <Menu
        id={`${title}-menu`}
        title={title}
        anchorEl={isOpen}
        onClose={handleClose}
        open={Boolean(isOpen)}
      >
        {options
          .filter((o) => o.show)
          .map((option) => (
            <MenuItem key={option.title} onClick={option.onClick}>
              <ListItemIcon>{option.icon && <Iconify icon={option.icon} />}</ListItemIcon>
              <Typography variant="body2" color="text.secondary">
                {option.title}
              </Typography>
            </MenuItem>
          ))}
      </Menu>
    </>
  );

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          {renderOptions('Associates List', leftOptions)}
          {renderOptions('Actions', rightOptions)}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default HeaderActions;
