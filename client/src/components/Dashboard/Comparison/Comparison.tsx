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
import { useFetchGainLoss } from '../../../services/fetchComparison';
import { useComparison } from '../../../stores/useComparison';
import { currencyFormatter } from '../../../tools/currencyFormatter';

export default function Comparison() {
  const [isLoading, data, removeComparison] = useComparison((state) => [
    state.isLoading,
    state.data,
    state.removeComparison,
  ]);
  const [tickerValue, setTickerValue] = useState<string>('');
  const fetchComparison = useFetchGainLoss();

  const cardInputOkHandler = () => {
    if (tickerValue === '') {
      return;
    }
    setTickerValue('');
    fetchComparison(tickerValue);
  };
  const cardInputCancelHandler = () => {
    setTickerValue('');
  };

  const comparisonList = data ? [...data.values()] : [];
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
        <List>
          {comparisonList.map((item) => (
            <ListItem
              key={'list_item_' + item.id}
              secondaryAction={
                <IconButton
                  onClick={() => removeComparison(item.id)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                {item.isBig ? (
                  <NorthIcon />
                ) : item.isSmall ? (
                  <SouthIcon />
                ) : (
                  <ArrowForwardIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={currencyFormatter(item.price)}
                secondary={item.name}
              />
            </ListItem>
          ))}
          {isLoading ? <Skeleton variant="rounded" height="72px" /> : null}
        </List>
      </Stack>
    </>
  );
}
