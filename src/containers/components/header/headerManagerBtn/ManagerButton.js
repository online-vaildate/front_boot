import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import MenuStore from '@/stores/MenuStore';
import './ManagerButton.scss';
import { Button, Icon } from 'choerodon-ui';

@inject('AppState')
@observer
class ManagerButton extends Component {
  getGlobalMenuData = () => {
    const { AppState, history } = this.props;
    // HeaderStore.setSelectData(null);
    AppState.changeMenuType({ type: 'site' });
    AppState.setTypeUser(false);
    MenuStore.loadMenuData().then(menus => {
      if (menus.length) {
        const { route, domain } = menus[0].subMenus[0];
        Choerodon.historyPushMenu(history, route, domain);
      }
    });
  };

  render() {
    const { AppState } = this.props;
    const classString = classNames({
      active: AppState.currentMenuType.type === 'site' && !AppState.isTypeUser,
    });
    return (
      <Button className={classString} onClick={this.getGlobalMenuData}>
        {Choerodon.getMessage('管理', 'Manage')}
        <Icon className="manager-icon" type="settings " />
      </Button>
    );
  }
}

export default withRouter(ManagerButton);
