import { PermissionLevels, KlasaMessage } from 'klasa';
import { botgekClient } from '../botgekClient';

export default new PermissionLevels()
  .add(0, () => true)
  .add(
    1,
    (message: KlasaMessage) =>
      message.guild && message.member.hasPermission('MANAGE_MESSAGES')
  )
  .add(10, (message: KlasaMessage) => {
    if (
      (message.client as botgekClient).botgekOpts.ownerIDs.some(
        i => i === message.author.id
      )
    )
      return true;
    return false;
  });
