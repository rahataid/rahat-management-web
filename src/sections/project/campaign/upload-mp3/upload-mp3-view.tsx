'use client';

import { useCallback, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
// routes
import { paths } from 'src/routes/paths';
// utils
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { Button } from '@mui/material';
import { RouterLink } from '@routes/components';
import { useCampaignFileUpload } from 'src/api/campaigns';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';

// ----------------------------------------------------------------------

export default function UploadView() {
  const preview = useBoolean();
  const uploadMP3 = useCampaignFileUpload();

  const [files, setFiles] = useState<(File | string)[]>([]);

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('file', file);
      });
      console.log(formData);
      await uploadMP3.mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <CustomBreadcrumbs
          heading="Campaign: Upload Mp3"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Campaign', href: paths.dashboard.general.campaigns.list },
            { name: 'Upload Mp3' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.general.campaigns.list}
              variant="outlined"
              startIcon={<Iconify icon="ph:list" />}
              color="success"
            >
              All Campaigns
            </Button>
          }
        />
      </Container>

      <Container sx={{ my: 10 }}>
        <Stack spacing={5}>
          <Card>
            <CardHeader
              title="Upload MP3"
              action={
                <FormControlLabel
                  control={<Switch checked={preview.value} onClick={preview.onToggle} />}
                  label="Show Thumbnail"
                />
              }
            />
            <CardContent>
              <Upload
                multiple
                thumbnail={preview.value}
                files={files}
                onDrop={handleDropMultiFile}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={handleUpload}
              />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
