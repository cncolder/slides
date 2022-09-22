const Koa = require('koa');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const App = () => {
  const [value, setValue] = React.useState(0);
  return React.createElement(
    'button',
    { style: { fontSize: 256 }, onClick: () => setValue(value + 1) },
    '👍',
    React.createElement('sup', null, value)
  );
};

new Koa()
  .use(async (ctx) => {
    ctx.body = `
      <div id="app">${ReactDOMServer.renderToString(<App />)}</div>
      <script type="module">
        import React from "https://esm.sh/react";
        import { hydrateRoot } from "https://esm.sh/react-dom/client";
        hydrateRoot(document.getElementById("app"), React.createElement(${App}));
      </script>
    `;
  })
  .listen();
