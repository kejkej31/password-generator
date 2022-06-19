import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "./theme";
import { useTheme } from "@mui/material/styles";
import { Button, Icon } from "@mui/material";

export default (props: any) => {
  const theme = useTheme();
  return (
    <ColorModeContext.Consumer>
      {({ toggleColorMode }) => {
        return (
          <Button variant="outlined" onClick={toggleColorMode} style={props?.style}>
            {theme.palette.mode} mode
            <Icon sx={{ ml: 1, height: "2.1rem" }} color="inherit">
              {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </Icon>
          </Button>
        );
      }}
    </ColorModeContext.Consumer>
  );
};
