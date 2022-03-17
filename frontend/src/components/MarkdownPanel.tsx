import React, { useEffect, useState } from "react";
import { Paper, Button, TextField, Typography, ButtonGroup } from '@mui/material'
import ReactMarkdown from 'react-markdown'

export interface Props {
  logic: any
}

const MarkdownPanel: React.FC<Props> = ({ logic }) => {

  return (
    <div>
      <h2>README</h2>
      <Paper style={{ padding: 30 }}>
        <ReactMarkdown>{"# React \n ### test"}</ReactMarkdown>
      </Paper>
    </div>
  )
};

export default MarkdownPanel;
