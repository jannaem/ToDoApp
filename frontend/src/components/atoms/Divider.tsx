import React from "react";
import { Grid, Divider as MuiDivider } from "@material-ui/core";
import "./Divider.css";

interface DividerProps{
  children?: React.ReactNode;
}
const Divider = ({ children, ...props }: DividerProps) => (
  <Grid container alignItems="center" spacing={3} {...props} id={"divider"}>
    <Grid item xs={true}>
      <MuiDivider />
    </Grid>
    <Grid item id={"text"}>{children}</Grid>
    <Grid item xs={ true}>
      <MuiDivider />
    </Grid>
  </Grid>
);

export default Divider;