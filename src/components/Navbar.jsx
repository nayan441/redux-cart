import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useSelector} from 'react-redux';

export default function ButtonAppBar() {
  let {quantity, total} = useSelector((store) => store.cart)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Shopping Cart
          </Typography>
          <Button color="inherit">$ {total.toFixed(2)}</Button>
          <Button color="inherit"><ShoppingBagIcon/>{quantity}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
