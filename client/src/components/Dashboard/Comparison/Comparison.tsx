import { useState } from 'react';
import {
  Box,
  Skeleton,
  Stack,
  TextField,
  List,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import CardInputHeader from '../CardInputHeader';

export default function Comparison() {
  const [tickerValue, setTickerValue] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const cardInputOkHandler = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  const cardInputCancelHandler = () => {
    setLoading(false);
  };
  return (
    <>
      <Stack spacing={0.5} height="100%">
        <CardInputHeader
          title="Comparador"
          onCancel={cardInputCancelHandler}
          onOk={cardInputOkHandler}
        >
          <Box width={220}>
            <TextField
              fullWidth
              label="Ticker"
              placeholder="Ticker do ativo"
              value={tickerValue}
              onChange={(el) => setTickerValue(el.target.value.toUpperCase())}
            />
          </Box>
        </CardInputHeader>
        {loading ? (
          <Skeleton variant="rounded" height="100%" />
        ) : (
          <List>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <NorthIcon />
              </ListItemIcon>
              <ListItemText primary="R$ 1.000,00" secondary="GOOGL" />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary="R$ 149,00" secondary="IBM" />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <SouthIcon />
              </ListItemIcon>
              <ListItemText primary="AMZN" secondary="R$ 35,99" />
            </ListItem>
          </List>
        )}
      </Stack>
    </>
  );
}
