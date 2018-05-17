import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { inject } from 'mobx-react';

import asyncRouter from '../../../util/asyncRouter';
import asyncLocaleProvider from '../../../util/asyncLocaleProvider';

const Home = asyncRouter(() => import('./Home'));

@inject('AppState')
class <%= title %> extends React.Component {
  render() {
    const { match, AppState } = this.props;
    const langauge = AppState.currentLanguage;
    const IntlProviderAsync = asyncLocaleProvider(langauge, () => import(`../locale/${langauge}`));
    return (
      <IntlProviderAsync>
        <div>
          <Switch>
            <Route exact path={match.url} component={Home} />
          </Switch>
        </div>
      </IntlProviderAsync>
    );
  }
}

export default <%= title %>;
