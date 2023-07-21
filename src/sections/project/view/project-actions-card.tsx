'use client';

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
import Iconify from 'src/components/iconify';

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
  const [leftOpen, setLeftOpen] = useState<null | HTMLElement>(null);
  const [rightOpen, setRightOpen] = useState<null | HTMLElement>(null);

  const handleClose = useCallback(() => {
    setLeftOpen(null);
    setRightOpen(null);
  }, []);

  const handleLeftOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (event && event.currentTarget) {
      setLeftOpen(event.currentTarget);
    }
  }, []);

  const handleRightOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (event && event.currentTarget) {
      setRightOpen(event.currentTarget);
    }
  }, []);

  const renderOptions = (title: string, options: MenuOptions, isOpen: any, handleOpen: any) => (
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
      <Menu id={`${title}-menu`} anchorEl={isOpen} open={Boolean(isOpen)} onClose={handleClose}>
        {options
          .filter((o) => o.show)
          .map((option) => (
            <MenuItem
              key={option.title}
              onClick={() => {
                handleClose();
                option.onClick();
              }}
            >
              {option.icon && (
                <ListItemIcon>
                  <Iconify icon={option.icon} />
                </ListItemIcon>
              )}
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
          {renderOptions('Associates List', leftOptions, leftOpen, handleLeftOpen)}
          {renderOptions('Actions', rightOptions, rightOpen, handleRightOpen)}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default HeaderActions;
