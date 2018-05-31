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

  describe('isGrabbingClientLocation', () => {
    it('returns isGrabbingClientLocation', () => {
      let state: RecursivePartial<State> = {
        ui: {
          appControl: {
            isGrabbingClientLocation: false,
          },
        },
      };

      let isGrabbingClientLocation = selectors.isGrabbingClientLocation(state as State);
      expect(isGrabbingClientLocation).toBe(false);

      state = {
        ui: {
          appControl: {
            isGrabbingClientLocation: true,
          },
        },
      };

      isGrabbingClientLocation = selectors.isGrabbingClientLocation(state as State);
      expect(isGrabbingClientLocation).toBe(true);
    });
  });

  describe('hasFailedGrabbingClientLocation', () => {
    it('returns hasFailedGrabbingClientLocation', () => {
      let state: RecursivePartial<State> = {
        ui: {
          appControl: {
            hasFailedGrabbingClientLocation: false,
          },
        },
      };

      let hasFailedGrabbingClientLocation = selectors.hasFailedGrabbingClientLocation(state as State);
      expect(hasFailedGrabbingClientLocation).toBe(false);

      state = {
        ui: {
          appControl: {
            hasFailedGrabbingClientLocation: true,
          },
        },
      };

      hasFailedGrabbingClientLocation = selectors.hasFailedGrabbingClientLocation(state as State);
      expect(hasFailedGrabbingClientLocation).toBe(true);
    });
  });

  describe('getStartingCoordinates', () => {
    it('returns null if no coordinates', () => {
      const state: RecursivePartial<State> = {
        ui: {
          appControl: {
            startingCoordinates: null,
          },
        },
      };

      let startingCoordinates = selectors.getStartingCoordinates(state as State);
      expect(startingCoordinates).toBeNull();
    });

    it('returns coordinates from map', () => {
      const state: RecursivePartial<State> = {
        ui: {
          appControl: {
            startingCoordinates: 'a',
            coordinates: {
              a: {
                id: 'test',
              },
            },
          },
        },
      };

      let startingCoordinates = selectors.getStartingCoordinates(state as State);
      expect(startingCoordinates).toEqual({
        id: 'test',
      });
    });
  });

  describe('getCoordinates', () => {
    it('returns all coordinates', () => {
      const state: RecursivePartial<State> = {
        ui: {
          appControl: {
            coordinates: {
              a: {
                id: 'test',
              },
              b: {
                id: 'test2',
              },
            },
          },
        },
      };

      let coordinates = selectors.getCoordinates(state as State);
      expect(coordinates).toContainEqual({
        id: 'test',
      });
      expect(coordinates).toContainEqual({
        id: 'test2',
      });
    });
  });
});
