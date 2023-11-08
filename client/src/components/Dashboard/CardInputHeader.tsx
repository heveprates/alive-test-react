import { PropsWithChildren, useState } from 'react';
import {
  Divider,
  Grid,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

type CardHeaderProps = {
  title: string;
  onOk?: () => void;
  onCancel?: () => void;
} & PropsWithChildren;

export default function CardHeader(props: CardHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    props.onCancel?.();
    setAnchorEl(null);
  };

  const handleOk = () => {
    props.onOk?.();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs>
          <Typography variant="h5" component="h5">
            {props.title}
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <IconButton
            aria-label="show inputs"
            size="large"
            onClick={handleOpen}
          >
            <InputIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack p={2} spacing={2}>
          {props.children}
          <Divider flexItem />
          <Stack spacing={0.5} direction="row-reverse">
            <IconButton onClick={handleClose} size="large" aria-label="cancel">
              <CloseIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={handleOk}
              size="large"
              aria-label="ok"
              color="success"
            >
              <DoneIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
}
