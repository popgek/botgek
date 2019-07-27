import { botgekClient } from './core/botgekClient';
import permissionLevels from './core/lib/permissionLevels';
import * as express from 'express';

const app = new express();
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log(`App listening on port ${app.get('port')}`);
});

require('dotenv').config();

const client = new botgekClient(
  {
    commandEditing: true,
    prefix: ',',
    shards: [0],
    production: false,
    permissionLevels
  },
  {
    version: '1.0.0',
    ownerIDs: ['70228473481793536']
  }
).login(process.env.DISCORD_TOKEN);
