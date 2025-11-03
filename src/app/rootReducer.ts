import { combineReducers } from '@reduxjs/toolkit'
import { configReducer } from 'src/features/config'
import { flagsReducer } from 'src/features/flags'

export const rootReducer = combineReducers({
  config: configReducer,
  flags: flagsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
