import { Card, CardContent, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Panel({ title, children, header, isLoading }) {
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
            height: '56px',
            paddingX: (theme) => theme.spacing(2),
            paddingY: (theme) => theme.spacing(1),
          }}
        >
          <Typography>{title}</Typography>
          {header ? <Box sx={{ flex: '0' }}>{header}</Box> : null}
        </Box>
        <LinearProgress sx={{ opacity: isLoading ? '1' : '0' }} />
        <CardContent sx={{ flex: '1 0 auto' }}>
          {children}
        </CardContent>
      </Box>
    </Card>
  );
}