const Koa = require('koa');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const App = () => {
  const [value, setValue] = React.useState(0);
  return (
    <button style={{ fontSize: 96 }} onClick={() => setValue(value + 1)}>
      👍<sup>{value}</sup>
    </button>
  );
};

new Koa()
  .use(async (ctx) => {
    ctx.body = `
      <div id="app">${ReactDOMServer.renderToString(<App />)}</div>
    `;
  })
  .listen();
