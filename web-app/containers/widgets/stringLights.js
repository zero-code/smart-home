import React from 'react'
import * as Api from '../../utils/api';
import {Widget} from '../../components/widgets';
import Button from 'antd/lib/button';
import createWemoWidget from './hocWemo';

const StringLightsWidget = ({initialized, loading, poweredOn, turnOn, turnOff}) => {
  return (
  <Widget title="String Lights" loading={!initialized}>
    <Button
      style={{width: 80, marginRight: 10}}
      onClick={turnOn}
      type={poweredOn ? 'primary' : null}
      loading={!poweredOn && loading}
    >
      On
    </Button>
    <Button
      style={{width: 80}}
      onClick={turnOff}
      type={!poweredOn ? 'primary' : null}
      loading={poweredOn && loading}
    >
      Off
    </Button>
  </Widget>
)}

const connected = createWemoWidget(StringLightsWidget, {
  turnOn: () => Api.turnOutletsOn('string-lights'),
  turnOff: () => Api.turnOutletsOff('string-lights'),
  load: () => Api.getOutletState('string-lights')
});

export default connected;
