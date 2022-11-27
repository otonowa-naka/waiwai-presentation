import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from '../../../store'
import { RoomId } from '../../../store/room/RoomId'

import { Stamp } from './stamp'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Stamp',
  component: Stamp,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Stamp roomId={new RoomId('0'.repeat(20))} />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof Stamp>


export const Primary = {}

