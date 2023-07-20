// @mui
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
// routes
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
// utils
// types
// components
import { Chip } from '@mui/material';
import { fCurrency } from '@utils/format-number';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { IProjectItem } from 'src/types/project';

// ----------------------------------------------------------------------

type Props = {
  project: IProjectItem;
  onView: (contractAddress: string) => void;
  onEdit: (contractAddress: string) => void;
  onDelete: (contractAddress: string) => void;
};

export default function ProjectCardItem({ project, onView, onEdit, onDelete }: Props) {
  const popover = usePopover();

  const { name, budget, coverImage, isApproved, contractAddress, description } = project;

  const renderApproval = (
    <Stack
      direction="row"
      alignItems="center"
      component={Chip}
      label={isApproved ? 'Approved' : 'Not Approved'}
      sx={{
        top: 8,
        right: 8,
        zIndex: 9,
        borderRadius: 1,
        position: 'absolute',
        p: '2px 6px 2px 4px',
        typography: 'subtitle2',
        color: isApproved ? 'success' : 'error',
      }}
    />
  );

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        {renderApproval}
        <Image
          alt={coverImage || '/logo/rahat-logo.png'}
          src={coverImage || '/logo/rahat-logo.png'}
          sx={{ borderRadius: 1, height: 164, width: 1 }}
        />
      </Stack>
      {/* <Stack spacing={0.5}>
        <Image alt={images[1]} src={images[1]} ratio="1/1" sx={{ borderRadius: 1, width: 80 }} />
        <Image alt={images[2]} src={images[2]} ratio="1/1" sx={{ borderRadius: 1, width: 80 }} />
      </Stack> */}
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 1.5, 2.5),
      }}
      // primary={`Active date: ${fDate(startDate)} - ${fDate(endDate)}`}
      secondary={
        <Link
          component={RouterLink}
          href={paths.dashboard.general.projects.details(contractAddress)}
          color="inherit"
        >
          {name}
        </Link>
      }
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      {[
        {
          label: `${description}`,
          sx: {
            typography: 'body2',
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
        {
          label: `${fCurrency(budget)}`,
          icon: <Iconify icon="ri:token-swap-line" sx={{ color: 'primary.main' }} />,
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', ...item.sx }}
        >
          {item.icon}
          {item.label}
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      <Card>
        {renderImages}

        {renderTexts}

        {renderInfo}
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView(contractAddress);
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit(contractAddress);
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete(contractAddress);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
