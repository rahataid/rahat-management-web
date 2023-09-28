'use client';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
// types
//
import { Button, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { RouterLink } from '@routes/components';
import CampaignsService from '@services/campaigns';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';

type MenuOptions = {
  title: string;
  onClick: () => void;
  show: boolean;
  icon?: string;
}[];

const HeaderActions = ({ campaign }: any) => {
  const [isOpen, setOpen] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const triggerCampaign = useMutation({
    mutationFn: async () => {
      const response = await CampaignsService.trigger(params.id);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error Triggering Campaign', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Campaign Triggered Successfully', { variant: 'success' });
    },
  });

  const HandleTrigger = () => {
    if (campaign?.status === 'COMPLETED') {
      enqueueSnackbar('Campaign Already Triggered', { variant: 'warning' });
      return;
    }
    triggerCampaign.mutate();
  };

  const options: MenuOptions = [
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
      onClick: () => {
        HandleTrigger();
      },
      icon: 'grommet-icons:trigger',
      show: true,
    },
  ];

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      <Button
        component={RouterLink}
        href={paths.dashboard.general.campaigns.list}
        variant="outlined"
        startIcon={<Iconify icon="ph:list" />}
        color="success"
      >
        All Campaigns
      </Button>
      <Button
        variant="outlined"
        onClick={handleOpen}
        endIcon={
          isOpen ? <Iconify icon="mingcute:up-line" /> : <Iconify icon="mingcute:down-line" />
        }
      >
        Actions
      </Button>
      <Menu id="simple-menu" anchorEl={isOpen} onClose={handleClose} open={Boolean(isOpen)}>
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
    </Stack>
  );
};

export default HeaderActions;
