import { useState } from "react";
import ThemeWithDarkMode from "./components/theme/theme";
import ColorModeToggler from "./components/theme/ColorModeToggler";
import Button from "./components/form/Button";
import Input from "./components/form/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Animator from "./components/Animator";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);

  const generatePassword = () => {
    var result = "";
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^%&*()-_+=[];{}<>";
    let charactersSet = "";
    if (useUppercase) {
      charactersSet += letters.toUpperCase();
    }
    if (useLowercase) {
      charactersSet += letters.toLowerCase();
    }
    if (useNumbers) {
      charactersSet += numbers;
    }
    if (useSymbols) {
      charactersSet += symbols;
    }
    for (let i = 0; i < passwordLength; i++) {
      result += charactersSet.charAt(Math.floor(Math.random() * charactersSet.length));
    }
    setPassword(result);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  const checkboxes = [
    { variable: useUppercase, stateSetter: setUseUppercase, label: "Uppercase" },
    { variable: useLowercase, stateSetter: setUseLowercase, label: "Lowercase" },
    { variable: useNumbers, stateSetter: setUseNumbers, label: "Numbers" },
    { variable: useSymbols, stateSetter: setUseSymbols, label: "Symbols" },
  ];

  return (
    <ThemeWithDarkMode>
      <CssBaseline />
      <nav style={{ padding: 20, textAlign: "right" }}>
        <ColorModeToggler />
      </nav>
      <Container maxWidth="sm">
        <Grid sx={{ ml: -2, px: 2, py: 3, width: "calc(100% + 16px)" }} component={Paper} container columnSpacing={1}>
          <Grid item xs={12}>
            <h2 style={{ marginTop: 0 }}>Your password</h2>
          </Grid>
          <Grid item xs={8} sm={10}>
            <Input
              sx={{ width: "100%" }}
              label="Password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid sx={{ display: "flex" }} item xs={4} sm={2}>
            <Animator
              animationProps={{ animation: "spin", duration: 700 }}
              component={
                <IconButton sx={{ m: "auto 0" }} onClick={generatePassword}>
                  <AutorenewIcon />
                </IconButton>
              }
            />

            <IconButton sx={{ m: "auto 0" }} onClick={copyPassword}>
              <ContentCopyIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/**
         * Second row of form
         */}
        <Grid component={Paper} sx={{ mt: 2, px: 2, pt: 1, pb: 3 }} container spacing={2}>
          <Grid item xs={12}>
            <h2 style={{ marginTop: 0 }}>Settings</h2>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={3} sm={2}>
              <Input
                label="Length"
                size="small"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPasswordLength(isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value));
                }}
                value={passwordLength}
              />
            </Grid>
            <Grid item xs={9} sm={10}>
              <Slider
                name="length"
                min={0}
                max={50}
                step={1}
                onChange={(event) => {
                  // @ts-ignore
                  setPasswordLength(parseInt(event.target?.value ?? 0));
                }}
                value={passwordLength}
              />
            </Grid>
          </Grid>
          <Grid item sx={{ justifyContent: "space-between" }} component={FormGroup} xs={12}>
            {checkboxes.map((checkbox) => {
              return (
                <FormControlLabel
                  key={checkbox.label}
                  label={checkbox.label}
                  control={
                    <Checkbox
                      checked={checkbox.variable}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        checkbox.stateSetter(event.target.checked)
                      }
                    ></Checkbox>
                  }
                ></FormControlLabel>
              );
            })}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button sx={{ mr: 2 }} onClick={generatePassword}>
              Generate
            </Button>
            <Button onClick={copyPassword}>Copy</Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeWithDarkMode>
  );
}

export default App;
