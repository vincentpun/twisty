import { RecursivePartial } from "src/utils/types";
import { State } from "src/state/reducer";
import { AppUIMode } from "../reducer";
import { getMode } from "../selectors";

describe('UI selectors', () => {
  it('gets current mode', () => {
    const state: RecursivePartial<State> = {
      ui: {
        mode: AppUIMode.Route,
      }
    };
    const mode = getMode(state as State);
    expect(mode).toEqual(AppUIMode.Route);
  });
});
