import React, { useState } from "react";
import { Drawer, Box, Typography, Chip, IconButton, List, ListItem, Divider, ListItemIcon, ListItemText, Collapse, ListItemButton } from '@mui/material'
import { Apps, BookmarkBorder, ExpandMore, ExpandLess } from '@mui/icons-material';

export interface Props {
  data: any,
  onClickLogic: (logic: any) => void,
}

const CanvasSideMenuBar: React.FC<Props> = ({ data, onClickLogic }) => {

  const drawerWidth = "15vw"

  const createClassOpens = () => {
    const classOpens: any = {}
    data.modules.forEach((module: any) => {
      module.classes.forEach((clas: any) => {
        classOpens[clas.id] = false
      })
    })
    return classOpens
  }
  const [classOpens, setClassOpens] = useState(createClassOpens())


  const list = () => (
    <div style={{ width: drawerWidth }}>
      <Box
        sx={{ width: drawerWidth }}
        role="presentation"
        onClick={() => { }}
      >
        <List>
          <ListItem button key={"Logicbook"}>
            <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary={"Logicbook"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {data.modules.map((module: any) => (
            <div>
              <ListItem dense key={module.name}>
                <ListItemText primary={module.name} primaryTypographyProps={{ fontWeight: 'bold' }} />
              </ListItem>
              {module.classes.map((clas: any) => (
                <div>
                  <ListItem dense button key={clas.name} onClick={() => { setClassOpens({ ...classOpens, [clas.id]: !classOpens[clas.id] }); onClickLogic(clas) }}>
                    <ListItemIcon>
                      <Apps />
                    </ListItemIcon>
                    <ListItemText primary={clas.name.split("/")[0]} />
                    {classOpens[clas.id] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                  </ListItem>
                  <Collapse in={classOpens[clas.id]} timeout="auto" unmountOnExit>
                    {clas.funcs.map((func: any) => (
                      <List component="div" disablePadding>
                        <ListItem dense button key={func.name} sx={{ pl: 4 }} onClick={() => onClickLogic(func)}>
                          <ListItemIcon>
                            <BookmarkBorder />
                          </ListItemIcon>
                          <ListItemText primary={func.name} />
                        </ListItem>
                      </List>
                    ))}
                  </Collapse>
                </div>
              ))}
              {module.funcs.map((func: any) => (
                <ListItem dense button key={func.name} onClick={() => onClickLogic(func)}>
                  <ListItemIcon>
                    <BookmarkBorder />
                  </ListItemIcon>
                  <ListItemText primary={func.name.split("/")[0]} />
                </ListItem>
              ))}
              <Divider />
            </div>
          ))}
        </List>
      </Box>
    </div>
  );
  return (
    <div style={{ width: drawerWidth }}>
      <Drawer
        anchor={'left'}
        variant="persistent"
        open={true}
        onClose={() => { }}
      >
        {list()}
      </Drawer>
    </div>
  )
};

export default CanvasSideMenuBar;
