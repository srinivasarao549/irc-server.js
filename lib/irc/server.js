var tcp = require("tcp");

exports.Server = Server = function() {
  this.properties = {};
  this.properties.port = 6667;
  this.server = tcp.createServer(function(socket) {
    socket.setEncoding("utf8");
    socket.addListener("eof", function() {
      socket.close();
    });
  });
}

Server.prototype.start = function() {
  this.server.listen(this.properties.port);
}

Server.prototype.stop = function() {
  this.server.close();
}

Server.Channel = require("./server/channel").Channel;

// Source: https://gist.github.com/raw/a3d0bbbff196af633995/0fbdb3ee3d33fb15f90c4891239dc55633bfc0a2/ircd.js
// port = 6667;
// serverName = "irc.nodejs.org";
// topic = "node.js ircd https://gist.github.com/a3d0bbbff196af633995";
// 
// tcp = require("tcp");
// sys = require("sys");
// 
// channels = {};
// users = {};
// 
// server = tcp.createServer(function (socket) {
//   socket.setTimeout(2 * 60 * 1000); // 2 minute idle timeout
//   socket.setEncoding("utf8");
//   debug("Connection " + socket.remoteAddress);
// 
//   var user = new User(socket);
//   var buffer = "";
// 
//   // note all these try-catches are just to avoid the server crashing during
//   // the demo. in real-life you would want to test away these problems.
//   // (We're adding on having a high-level "catch all uncaught exceptions"
//   // feature soon, which would also solve this proble.)
// 
//   socket.addListener("receive", function (packet) {
//     try {
//       buffer += packet;
//       var i;
//       while (i = buffer.indexOf("\r\n")) {
//         if (i < 0) break;
//         var message = buffer.slice(0, i);
//         if (message.length > 512) {
//           user.quit("flooding");
//         } else {
//           buffer = buffer.slice(i+2);
//           user.parse(message);
//         }
//       }
//     } catch (e) {
//       puts("uncaught exception!");
//     }
//   });
// 
//   socket.addListener("eof", function (packet) {
//     try {
//       user.quit("connection reset by peer");
//     } catch (e) {
//       puts("uncaught exception!");
//     }
//   });
// 
//   socket.addListener("timeout", function (packet) {
//     try {
//       user.quit("idle timeout");
//     } catch (e) {
//       puts("uncaught exception!");
//     }
//   });
// });
// 
// server.listen(port);
// puts("irc.js on port " + port);
// 
// repl = require("repl");
// repl.start("ircd> ");