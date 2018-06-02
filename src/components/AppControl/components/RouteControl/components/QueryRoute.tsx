import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isNil } from 'ramda';

import { actions } from 'src/state/routes/actions';
import { State } from 'src/state/reducer';
import { getQuery } from 'src/state/routes/selectors';
import { RouteQuery, RouteQueryStatus } from 'src/state/routes/reducer';

interface QueryRouteProps {
  queryID: string;
  query?: RouteQuery;

  pollQuery?: (id: string) => any;
}

class QueryRoute extends React.Component<QueryRouteProps> {
  private _timer: any;

  constructor(props: QueryRouteProps) {
    super(props);
  }

  componentDidMount() {
    const { query } = this.props;

    if (!isNil(query) && query.status === RouteQueryStatus.ToPoll) {
      this.startPolling();
    }
  }

  componentDidUpdate(prevProps: QueryRouteProps) {
    const { query: oldQuery } = prevProps;
    const { query } = this.props;

    if (query !== oldQuery) {
      const areDifferentQueries = (isNil(oldQuery) && !isNil(query)) ||
        (!isNil(oldQuery) && isNil(query)) ||
        (!isNil(oldQuery) && !isNil(query) && oldQuery.id !== query.id);

      if (areDifferentQueries) {
        this.stopPolling();

        if (!isNil(query) && query.status === RouteQueryStatus.ToPoll) {
          this.startPolling();
        }
      } else {
        const areStatusesDifferent = !isNil(query) && !isNil(oldQuery) && oldQuery.status !== query.status;

        if (areStatusesDifferent && query.status === RouteQueryStatus.ToPoll) {
          this.startPolling();
        }
      }
    }
  }

  private startPolling() {
    this._timer = setTimeout(() => this.poll(), 3000);
  }

  private stopPolling() {
    if (!isNil(this._timer)) {
      clearTimeout(this._timer);
    }
  }

  private poll() {
    if (!!this.props.pollQuery) {
      this.props.pollQuery(this.props.queryID);
    }
  }

  render(): null {
    return null;
  }
}

const mapStateToProps = (state: State, ownProps: QueryRouteProps) => ({
  query: getQuery(state, ownProps.queryID),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  queryRoutes: actions.queryRoutes,
  pollQuery: actions.pollQuery,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QueryRoute);
