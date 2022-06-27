import React from "react";
import MUICheckbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControlLabel from '@mui/material/FormControlLabel';

interface CheckBoxProps{
  text: string;
}
const Checkbox = ({text}:CheckBoxProps) => {
  return (
    <Card>
      <CardContent>
      <FormControlLabel control={ <MUICheckbox
          icon={<CircleUnchecked />}
          checkedIcon={<CircleCheckedFilled />}
        />} label={ <Typography variant="h6" component="div">
        {text}
      </Typography>} />
      </CardContent>
    </Card>
  );
};

export default Checkbox;
