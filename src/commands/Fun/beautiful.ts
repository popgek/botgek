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
      name: 'beautiful',
      enabled: true,
      requiredPermissions: ['ATTACH_FILES'],
      aliases: ['this-is-beautiful', 'grunkle-stan'],
      description:
        'Draws a user\'s avatar over Gravity Falls\' "Oh, this? This is beautiful." meme.',
      usage: '[user:user]',
      usageDelim: ' '
    });
  }

  async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<any> {
    const base = await loadImage(
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        'src',
        'assests',
        'images',
        'beautiful.png'
      )
    );
    const avatar = await loadImage(
      await fetch(
        (user || msg.author).displayAvatarURL({ format: 'png', size: 128 })
      ).then(response => response.buffer())
    );
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, base.height);
    ctx.drawImage(avatar, 249, 24, 105, 105);
    ctx.drawImage(avatar, 249, 223, 105, 105);
    ctx.drawImage(base, 0, 0);
    return msg.channel.send({
      files: [{ attachment: canvas.toBuffer(), name: 'beautiful.png' }]
    });
  }
}
