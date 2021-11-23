import { AppBar, Card, CardContent, Divider, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Panel({ title, children }) {
  return (
    <Card variant="outlined">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
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
        </Box>
        <CardContent sx={{ flex: '1 0 auto' }}>
          {children}
        </CardContent>
      </Box>
    </Card>
  );
}