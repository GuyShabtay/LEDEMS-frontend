import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TypeDropBox({type,setType}) {

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{minWidth: 130,marginBottom:'10px' }}>
        <InputLabel 
          id="demo-simple-select-label"
          sx={{ color: 'white' }} 
        >
          Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
          sx={{ color: 'white' }} 
        >
          <MenuItem value={'image'} >Image</MenuItem>
          <MenuItem value={'video'} >Video</MenuItem>
          <MenuItem value={'document'} >Document</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
