/* eslint-disable no-useless-escape */
// eslint-disable-next-line no-unused-vars
const { Message, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, TextChannel } = require('discord.js');
const config = require("../../config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB();


/**
* @param { Message } message
* @param { string[] } args
*/
const run = async (client, message, args) => {
    if (message.author.id !== config.owner) {
        return;
    }

    let lucros = await db.get(`lucros_${message.guild.id}`)
    let compras = await db.get(`comprasrecebidas_${message.guild.id}`)

    if(compras === null || undefined) {
        compras = `0`
    }

    if(lucros === null || undefined) {
        lucros = `0,00`
    }



    message.reply({ embeds: [new MessageEmbed().setFooter("∙ Créditos | Humongous ©")
    .setAuthor({
      name: `Bot de Vendas`,
      iconURL: config.author}).setThumbnail(message.guild.iconURL({dynamyc: true}))
      .setColor(config.color).setDescription(`Lucros da loja **${message.guild.name}**:`).addFields(
        {
            name: `Lucro Total:`,
            value: `R$${lucros}`,
            inline: true
        },
        {
            name: `Compras Totais:`,
            value: `${compras}`,
            inline: true
        }
      ) ]})

}
module.exports = {	
    run,
    name: 'lucros',
    aliases: ["lucrosinfo", "valoreslucro", "lucrobot", "botlucro"],
};
