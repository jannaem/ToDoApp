import React from "react";
import { Typography } from "@material-ui/core";
import useJoyrideContentStyles from "./JoyrideContentStyle";

/**
 * JoyrideContentProps define the accepted properties on the JoyrideContent
 * component.
 */
type JoyrideContentProps = {
  /**
   * title of the joyride-step
   */
  title: string;
  /**
   * body of the joyride step
   */
  body: string;
};

/**
 * JoyrideContent component represents the card that is shown on each stop in
 * a Joyride tour.
 */
const JoyrideContent = ({ title, body }: JoyrideContentProps) => {
  const classes = useJoyrideContentStyles();

  return (
    <div>
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
      <Typography className={classes.body} variant="body1">
        {body}
      </Typography>
    </div>
  );
};

export default JoyrideContent;
