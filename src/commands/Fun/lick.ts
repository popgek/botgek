import { Command, CommandStore, KlasaMessage, CommandOptions } from 'klasa';
import { botgekClient } from '../../core/botgekClient';
import * as fetch from 'node-fetch';

export default class extends Command {
  constructor(
    client: botgekClient,
    store: CommandStore,
    file,
    dir,
    options?: CommandOptions
  ) {
    super(client, store, file, dir, {
      name: 'lick',
      enabled: true,
      requiredPermissions: ['ATTACH_FILES'],
      description: 'Responds with a random kiss image.'
    });
  }

  async run(msg: KlasaMessage): Promise<any> {
    return msg.channel.send({
      files: [
        {
          attachment: `https://rra.ram.moe${await fetch(
            'https://rra.ram.moe/i/r?type=lick'
          )
            .then(response => response.json())
            .then(response => response.path)}`
        }
      ]
    });
  }
}
