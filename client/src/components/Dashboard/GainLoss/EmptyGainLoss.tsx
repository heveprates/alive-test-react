import { Typography } from '@mui/material';

export function EmptyGainLoss() {
  return (
    <>
      <Typography
        variant="h6"
        color={(theme) => theme.palette.text.secondary}
        textAlign="center"
      >
        Veja o seu ganho baseado
        <br />
        em uma simulação de compra
      </Typography>
    </>
  );
}
