// Source: https://gist.github.com/raw/a3d0bbbff196af633995/0fbdb3ee3d33fb15f90c4891239dc55633bfc0a2/ircd.js
// function Channel (name) {
//   this.name = name;
//   this.topic = null;
//   this.users = [];
// }
// 
// // If a channel object for this channel doesn't exist yet, create it.
// function lookupChannel (name) {
//   if (channels[name]) return channels[name];
//   channels[name] = new Channel(name);
//   return channels[name];
// }
// 
// // broadcast to everyone except the person who sent the message
// Channel.prototype.broadcastEveryoneElse = function (msg, from) {
//   for (var j = 0; j < this.users.length; j++) {
//     var user = this.users[j];
//     if (user == from) continue;
//     user.sendMessage(msg, from);
//   }
// };
// 
// Channel.prototype.broadcast = function (msg, from) {
//   this.broadcastEveryoneElse(msg, from);
//   from.sendMessage(msg, from);
// };
// 
// Channel.prototype.quit = function (user, msg) {
//   for (var i = 0; i < this.users.length; i++) {
//     if (this.users[i] == user) {
//       this.users.splice(i, 1);
//     }
//   }
//   this.broadcast("QUIT :" + (msg || "quit"), user);
// };
// 
// Channel.prototype.privmsg = function (msg, user) {
//   this.broadcastEveryoneElse("PRIVMSG " + this.name + " :" + msg, user);
// };
// 
// Channel.prototype.sendTopic = function (user) {
//   // RPL_TOPIC
//   user.sendMessage("332 " + user.nick + " " + this.name + " :" + topic);
// };
// 
// Channel.prototype.sendNames = function (user) {
//   var startOfNAMREPLY = "353 " + user.nick + " @ " + this.name + " :";
// 
//   // this is to ensure the packet is not too long
//   var packet = new String(startOfNAMREPLY);
//   for (var i = 0; i < this.users.length; i++) {
//     packet += (this.users[i].nick + " ");
//     if (packet.length > 500) {
//       user.sendMessage(packet);
//       packet = new String(startOfNAMREPLY);
//     }
//   }
//   user.sendMessage(packet);
// 
//   // RPL_NAMREPLY
//   user.sendMessage("366 " + user.nick + " " + this.name + " :End of /NAMES list");
// };
// 
// Channel.prototype.sendWho = function (user) {
//   for (var i = 0; i < this.users.length; i++) {
//     var u = this.users[i];
//     user.sendMessage([ "352"
//                      , user.nick
//                      , this.name
//                      , u.names.user
//                      , u.socket.remoteAddress
//                      , serverName
//                      , u.nick
//                      , "@"
//                      , ":0"
//                      , u.names.real
//                      ].join(" "));
//   }
// 
//   // ENDOFWHO
//   user.sendMessage("315 " + user.nick + " " + this.name + " :End of /WHO list");
// };
// 
// Channel.prototype.join = function (user) {
// 
//   debug("JOIN. user list: " + this.inspectUsers());
// 
//   // TODO check to make sure user isn't already in channel.
//   for (var i = 0; i < this.users.length; i++) {
//     if (this.users[i] == user) return false;
//   }
// 
//   // Add user to array
//   this.users.push(user);
// 
//   // Send everyone a message that this user joined.
//   this.broadcast("JOIN :" + this.name, user);
// 
// 
//   this.sendNames(user);
// 
//   this.sendTopic(user);
// 
//   debug("AFTER JOIN. user list: " + this.inspectUsers());
// 
//   return true;
// };
// 
// Channel.prototype.inspectUsers = function () {
//   return inspect(this.users.map(function (user) { return user.nick; }));
// }
// 
// Channel.prototype.part = function (user) {
//   var packet = "PART " + this.name + " :";
// 
//   debug("PART. user list: " + this.inspectUsers());
// 
//   for (var i = 0; i < this.users.length; i++) {
//     if (this.users[i] == user) {
//       this.users.splice(i, 1);
//       user.sendMessage(packet, user);
//       break;
//     }
//   }
// 
//   debug("After PART. user list: " + this.inspectUsers());
// 
//   this.broadcast(packet, user);
// };
// 
// function normalizeChannelName (channelName) {
//   if (channelName) {
//     return channelName.replace(/[^\w]/, "_", "g")
//                       .toLowerCase()
//                       .replace(/^_+/, "#");
//   }
// }
