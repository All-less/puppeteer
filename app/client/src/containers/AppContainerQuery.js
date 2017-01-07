import Relay from 'react-relay'

export default class AppContainerQuery extends Relay.Route {
     name = 'AppContainerQuery';
     queries = {
        data: () => Relay.QL`
      query {
        rebels {
           id 
            }
      }
    `
    };
}