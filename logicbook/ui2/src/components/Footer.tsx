import React from "react";
import { Typography } from '@mui/material'

export interface Props {
}

const Footer: React.FC<Props> = ({ }) => {

  return (
    <div style={{ backgroundColor: 'gray', padding: 10 }}>
      <Typography style={{ textAlign: 'center', color: 'white' }}>{`Logicbook ver.1.0.0 | 2022`}</Typography>
      <Typography style={{ textAlign: 'center', color: 'white' }}>{`powered by Logicbook.Inc`}</Typography>
    </div>
  )
};

export default Footer;
