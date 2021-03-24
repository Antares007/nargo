// @flow strict
const http = require("http");
const { Readable, pipeline } = require("stream");

async function* generate() {
  yield "a";
  yield "b";
  yield "c";
}

function resray2(s, h, b) {
  console.log(s, h, this.req.url, b.toString());
  this.oo.res(s, h, b);
}
const ring = (oo, req, nar, ...rest) => {
  nar({ oo, res: resray2, req }, req, ...rest);
};
const server = http.createServer(makeRequestListener(ring, narapp));

server.listen(8080);
function narapp(oo, req) {
  if (req.method === "GET" && req.url === "/") {
    const readable = Readable.from(generate());
    oo.res(200, { "Content-Type": "text/plain" }, readable);
  } else {
    oo.res(404, {}, "");
  }
}
function makeRequestListener(nar, ...rest) {
  return function requestlistener(req, res) {
    const oo = { res: resray, _server: this, _res: res };
    nar(oo, req, ...rest);
  };
}
function resray(s, h, b) {
  const oo = this;
  const r = oo._res;
  if ("string" === typeof b) {
    r.writeHead(s, h);
    r.end(b);
  } else {
    pipeline(b, r, (err) => {
      if (err) r.end(err.message);
      else r.end();
      console.log(arguments);
    });
  }
}
