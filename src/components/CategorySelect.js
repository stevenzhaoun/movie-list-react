import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

const CategorySelect = ({
  value,
  onChange
}) => {
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    onChange(category);
  };
  return (
    <FormControl>
      <InputLabel>Category</InputLabel>
      <Select
        id="category-select"
        value={value}
        onChange={handleCategoryChange}
        label="Category"
        autoWidth
      >
        <MenuItem value="popular">Popular</MenuItem>
        <MenuItem value="now_playing">Now Playing</MenuItem>
        <MenuItem value="top_rated">Top Rated</MenuItem>
        <MenuItem value="upcoming">Upcoming</MenuItem>
      </Select>
    </FormControl>
  )
}

export default CategorySelect
