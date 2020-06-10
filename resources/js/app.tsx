import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { orange, deepPurple, grey } from '@material-ui/core/colors';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { BrowserRouter as Router } from 'react-router-dom';
import { Dashboard } from '@modules/dashboard/Dashboard';
import DateFnsUtils from '@date-io/date-fns';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: orange,
    text: {
      primary: grey[700],
      secondary: grey[600],
      disabled: grey[500],
      hint: grey[500],
    },
  },
  overrides: {
    MuiContainer: {
      root: {
        maxWidth: '1092px',
        minWidth: '760px',
      },
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Dashboard />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
