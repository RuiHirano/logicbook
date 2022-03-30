import React, { useState } from "react";
import { Drawer, Box, Typography, Chip, IconButton, List, ListItem, Divider, ListItemIcon, ListItemText, Collapse, ListItemButton } from '@mui/material'
import { Apps, NestCamWiredStand } from '@mui/icons-material';
import Close from '@mui/icons-material/Close';
import ArrowLeft from '@mui/icons-material/UnfoldMore';
import ArrowRight from '@mui/icons-material/UnfoldLess';
import InformationPanel from "./InformationPanel";
import CanvasExamplePanel from "./CanvasExamplePanel";
import CanvasTestPanel from "./CanvasTestPanel";
import MarkdownPanel from "./MarkdownPanel";
import LogTerminal from "./LogTerminal";
import { LazyLog } from 'react-lazylog';
import CanvasFunctionPanel from "./CanvasFunctionPanel";
import CanvasInformationPanel from "./CanvasInformationPanel";
import CanvasMarkdownPanel from "./CanvasMarkdownPanel";

export interface Props {
  logic: any,
  open: boolean,
  onClickClose: () => void,
}

const CanvasSideBar: React.FC<Props> = ({ logic, open, onClickClose }) => {

  const [drawerWidth, setDrawerWidth] = useState<"30vw" | "50vw" | "85vw">("85vw")
  const lineNum = logic.source.split("\n").length
  console.log(lineNum)

  return (
    <div style={{ width: drawerWidth }}>
      <Drawer
        anchor={'right'}
        variant="persistent"
        open={open}
        onClose={() => { }}
      >
        <div style={{ width: drawerWidth }}>
          <div style={{ display: 'flex', margin: 10 }}>
            <Typography style={{ fontWeight: 'bold', fontSize: 30 }}>{logic.name}</Typography>
            {/*<Chip style={{ marginLeft: 20, margin: 10, backgroundColor: "deepskyblue" }} size="small" label={logic.version} />*/}

            <div style={{ margin: '0 0 0 auto' }}>
              {/*{drawerWidth === "30vw" &&
                <IconButton onClick={() => setDrawerWidth('50vw')}>
                  <ArrowLeft />
                </IconButton>}
              {drawerWidth === "50vw" &&
                <IconButton onClick={() => setDrawerWidth('85vw')}>
                  <ArrowLeft />
                </IconButton>}
              {drawerWidth === "85vw" &&
                <IconButton onClick={() => setDrawerWidth("30vw")}>
                  <ArrowRight />
  </IconButton>}*/}
              <IconButton style={{ marginLeft: 10 }} onClick={onClickClose}>
                <Close />
              </IconButton>
            </div>
          </div>
          <div style={{ margin: 10 }}>
            <CanvasInformationPanel logic={logic} />
          </div>
          <div style={{ margin: 10 }}>
            <h2>Code</h2>
            <div style={{ height: lineNum * 20 }}>
              {logic.source && <LazyLog height="auto" selectableLines text={logic.source} style={{ borderRadius: 10, paddingTop: 10, paddingBottom: 10 }} />}
            </div>
          </div>
          <div style={{ margin: 10 }}>
            <CanvasMarkdownPanel logic={logic} />
          </div>
          <div style={{ margin: 10 }}>
            <CanvasTestPanel logic={logic} onExecuteAllTest={() => { }} onExecuteTest={() => { }} />
          </div>
        </div>
      </Drawer>
    </div>
  )
};

export default CanvasSideBar;
