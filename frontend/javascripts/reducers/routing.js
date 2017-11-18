const queryString = require('query-string');
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

var defaults = {
  locationBeforeTransitions: null,
  leftView: '',
  tabView: '',
  query: '',
  parsedQuery: '',
  routeInitialized: false
}

export default function routerReducer(state = defaults, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      //We want to initialize everything on page load but LOCATION_CHANGE doesn't trigger on that,
      // so we'll use a custom parameter
    case "ROUTE_LOAD":
      {
        return { ...state,
          query: action.payload.search || '',
          parsedQuery: queryString.parse(action.payload.search || ''),
          //This is a weird property, only mess with it when an internal LOCATION_CHANGE is triggered.
          locationBeforeTransitions: action.type === LOCATION_CHANGE ? action.payload : state.locationBeforeTransitions
        };
      }
  }
  return state;
}
