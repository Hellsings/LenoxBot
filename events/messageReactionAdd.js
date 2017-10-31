const Discord = require('discord.js');
exports.run = (client, messageReaction, user) => {
	const trello = client.trello;
	if (messageReaction.message.channel.id === '372404583005290508') {
		if (messageReaction.emoji.name === '👍' && messageReaction.count === 2) {
			  var space = ' ';
			var text = messageReaction.message.cleanContent.split(space);

			var title = [];
			var context = [];
			for (var i = 0; i < text.length; i++) {
				if (text.indexOf('|') === i) {
					var xxx = i;
				} else if (i >= xxx) {
					context.push(text[i]);
				} else {
				title.push(text[i]);
			}
			}
			trello.addCard(title.join(' '), `**Proposal:** \n${context.join(' ')}`, '59ee178659ed95c44773d308',
			function (error, trelloCard) {
				if (error) {
					console.log(error);
					return messageReaction.message.channel.send('Error');
				}
				else {
					const archiv = client.channels.get('372404644623810560');
					archiv.send(`The proposal was accepted und was succesfully included in the trello grid
					\`\`\`${messageReaction.message.cleanContent}\`\`\`
					`);
					messageReaction.message.delete();
					return messageReaction.message.channel.send('The proposal was succesfully included in the trello grid').then(m => m.delete(10000));
				}
			});
		}

		if (messageReaction.emoji.name === '👎' && messageReaction.count === 2) {
			const space = ' ';
		  const text = messageReaction.message.cleanContent.split(space);

		  var title2 = [];
		  var context2 = [];
		  for (var index = 0; index < text.length; index++) {
			  if (text.indexOf('|') === index) {
				var xxxx = index;
			  } else if (index >= xxxx) {
				  context2.push(text[index]);
			  } else {
			  title2.push(text[index]);
		  }
		  }
		  trello.addCard(title2.join(' '), `**Proposal:** \n${context2.join(' ')}`, '59ef5ca156376adce52354c7',
		  function (error, trelloCard) {
			  if (error) {
				  console.log(error);
				  return messageReaction.message.channel.send('Error');
			  }
			  else {
				  const archiv = client.channels.get('372404644623810560');
				  archiv.send(`The proposal was rejected und was succesfully included in the trello grid
				  \`\`\`${messageReaction.message.cleanContent}\`\`\`
				  `);
				  messageReaction.message.delete();
				  return messageReaction.message.channel.send('The proposal was succesfully included in the trello grid').then(m => m.delete(10000));
			  }
		  });
	  }
	}

	if (messageReaction.message.channel.id === '372404616001880064') {
		if (messageReaction.emoji.name === '👍' && messageReaction.count === 2) {
			  var space = ' ';
			var text = messageReaction.message.cleanContent.split(space);

			var title = [];
			var context = [];
			for (var i = 0; i < text.length; i++) {
				if (text.indexOf('|') === i) {
					var xxx = i;
				} else if (i >= xxx) {
					context.push(text[i]);
				} else {
				title.push(text[i]);
			}
			}
			trello.addCard(title.join(' '), `**Bugreport:** \n${context.join(' ')}`, '59ef6ee0f7e744cff0058d8f',
			function (error, trelloCard) {
				if (error) {
					console.log(error);
					return messageReaction.message.channel.send('Error');
				}
				else {
					const archiv = client.channels.get('372404644623810560');
					archiv.send(`The bugreport was accepted und was succesfully included in the trello grid
					\`\`\`${messageReaction.message.cleanContent}\`\`\`
					`);
					messageReaction.message.delete();
					return messageReaction.message.channel.send('The bugreport was succesfully included in the trello grid').then(m => m.delete(10000));
				}
			});
		}

		if (messageReaction.emoji.name === '👎' && messageReaction.count === 2) {
			const space = ' ';
		  const text = messageReaction.message.cleanContent.split(space);

		  var title2 = [];
		  var context2 = [];
		  for (var index = 0; index < text.length; index++) {
			  if (text.indexOf('|') === index) {
				var xxxx = index;
			  } else if (index >= xxxx) {
				  context2.push(text[index]);
			  } else {
			  title2.push(text[index]);
		  }
		  }
		  trello.addCard(title2.join(' '), `**Bugreport:** \n${context2.join(' ')}`, '59ef6eda38a2f7a1e1a94110',
		  function (error, trelloCard) {
			  if (error) {
				  console.log(error);
				  return messageReaction.message.channel.send('Error');
			  }
			  else {
				  const archiv = client.channels.get('372404644623810560');
				  archiv.send(`The bugreport was rejected und was succesfully included in the trello grid
				  \`\`\`${messageReaction.message.cleanContent}\`\`\`
				  `);
				  messageReaction.message.delete();
				  return messageReaction.message.channel.send('The bugreport was succesfully included in the trello grid').then(m => m.delete(10000));
			  }
		  });
	  }
	}
	const tableload = client.guildconfs.get(messageReaction.message.guild.id);

	if (!tableload.starboard) {
		tableload.starboard === 'false';
		tableload.starboardchannel === '';
		client.guildconfs.set(messageReaction.message.guild.id, tableload);
	}

	if (tableload.starboardchannel === '') return;
	if (tableload.starboard === 'false') return;

	if (messageReaction.emoji.name === '⭐') {
		if (user.id === messageReaction.message.author.id) {
			messageReaction.remove(messageReaction.message.author);
			return messageReaction.message.channel.send('You can not give a star on your own message').then(m => m.delete(20000));
		}
		if (messageReaction.count === 1) {
			const starboardchannel = client.channels.get(tableload.starboardchannel);

			const embed = new Discord.RichEmbed()
		.setColor('#a6a4a8')
		.setTimestamp()
		.setFooter(`⭐${messageReaction.count++}`)
		.setDescription(`**Message:** \n ${messageReaction.message.content}`)
		.setAuthor(`${messageReaction.message.author.tag} (${messageReaction.message.author.id})`, messageReaction.message.author.displayAvatarURL);
			starboardchannel.send({ embed }).then(m => client.starboard.set(messageReaction.message.id, {
				msgid: m.id,
				channel: m.channel.id
			}));
		} else if (messageReaction.count > 1) {
			const table = client.starboard.get(messageReaction.message.id);
			const starboardch = client.channels.get(table.channel);

			const embed = new Discord.RichEmbed()
			.setColor('#a6a4a8')
			.setTimestamp()
			.setFooter(`⭐${messageReaction.count - 1}`)
			.setDescription(`**Message:** \n ${messageReaction.message.content}`)
			.setAuthor(`${messageReaction.message.author.tag} (${messageReaction.message.author.id})`, messageReaction.message.author.displayAvatarURL);

			return starboardch.fetchMessage(table.msgid).then(m => m.edit({ embed }));
		}
	}
};