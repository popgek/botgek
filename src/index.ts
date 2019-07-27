import { botgekClient } from './core/botgekClient';
import permissionLevels from './core/lib/permissionLevels';

/* Glitch stuff, because we're too poor to hire a server.
import * as express from 'express';
import * as http from 'http';

const app = new express();
app.get('/', (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT, function() {
  console.log(`App listening on port ${process.env.PORT}`);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
*/

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
