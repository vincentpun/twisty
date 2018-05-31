import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { State } from 'src/state/reducer';
import { isGrabbingClientLocation, hasFailedGrabbingClientLocation } from 'src/state/ui/AppControl/selectors';
import { getClientLocation } from 'src/state/ui/AppControl/actions';

interface LocationGrabberProps {
  isGrabbing: boolean;
  hasFailedGrabbingClientLocation: boolean;
  getClientLocation: () => any;
}

const LocationGrabber = ({ isGrabbing, hasFailedGrabbingClientLocation, getClientLocation }: LocationGrabberProps) => {
  if (isGrabbing) {
    return <span>Getting Location...</span>;
  }

  if (hasFailedGrabbingClientLocation) {
    return (
      <span>
        Failed
        {' '}
        <a href="#" onClick={getClientLocation}>Retry</a>
      </span>
    );
  }

  return <a href="#" onClick={getClientLocation}>Get Location</a>;
};

const mapStateToProps = (state: State) => ({
  isGrabbing: isGrabbingClientLocation(state),
  hasFailedGrabbingClientLocation: hasFailedGrabbingClientLocation(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getClientLocation }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LocationGrabber);
