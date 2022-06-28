import { makeStyles } from "@material-ui/styles";

/**
 * useJoyRideContentStyles define the styles used inside the
 * JoyrideContent component.
 */
const useJoyrideContentStyles = makeStyles(() => ({
  title: {
    textAlign: "left",
  },
  body: {
    marginTop: "20px",
    textAlign: "left",
  },
}));
export default useJoyrideContentStyles;
