
const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = ";" ;

client.once("ready", () => {
    console.log("Bot online!");
  client.user.setActivity("Verify Bot");
});

client.on("message", async message => {
	
	if(message.content === ";verifyhelp"){
		const embed = new Discord.MessageEmbed()
		.setTitle("Verify Bot Hilfe Seite")
		.setColor("#00F2FF")
		.addField(prefix + "verifyhelp","Sehe die Hilfe Seite")
		.addField(prefix + "verify-setup","Installiere das ") 
		message.channel.send(embed)
	} 
	
	if(message.content === ";verify-setup"){
    if (message.member.permissions.has("KICK_MEMBERS")){
    	let ban = message.guild.roles.cache.find(r => r.name === "✔️Verify");
        if(!ban) {
          message.guild.roles.create({data:{name: "✔️Verify", permissions: 0}, reason: 'Verify Rolle.'});
          message.channel.send("Mache bitte nochmal ;verify-setup. Die Verify Rolle wurde gerade erstellt");
          return
        }
    message.guild.channels.create("✔️Verify", {
    	permissionOverwrites: [
           {
                    id: message.guild.roles.everyone,
                    deny: ["SEND_MESSAGES"]
                },
               {
               	id: ban.id,
                   deny: ["VIEW_CHANNEL"] 
              } 
       ], 
       type: "text"
    	}).then(async channel => {
        	const ticketembed = new Discord.MessageEmbed() 
        .setTitle("BetterVerify")
      .setColor("GREEN") 
     .setDescription("Wenn du alle weiteren chats sehen willst, dann reagiere einfach mit 🟩 .")
     channel.send(ticketembed).then(msg => {
          var msg = msg
          msg.react("✏");
          setTimeout(function() {
          }, 10000)
        })
       })  
		message.author.send("Das Verify System wurde erfolgreich erstellt");
		}else{
			message.channel.send("Du hast keine Rechte fuer denn command");
		} 
	} 
	
	
});

client.on('messageReactionAdd', async (reaction, user) => {
	if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();
  if(user.bot) return;
  let message = reaction.message;
         
  if(!message) return;
          if (reaction.emoji.name === "✏") {
			const guild = reaction.message.guild;
			const member = guild.member(user) || await guild.fetchMember(user);
          	
          	let role = message.guild.roles.cache.find(r => r.name === "✔️Verify");
              member.roles.add(role.id);
             	reaction.users.remove(user.id);
            }else{
          } 
          
});

client.login(TOKEM);
