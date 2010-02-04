var IRC     = require(path.join(process.cwd(), 'lib', 'irc', 'server')),
    Channel = IRC.Server.Channel;

describe("An IRC channel", function() {
  it("should have a name", function() {
    var channel = new Channel("nodejs");
    assertEqual("nodejs", channel.name());
  });

  it("should require a name to be specified at creation", function() {
    assertThrow("A channel needs a name", function() {
      var channel = new Channel();
    });
  });
})