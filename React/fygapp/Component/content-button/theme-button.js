import { ThemeContext } from "./theme";

function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button 
        {...props} 
        style={{ backgroundColor: theme.background }} />
      )}
    </ThemeContext.Consumer>
  );
}
