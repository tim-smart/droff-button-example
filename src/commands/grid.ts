import { UI } from "droff-helpers";
import { SlashCommandsHelper } from "droff-interactions";
import { ButtonStyle } from "droff/dist/types";
import * as Rx from "rxjs";
import * as RxO from "rxjs/operators";

const button1 = UI.button({
  label: "One",
  custom_id: "one",
});

const button2 = UI.button({
  label: "Two",
  custom_id: "one",
});

const button3 = UI.button({
  label: "Three",
  custom_id: "three",
});

const button4 = UI.button({
  style: ButtonStyle.SUCCESS,
  label: "Four",
  custom_id: "four",
});

export const register = (commands: SlashCommandsHelper) =>
  Rx.merge(
    // Grid command
    commands
      .guild({
        name: "grid",
        description: "Testing buttons",
      })
      .pipe(
        RxO.flatMap(({ respond }) =>
          respond({
            content: "Click a button",
            components: UI.grid([
              [button1, button2],
              [button3, button4],
            ]),
          })
        )
      ),

    // handle button interactions
    commands.components([button1, button2, button3, button4]).pipe(
      RxO.flatMap(([{ update }, { custom_id }]) =>
        update({
          content: `You clicked ${custom_id}`,
        })
      )
    )
  );
