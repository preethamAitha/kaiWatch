import { ThemeProvider, CssBaseline, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { toggleTheme } from "../store/themeSlice";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import type { ReactNode } from "react";

type ThemeWrapperProps = {
  children: ReactNode;
};

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch: AppDispatch = useDispatch();

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      {/* <Button
        variant="contained"
        onClick={() => dispatch(toggleTheme())}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          borderRadius: 2,
        }}
      >
        Toggle Theme
      </Button> */}
    </ThemeProvider>
  );
};
