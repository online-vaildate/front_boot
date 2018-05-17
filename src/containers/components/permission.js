/*eslint-disable*/
//service 为一个数组，权限的code


import React, { Component, Children } from 'react';
import { Observable } from 'rxjs';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Tooltip } from 'antd';
import axios from 'Axios';
import _ from 'lodash';
import AppState from '../stores/AppState';

@inject('AppState')
@observer
class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionFlag: true,
      permissionArray: [],
      flag: true,
    }
  }
  componentWillMount() {
    const { service, type, organizationId, projectId, AppState } = this.props;
    let permission;
    let permissionArray = [];
    if (service) {
      this.setState({
        permissionFlag: false,
      });
      service.map(serviceValue => {
        switch (type) {
          case 'organization':
            permission = {
              "code": serviceValue,
              "organizationId": organizationId,
              "resourceType": type,
            };
            break;
          case 'project':
            permission = {
              "code": serviceValue,
              // "organizationId": organizationId,
              "projectId": projectId,
              "resourceType": type,
            };
            break;
          case 'site':
            permission = {
              "code": serviceValue,
              "resourceType": type,
            };
            break;
        }
        this.state.permissionArray.push(permission);
      })
    }
  }
  // componentWillMount() {
  //   const { service, type, organizationId, projectId, AppState } = this.props;
  //   let already = 0;
  //   //如果该权限已经查过就跳过
  //   for (let a = 0; a < AppState.getPerMission.length; a += 1) {
  //     for (let b = 0; b < AppState.getPerMission[a].length; b += 1) {
  //       if (type === 'organization') {
  //         if (AppState.getPerMission[a][b].name === service
  //           && AppState.getPerMission[a][b].resourceType === 'organization'
  //           && parseInt(AppState.getPerMission[a][b].resourceId, 10) === parseInt(organizationId, 10)
  //         ) {
  //           already = 1;
  //         }
  //       } else if (type === 'project') {
  //         if (AppState.getPerMission[a][b].name === service
  //           && AppState.getPerMission[a][b].resourceType === 'project'
  //           && parseInt(AppState.getPerMission[a][b].resourceId, 10) === parseInt(projectId, 10)
  //         ) {
  //           already = 1;
  //         }
  //       } else {
  //         if (AppState.getPerMission[a][b].name === service
  //           && AppState.getPerMission[a][b].resourceType === 'site'
  //         ) {
  //           already = 1;
  //         }
  //       }
  //     }
  //   }
  //   //查权限
  //   if (already === 0) {
  //     let permission = [];
  //     if (type === 'organization') {
  //       permission.push({
  //         name: service,
  //         organizationId: organizationId,
  //         resourceId: organizationId,
  //         resourceType: 'organization',
  //       })
  //     } else if (type === 'project') {
  //       permission.push({
  //         name: service,
  //         organizationId: organizationId,
  //         resourceId: projectId,
  //         resourceType: 'project',
  //       })
  //     } else {
  //       permission.push({
  //         name: service,
  //         resourceType: 'site',
  //       })
  //     }
  //     axios.post('/iam/v1/permissions/testPermission', JSON.stringify(permission)).then((data) => {
  //       AppState.setPerMission(data);
  //     })
  //   }
  // }
  // componentWillMount() {
  //   const { service, type, organizationId, projectId, AppState } = this.props;
  //   let permission = {};
  //   let uniqMenuCodeArray = [];
  //   let types = AppState.currentMenuType.type;
  //   service.map(serviceValue => {
  //     if (types === 'organization') {
  //       permission = {
  //         "name": serviceValue,
  //         "resourceId": organizationId,
  //         "resourceType": type,
  //         "organizationId": organizationId,
  //       };
  //     } else if (types === 'project') {
  //       permission = {
  //         "name": serviceValue,
  //         "resourceId": projectId,
  //         "resourceType": type,
  //         "organizationId": organizationId,
  //       };
  //     }
  //   if (AppState.getPerMission[0]) {
  //     let flag = 0;
  //     AppState.getPerMission[0].map((valuePermission) => {
  //       let valuePermissionNew = _.omit(valuePermission, ['approve']);
  //       if (!(_.isEqual(valuePermissionNew, permission))) {
  //         flag++;
  //       }
  //     })
  //     if (flag > 0) {
  //       AppState.pushperMissionArray(permission);
  //       flag = 0;
  //     }
  //   }
  //   if (AppState.getperMissionArray.length > 5) {
  //     AppState.loadPerMissions(AppState.getperMissionArray);
  //     AppState.setperMissionArray([]);
  //   }
  // })
  // }
  componentDidMount() {
    const { service, type, organizationId, projectId, AppState } = this.props;
    axios.post('/iam/v1/permissions/checkPermission', JSON.stringify(this.state.permissionArray)).then((data) => {
      AppState.setPerMission(data);
    }).then(() => {
      this.setState({
        flag: Choerodon.getPermission(AppState.getPerMission, service, type, organizationId, projectId)
      })
    })
  }
  render() {
    const { service, type, organizationId, projectId, AppState } = this.props;
    const { permissionFlag } = this.state;
    if (permissionFlag) {
      return Children.only(this.props.children)
    } else {
      if (this.state.flag) {
        return Children.only(this.props.children)
      } else {
        return null
      }
    }
  }
}



export default withRouter(Permission);
