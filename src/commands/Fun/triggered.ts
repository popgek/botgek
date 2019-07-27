import {
  Command,
  CommandStore,
  KlasaMessage,
  CommandOptions,
  KlasaUser
} from 'klasa';
import { botgekClient } from '../../core/botgekClient';
import * as Jimp from 'jimp';
import * as GIFEncoder from 'gifencoder';
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
      name: 'triggered',
      enabled: true,
      requiredPermissions: ['ATTACH_FILES'],
      aliases: ['trigger'],
      description: 'Draws a user\'s avatar over the "T r i g g e r e d" meme.',
      usage: '[user:user]',
      usageDelim: ' '
    });
  }

  async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<any> {
    const base = new Jimp(256, 256);
    const avatar = await Jimp.read(
      await fetch(
        (user || msg.author).displayAvatarURL({ format: 'png' })
      ).then(response => response.buffer())
    );
    const text = await Jimp.read(
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        'src',
        'assests',
        'images',
        'triggered.png'
      )
    );
    const tint = await Jimp.read(
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        'src',
        'assests',
        'images',
        'red.png'
      )
    );
    avatar.resize(320, 320);
    tint.scaleToFit(base.bitmap.width, base.bitmap.height);
    tint.opacity(0.2);
    text.scaleToFit(280, 60);

    const frames = [];
    const buffers = [];
    const encoder = new GIFEncoder(256, 256);
    const stream = encoder.createReadStream();
    let temp;

    stream.on('data', async buffer => await buffers.push(buffer));
    stream.on('end', async () => {
      return await msg.channel.send({
        files: [
          {
            attachment: Buffer.concat(buffers),
            name: 'triggered.gif'
          }
        ]
      });
    });

    for (let i = 0; i < 16; i++) {
      temp = base.clone();

      if (i === 0) {
        temp.composite(avatar, -16, -16);
      } else {
        temp.composite(
          avatar,
          -32 + getRandomInt(-16, 16),
          -32 + getRandomInt(-16, 16)
        );
      }

      temp.composite(tint, 0, 0);

      if (i === 0) temp.composite(text, -10, 200);
      else
        temp.composite(
          text,
          -12 + getRandomInt(-8, 8),
          200 + getRandomInt(-0, 12)
        );

      frames.push(temp.bitmap.data);
    }

    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(20);
    for (const frame of frames) {
      encoder.addFrame(frame);
    }
    encoder.finish();

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}
