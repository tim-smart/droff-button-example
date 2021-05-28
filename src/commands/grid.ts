import { SlashCommandsHelper } from "droff";
import { ButtonStyle } from "droff/dist/types";
import * as RxO from "rxjs/operators";
import * as Comp from "../utils/components";

const button1 = Comp.button({
  label: "One",
  custom_id: "one",
});

const button2 = Comp.button({
  label: "Two",
  custom_id: "one",
});

const button3 = Comp.button({
  label: "Three",
  custom_id: "three",
});

const button4 = Comp.button({
  style: ButtonStyle.SUCCESS,
  label: "Four",
  custom_id: "four",
});

export const register = (commands: SlashCommandsHelper) => {
  commands
    .guild({
      name: "grid",
      description: "Testing buttons",
    })
    .pipe(
      RxO.flatMap(({ respond }) =>
        respond({
          content: "Click a button",
          components: Comp.grid([
            [button1, button2],
            [button3, button4],
          ]),
        })
      )
    )
    .subscribe();

  commands
    .components([button1, button2, button3, button4])
    .pipe(
      RxO.flatMap(([{ update }, { custom_id }]) =>
        update({
          content: `You clicked ${custom_id}`,
        })
      )
    )
    .subscribe();
};
