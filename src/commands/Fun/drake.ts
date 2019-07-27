import {
  Command,
  CommandStore,
  KlasaMessage,
  CommandOptions,
  KlasaUser
} from 'klasa';
import { botgekClient } from '../../core/botgekClient';
import { createCanvas, loadImage } from 'canvas';
import * as fetch from 'node-fetch';
import * as path from 'path';

export default class extends Command {
  constructor(
    client: botgekClient,
    store: CommandStore,
    file,
    dir,
    options?: CommandOptions
  ) {
    super(client, store, file, dir, {
      name: 'drake',
      enabled: true,
      requiredPermissions: ['ATTACH_FILES'],
      aliases: ['drakeposting'],
      description: 'Draws two user\'s avatars over the "Drakeposting" meme.',
      runIn: ['text'],
      usage: '[nahUser:user] [yeahUser:user]',
      usageDelim: ' '
    });
  }

  async run(
    msg: KlasaMessage,
    [nahUser, yeahUser]: [KlasaUser, KlasaUser]
  ): Promise<any> {
    const base = await loadImage(
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        'src',
        'assests',
        'images',
        'drakeposting.png'
      )
    );
    const nahAvatar = await loadImage(
      await fetch(nahUser.displayAvatarURL({ format: 'png', size: 128 })).then(
        response => response.buffer()
      )
    );
    const yeahAvatar = await loadImage(
      await fetch(yeahUser.displayAvatarURL({ format: 'png', size: 128 })).then(
        response => response.buffer()
      )
    );
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.drawImage(nahAvatar, 512, 0, 512, 512);
    ctx.drawImage(yeahAvatar, 512, 512, 512, 512);
    return msg.channel.send({
      files: [{ attachment: canvas.toBuffer(), name: 'drakeposting.png' }]
    });
  }
}
