import * as selectors from '../selectors';
import { State } from 'src/state/reducer';
import { RecursivePartial } from 'src/utils/types';
import { AppControlSelection, AppControlSelectionSection } from '../types';

describe('AppControl selectors', () => {
  describe('getCurrentSelection', () => {
    it('returns the current selection', () => {
      const state: RecursivePartial<State> = {
        ui: {
          appControl: {
            selection: 'test',
          },
        },
      };

      const pickSession = selectors.getCurrentSelection(state as State);
      expect(pickSession).toEqual('test');
    });
  });

  describe('isPickingSection', () => {
    it('returns true for matching picking section', () => {
      const state: RecursivePartial<State> = {
        ui: {
          appControl: {
            selection: AppControlSelectionSection.StartingLocation,
          },
        },
      };

      const isPicking = selectors.isPickingSection(state as State, AppControlSelectionSection.StartingLocation);
      expect(isPicking).toBe(true);
    });

    it('returns false for nonmatching picking section', () => {
      const state: RecursivePartial<State> = {
        ui: {
          appControl: {
            selection: AppControlSelectionSection.DropoffPoints,
          },
        },
      };

      const isPicking = selectors.isPickingSection(state as State, AppControlSelectionSection.StartingLocation);
      expect(isPicking).toBe(false);
    });

    it('returns false when nothing is selected', () => {
      const state: RecursivePartial<State> = {
        ui: {
          appControl: {
            selection: null,
          },
        },
      };

      const isPicking = selectors.isPickingSection(state as State, AppControlSelectionSection.StartingLocation);
      expect(isPicking).toBe(false);
    });
  });
});
