import React, { useEffect, useState } from "react";
import { Paper, Button, TextField, Typography, ButtonGroup } from '@mui/material'

export interface Props {
}

const Loading: React.FC<Props> = () => {

  return (
    <div style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <div>
        <Typography style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}>Logicbook</Typography>
        <Typography style={{ textAlign: 'center', fontSize: 25 }}>Loading...</Typography>
      </div>
    </div>
  )
};

export default Loading;
