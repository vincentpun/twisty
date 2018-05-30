import reducer from '../reducer';

describe('ui', () => {
  it('matches the snapshot', () => {
    const state = reducer(undefined, { type: null });
    expect(state).toMatchSnapshot();
  });
});
