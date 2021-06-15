require("dotenv").config();

import { createClient, Intents } from "droff";
import * as Interactions from "droff-interactions";
import * as Rx from "rxjs";
import * as Grid from "./commands/grid";

const client = createClient({
  token: process.env.DISCORD_BOT_TOKEN!,
  gateway: {
    intents: Intents.GUILDS,
  },
});

const commands = Interactions.create(client);

Rx.merge(
  // Start client and command sync
  client.effects$,
  commands.effects$,

  // Add commands
  Grid.register(commands)
).subscribe();
