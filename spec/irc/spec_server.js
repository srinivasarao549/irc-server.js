var IRC     = require(path.join(process.cwd(), 'lib', 'irc', 'server')),
    Server = IRC.Server;

describe("An IRC server", function() {
  it("should listen on port 6667 by default", function() {
    var tcp             = require("tcp"),
        checkedForError = false,
        server          = new Server();
    server.start();

    var client = tcp.createConnection(6667);
    client.setTimeout(1000);
    client.addListener("connect", function() {
      client.close();
    });
    client.addListener("close", function(error) {
      checkedForError = true;
      assert(!error);
    });

    setTimeout(function() { server.stop() }, 1000);
    setTimeout(function() { assert(checkedForError) }, 1500);
  });
})