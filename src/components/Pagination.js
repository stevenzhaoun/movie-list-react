import { Box, Button, Typography } from '@material-ui/core'
import React from 'react'

const Pagination = ({
  onPrev,
  onNext,
  currentPage,
  totalPages
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPrev(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onNext(currentPage + 1);
    }
  }
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Button onClick={handlePrev} color="primary" variant="outlined">Prev</Button>
      <Typography>{`${currentPage} / ${totalPages}`}</Typography>
      <Button onClick={handleNext} color="primary" variant="outlined">Next</Button>
    </Box>
  )
}

export default Pagination
