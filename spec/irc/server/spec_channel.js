var IRC     = require(path.join(process.cwd(), 'lib', 'irc', 'server')),
    Channel = IRC.Server.Channel;

describe("An IRC channel", function() {
  it("should have a name", function() {
    channel = new Channel("nodejs");
    assertEqual("nodejs", channel.name());
  });
})