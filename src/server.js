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
  this.o.res(s, h, b);
}
const ring = (o, req, nar, ...rest) => {
  nar({ o, res: resray2, req }, req, ...rest);
};
const server = http.createServer(makeRequestListener(ring, narapp));

server.listen(8080);
function narapp(o, req) {
  if (req.method === "GET" && req.url === "/") {
    const readable = Readable.from(generate());
    o.res(200, { "Content-Type": "text/plain" }, readable);
  } else {
    o.res(404, {}, "");
  }
}
function makeRequestListener(nar, ...rest) {
  return function requestlistener(req, res) {
    const o = { res: resray, _server: this, _res: res };
    nar(o, req, ...rest);
  };
}
function resray(s, h, b) {
  const o = this;
  const r = o._res;
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
