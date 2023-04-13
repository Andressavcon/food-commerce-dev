import React from 'react'
import { SnackContext } from '../contexts/SnackContext'

export function useSnack(){
  return React.useContext(SnackContext)
}
