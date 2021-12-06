import { Card, CardContent, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Content({ isLoading, children }) {
  if (isLoading) {
    return <Skeleton variant="rectangular" />;
  }

  return children;
}

export default function Panel({ title, children, isLoading, header }) {
  return (
    <Card variant="outlined">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
            color: 'text.secondary',
            '& svg': {
              m: 1.5,
            },
            '& hr': {
              mx: 0.5,
            },
            paddingX: (theme) => theme.spacing(2),
            paddingY: (theme) => theme.spacing(1),
          }}
        >
          <Typography>{title}</Typography>
          {header ? <Box sx={{ flex: '0' }}>{header}</Box> : null}
        </Box>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Content isLoading={isLoading}>{children}</Content>
        </CardContent>
      </Box>
    </Card>
  );
}