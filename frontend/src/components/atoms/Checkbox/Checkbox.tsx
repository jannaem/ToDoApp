import React from "react";
import MUICheckbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./CheckboxStyle.css";

interface CheckBoxProps {
  text: string;
  status?: boolean;
}
const Checkbox = ({ text, status }: CheckBoxProps) => {
  return (
    <Card id="card" variant="outlined">
      <CardContent>
        <FormControlLabel
          control={
            <MUICheckbox
              defaultChecked={status}
              icon={<CircleUnchecked />}
              checkedIcon={<CircleCheckedFilled />}
            />
          }
          label={
            <Typography variant="h6" component="div">
              {text}
            </Typography>
          }
        />
      </CardContent>
    </Card>
  );
};

export default Checkbox;
