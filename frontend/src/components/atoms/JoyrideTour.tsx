import React from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useTheme } from "@material-ui/core";

type JoyrideTourProps = {
  /**
   * steps of the joyride tour with all it's settings
   */
  steps?: Step[];
  /**
   * run-state of the tour
   */
  run?: boolean;
  /**
   * setter to update the run-state of the tour
   * @param value
   */
  setRun: (value: boolean) => void;
  /**
   * define if the tour should be run in debug mode
   */
  debug?: boolean;
  /**
   * define if the skip-button should be available
   */
  showSkipButton?: boolean;
};

/**
 * JoyrideTour holds the definition as well as the state of a defined tour.
 */
const JoyrideTour = ({
  debug,
  run,
  showSkipButton,
  setRun,
  steps = [],
}: JoyrideTourProps) => {
  const theme = useTheme();
  const handleJoyrideCallback = ({ status }: CallBackProps) => {
    // Define all statuses when the joyride should stop running.
    const stopStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (stopStatuses.includes(status)) {
      setRun(false);
    }
  };

  return (
    <Joyride
      run={run}
      steps={steps}
      debug={debug}
      continuous
      showSkipButton={showSkipButton}
      callback={handleJoyrideCallback}
      locale={{
        last: "End Tour",
        skip: "Skip",
        back: "Go back to last step",
        next: "Go to next step",
      }}
      styles={{
        options: {
          arrowColor: theme.palette.common.white,
          primaryColor: theme.palette.secondary.main,
          textColor: theme.palette.primary.dark,
          width: 500,
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 0,
        },
        buttonNext: {
          backgroundColor: theme.palette.secondary.main,
          border: "none",
          outline: "none",
          padding: "6px 16px 6px 16px",
          textTransform: "uppercase",
          borderRadius: 0,
          fontFamily: theme.typography.fontFamily,
          fontSize: "14px",
          lineHeight: "1.75",
          color: theme.palette.common.white,
          /* @ts-ignore */
          "&:focus": {
            outline: "none !important",
          },
        },
        buttonBack: {
          color: theme.palette.primary.dark,
          marginLeft: "auto",
          outline: "none",
          padding: "6px 16px 6px 16px",
          textTransform: "uppercase",
          fontFamily: theme.typography.fontFamily,
          fontSize: "14px",
          lineHeight: "1.75",
          marginRight: 5,
        },
        buttonClose: {
          display: "none",
        },
        buttonSkip: {
          color: theme.palette.primary.dark,
          marginLeft: "auto",
          outline: "none",
          padding: "6px 16px 6px 16px",
          textTransform: "uppercase",
          fontFamily: theme.typography.fontFamily,
          fontSize: "14px",
          lineHeight: "1.75",
          marginRight: 5,
        },
      }}
    />
  );
};

export default JoyrideTour;
