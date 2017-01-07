import Relay from 'react-relay'

export default class CounterContainerQuery extends Relay.Route {
     static routeName = 'CounterContainerQuery';
     static queries = {
        data: (Component) => Relay.QL`
      query {
        factions(names: ["rebels"])  {
        
        ${Component.getFragment('data')} 
        }
      }
    `
    };
}