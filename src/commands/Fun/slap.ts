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
      name: 'slap',
      enabled: true,
      requiredPermissions: ['ATTACH_FILES'],
      aliases: ['tokat', 'batman-slap'],
      description: 'Slap another user as Batman.',
      usage: '<user:user>',
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
        'batmanslap.png'
      )
    );
    const slapperAvatar = await loadImage(
      await fetch(msg.author.displayAvatarURL({ format: 'png' })).then(
        response => response.buffer()
      )
    );
    const slappedAvatar = await loadImage(
      await fetch(user.displayAvatarURL({ format: 'png' })).then(response =>
        response.buffer()
      )
    );
    var coords = [[475, 172, 65], [244, 265, 85]];
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (var i = 0; i < coords.length; i++) {
      ctx.arc(coords[i][0], coords[i][1], coords[i][2], 0, Math.PI * 2, true);
    }
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(slapperAvatar, 410, 107, 130, 130);
    ctx.drawImage(slappedAvatar, 159, 180, 170, 170);
    return msg.channel.send({
      files: [{ attachment: canvas.toBuffer(), name: 'batmanSlap.png' }]
    });
  }
}
