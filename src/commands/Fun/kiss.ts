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
      name: 'kiss',
      enabled: true,
      requiredPermissions: ['ATTACH_FILES'],
      description: 'Responds with a random kiss image.'
    });
  }

  async run(msg: KlasaMessage): Promise<any> {
    return msg.channel.send({
      files: [
        {
          attachment: await fetch('https://nekos.life/api/v2/img/kiss')
            .then(response => response.json())
            .then(response => response.url)
        }
      ]
    });
  }
}
