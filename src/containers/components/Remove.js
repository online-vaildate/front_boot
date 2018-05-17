import React from 'react';
import { Modal, Icon, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import NewButton from 'NewButton';

class Remove extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const { open, handleCancel, handleConfirm } = this.props;
    return (
      <Modal
        visible={open || false}
        width={400}
        onCancel={handleCancel}
        wrapClassName="vertical-center-modal remove"
        footer={<div><NewButton
          onClick={handleCancel}
          className="color3"
          height={36}
          text={Choerodon.getMessage('取消', 'cancel')}
        /><NewButton
          onClick={handleConfirm}
          className="color3"
          style={{ marginLeft: '8px' }}
          height={36}
          text={Choerodon.getMessage('删除', 'delete')}
        />
        </div>}
      >
        <Row>
          <Col span={24}>
            <Col span={2}>
              <a style={{ fontSize: 20, color: '#ffc07b' }}>
                <Icon type="question-circle-o" />
              </a>
            </Col>
            <Col span={22}>
              <h2>{Choerodon.getMessage('确认删除', 'confirm delete')}</h2>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col offset={2}>
            <div style={{ marginTop: 10 }}>
              <span>{Choerodon.getMessage('当你点击删除后，该条数据将被永久删除，不可恢复!', 'When you click delete, after which the data will be permanently deleted and irreversible!')}</span>
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }
}
Remove.propTypes = {
  open: PropTypes.bool,
};
export default Remove;
