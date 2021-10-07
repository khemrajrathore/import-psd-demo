import { styled, ThemeProvider, DarkTheme } from "baseui";
import Logo from "./Logo";

const Container = styled("div", (props) => ({
  height: "70px",
  background: props.$theme.colors.background,
  display: "flex",
  padding: "0 2rem",
  justifyContent: "space-between",
  alignItems: "center",
}));

const LogoContainer = styled("div", (props) => ({
  color: props.$theme.colors.primary,
  display: "flex",
  alignItems: "center",
}));

function NavbarEditor() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ display: "flex", gap: "1rem" }}>
          <LogoContainer>
            <Logo size={40} />
          </LogoContainer>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}></div>
      </Container>
    </ThemeProvider>
  );
}

export default NavbarEditor;
