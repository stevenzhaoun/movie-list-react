import { Box } from '@material-ui/core'
import React from 'react'

const MovieGrid = (props) => {
  return (
    <Box display="grid" gridTemplateColumns={'repeat(4, 1fr)'} gridGap={32} {...props} />
  )
}

export default MovieGrid
