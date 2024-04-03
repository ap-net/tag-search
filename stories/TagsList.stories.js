import React from 'react';
import { storiesOf } from '@storybook/react';
import TagsList from '../src/components/TagsList';

storiesOf('TagsList', module)
  .add('default', () => (
    <TagsList />
  ));
