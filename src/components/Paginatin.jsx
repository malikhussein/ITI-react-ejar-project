import React from 'react'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function Paginatin() {


  return (
    <>:
     <Stack spacing={2} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      {/* <Pagination count={10} shape="rounded" /> */}
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
    
    
    </>
  )
}
