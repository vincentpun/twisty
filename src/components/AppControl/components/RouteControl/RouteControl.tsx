import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { isNil } from 'ramda';

import { Trash } from 'src/components/Icons';
import { AppUIMode } from 'src/state/ui/reducer';
import { switchMode } from 'src/state/ui/actions';
import QueryRoute from './components/QueryRoute';
import { State } from 'src/state/reducer';
import { getCurrentRouteQuery } from 'src/state/ui/Routes/selectors';
import { getStartingCoordinates, getDropoffCoordinates } from 'src/state/ui/AppControl/selectors';
import { MapCoordinatesMap, startingCoordinates } from 'src/state/ui/AppControl/reducer';
import { createQuery, queryRoutes } from 'src/state/routes/actions';
import { MapCoordinates } from 'src/state/ui/AppControl/types';
import { RouteQuery, RouteQueryStatus } from 'src/state/routes/reducer';
import ErrorMessage from './components/ErrorMessage';
import RouteDisplay from './components/RouteDisplay';

interface RouteControlProps {
  switchMode?: (mode: AppUIMode) => any;
  createQuery?: () => any;
  startingCoordinates?: MapCoordinatesMap;
  dropoffCoordinates?: MapCoordinatesMap[];
  queryRoutes?: (id: string, startingCoordinates: MapCoordinates, dropoffCoordinates: MapCoordinates[]) => any;
  query?: RouteQuery;
}

class RouteControl extends React.Component<RouteControlProps> {
  constructor(props: RouteControlProps) {
    super(props);

    this.createQuery = this.createQuery.bind(this);
  }

  componentDidMount() {
    this.createQuery();
  }

  componentDidUpdate(prevProps: RouteControlProps) {
    const { query: oldQuery } = prevProps;
    const { query, startingCoordinates, dropoffCoordinates } = this.props;

    const areDifferentQueries = (!isNil(oldQuery) && !isNil(query) && oldQuery.id !== query.id) ||
      (!isNil(oldQuery) && isNil(query)) ||
      (isNil(oldQuery) && !isNil(query));

    if (!!query && areDifferentQueries) {
      !!this.props.queryRoutes ? this.props.queryRoutes(query.id, startingCoordinates, dropoffCoordinates) : null;
    }
  }

  get queryDisplay() {
    const { query } = this.props;

    if (isNil(query)) {
      return null;
    }

    switch (query.status) {
      case RouteQueryStatus.Error:
        return (
          <ErrorMessage
            title="An Error Occurred"
            message={!isNil(query.error) ? query.error : null}
            onRetryClick={this.createQuery}
          />
        );
      case RouteQueryStatus.PollingInProgress:
      case RouteQueryStatus.FetchingRoutesToken:
      case RouteQueryStatus.ToPoll:
        return <div className="route-control__loading"></div>;
      case RouteQueryStatus.Success:
        if (!!query.response) {
          return <RouteDisplay totalTime={query.response.totalTime} totalDistance={query.response.totalDistance} wayPoints={query.response.waypoints} />;
        } else {
          return <div className="route-control__loading"></div>;
        }
      default:
        return null;
    }
  }

  render() {
    const { switchMode, query, startingCoordinates } = this.props;

    return (
      <div className="route-control">
        <QueryRoute queryID={!!query ? query.id : null} />
        {this.queryDisplay}
        <hr />
        <button
          onClick={(e) => { e.preventDefault(); switchMode(AppUIMode.AppControl); }}
          className="route-control__back-button"
        >
          Back
        </button>
      </div>
    );
  }

  private createQuery() {
    !isNil(this.props.createQuery) ? this.props.createQuery() : null;
  }
}

const mapStateToProps = (state: State) => ({
  query: getCurrentRouteQuery(state),
  startingCoordinates: getStartingCoordinates(state),
  dropoffCoordinates: getDropoffCoordinates(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createQuery: () => dispatch(createQuery()),
  queryRoutes: (id: string, startingCoordinates: MapCoordinates, dropoffCoordinates: MapCoordinates[]) => dispatch(queryRoutes(id, startingCoordinates, dropoffCoordinates) as any),
  switchMode: (mode: AppUIMode) => dispatch(switchMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteControl);
