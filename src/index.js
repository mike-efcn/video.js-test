import React from 'react';
import { render } from 'react-dom';
import 'normalize.css/normalize.css';
import './index.css';

(async () => {
  const App = (await import('./App')).default;
  render(<App />, document.getElementById('root'));
})();
