import { Card, CardContent, CardHeader, Chip, Stack } from '@mui/material';
import { paths } from '@routes/paths';
import { useRouter } from 'next/navigation';

type Props = {
  projectsInvolved: any;
};

export default function ProjectsInvolved({ projectsInvolved = [] }: Props) {
  const router = useRouter();
  const onProjectClick = (contractAddress: string) =>
    router.push(paths.dashboard.general.projects.details(contractAddress));
  return (
    <Card>
      <CardHeader title="Projects Involved" />
      <CardContent>
        <Stack direction="row" spacing={2}>
          {projectsInvolved.map((project) => (
            <Chip
              variant="outlined"
              onClick={() => onProjectClick(project.contractAddress)}
              label={project.name}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
