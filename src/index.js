import React from 'react';
import ReactDOM from 'react-dom';
import Tasks from './Tasks';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Tasks />, document.getElementById('root'));
registerServiceWorker();
