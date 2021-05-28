require("dotenv").config();

import { createClient, Intents } from "droff";
import * as Grid from "./commands/grid";

const client = createClient({
  token: process.env.DISCORD_BOT_TOKEN!,
  intents: Intents.GUILDS,
});

const commands = client.useSlashCommands();

// Register commands
Grid.register(commands);

commands.start();
