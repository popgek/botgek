import { Event } from 'klasa';

export default class extends Event {
  async run(oldState, newState) {
    if (oldState.guild.settings.voiceRole) {
      if (oldState.channel === null && newState.channel !== null) {
        oldState.guild.members
          .get(oldState.member.id)
          .roles.add(oldState.guild.settings.voiceRole);
      } else {
        if (newState.channel === null) {
          newState.guild.members
            .get(newState.member.id)
            .roles.remove(newState.guild.settings.voiceRole);
        }
      }
    }
  }
}
