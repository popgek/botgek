import {
  Command,
  CommandStore,
  KlasaMessage,
  CommandOptions,
  KlasaUser
} from 'klasa';
import { botgekClient } from '../../core/botgekClient';
import { MessageEmbed } from 'discord.js';

export default class extends Command {
  constructor(
    client: botgekClient,
    store: CommandStore,
    file,
    dir,
    options?: CommandOptions
  ) {
    super(client, store, file, dir, {
      name: 'spotify',
      enabled: true,
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['spoti'],
      description:
        'Gets information about Spotify song from [user:user]\'s "Rich Presence".',
      usage: '[user:user]',
      usageDelim: ' '
    });
  }

  async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<any> {
    if (!user) user = msg.author;
    if (
      user.presence.activity !== null &&
      user.presence.activity.type === 'LISTENING' &&
      user.presence.activity.name === 'Spotify' &&
      user.presence.activity.assets !== null
    ) {
      const embed = new MessageEmbed()
        .setAuthor(
          'Spotify Track Info',
          'https://cdn.discordapp.com/emojis/408668371039682560.png'
        )
        .setColor(0x1ed760)
        .setThumbnail(
          `https://i.scdn.co/image/${user.presence.activity.assets.largeImage.slice(
            8
          )}`
        )
        .addField('Song Name', user.presence.activity.details, true)
        .addField('Album', user.presence.activity.assets.largeText, true)
        .addField('Author', user.presence.activity.state, false)
        .addField(
          'Listen to Track:',
          `[\`https://open.spotify.com/track/${user.presence.activity['syncID']}\`](https://open.spotify.com/track/${user.presence.activity['syncID']})`
        );
      msg.channel.send(embed);
    }
  }
}
