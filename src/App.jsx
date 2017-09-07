import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Tasks from './Tasks';

const App = () => (
  <MuiThemeProvider>
    <Tasks />
  </MuiThemeProvider>
);

export default App;
