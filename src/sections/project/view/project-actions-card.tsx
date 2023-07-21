'use client';

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
import { useCallback, useState } from 'react';

type MenuOptions = {
  title: string;
  onClick: () => void;
  show: boolean;
  icon?: string;
}[];

interface IHeaderActions {
  leftOptions: MenuOptions;
  rightOptions: MenuOptions;
}

const HeaderActions = ({ leftOptions, rightOptions }: IHeaderActions) => {
  const [isOpen, setOpen] = useState<null | HTMLElement>(null);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('event', event.currentTarget);

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
