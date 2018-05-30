import reducer from '../reducer';

describe('state', () => {
  it('matches the snapshot', () => {
    const state = reducer(undefined, { type: null });
    expect(state).toMatchSnapshot();
  });
});
