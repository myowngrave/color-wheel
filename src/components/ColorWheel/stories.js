import React from 'react';
import {storiesOf} from '@storybook/react';

import ColorWheel from './index'

storiesOf('ColorWheel', module)
    .add('default', () => <ColorWheel/>);