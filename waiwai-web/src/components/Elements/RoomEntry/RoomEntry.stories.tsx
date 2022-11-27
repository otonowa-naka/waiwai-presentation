import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from '../../../store'

import { RoomEntry } from './RoomEntry'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/RoomEntry',
  component: RoomEntry,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof RoomEntry>


export const Primary = {}

