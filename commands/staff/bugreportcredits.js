const Discord = require('discord.js');
const sql = require('sqlite');
sql.open("../lenoxbotscore.sqlite");
exports.run = async (client, msg, args) => {
	const guild = client.guilds.get('352896116812939264').roles.find('name', 'Moderator').id;
	if (!msg.member.roles.get(guild)) return msg.reply('You dont have permissions to execute this command!');

	const content = args.slice().join(" ");
	if (!content) return msg.reply('You have to enter a UserID');

	if (isNaN(content)) return msg.channel.send('It must be a UserID');

	try {
		await client.users.get(content);
	} catch (error) {
		return msg.reply(`Couldn't find this user!`);
	}

	await sql.get(`SELECT * FROM medals WHERE userId ="${content}"`).then(row => {
		if (!row) {
			sql.run("INSERT INTO medals (userId, medals) VALUES (?, ?)", [content, 1000]);
		} else {
		sql.run(`UPDATE medals SET medals = ${row.medals + 1000} WHERE userId = ${content}`);
		}
	}).catch((error) => {
		console.error(error);
		sql.run("CREATE TABLE IF NOT EXISTS medals (userId TEXT, medals INTEGER)").then(() => {
			sql.run("INSERT INTO medals (userId, medals) VALUES (?, ?)", [content, 1000]);
		});
	});

	const searcheduser = client.users.get(content);

	const embed = new Discord.RichEmbed()
		.setColor('#FF7F24')
		.setTitle('1000 Credits given because of an accepted bugreport!')
		.setAuthor(`${searcheduser.tag} (${searcheduser.id})`, searcheduser.displayAvatarURL)
		.setFooter(`Requested by ${msg.author.tag}`);
	client.channels.get('425752252180070401').send({
		embed
	});
};


exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	userpermissions: [],
	cooldown: 300000
};
exports.help = {
	name: 'bugreportcredits',
	description: 'Command for the LenoxBot Staff to give a user 1000 credits for reporting an existing bug',
	usage: 'bugreportcredits {userid}',
	example: ['bugreportcredits 238590234135101440'],
	category: 'staff',
	botpermissions: ['SEND_MESSAGES']
};