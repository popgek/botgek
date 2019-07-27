import { KlasaClient, KlasaClientOptions } from 'klasa';

export class botgekClient extends KlasaClient {
  constructor(
    options: KlasaClientOptions,
    public botgekOpts: botgekClientOptions
  ) {
    super(options);
  }
}

export type botgekClientOptions = {
  version: string;
  disabledModules?: string | any[];
  ownerIDs: string[];
};

KlasaClient.defaultGuildSchema.add('voiceRole', 'Role');
