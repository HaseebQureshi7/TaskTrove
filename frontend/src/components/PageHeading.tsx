import { Typography } from "@mui/material";
import Typewriter from "react-ts-typewriter";

function PageHeading({ heading }: { heading: string }) {
  return (
    <Typography variant="h4">
      <Typewriter text={heading} cursor={false} />
    </Typography>
  );
}

export default PageHeading;
