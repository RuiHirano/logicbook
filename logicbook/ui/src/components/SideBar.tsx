import React, { useState } from "react";
import { Drawer, Box, Typography, List, ListItem, Divider, ListItemIcon, ListItemText, Collapse, ListItemButton } from '@mui/material'
import { Apps, BookmarkBorder, ExpandMore, ExpandLess } from '@mui/icons-material';

export interface Props {
  logics: any[],
  onLogicClick: (logic: any) => void,
}

const SideBar: React.FC<Props> = ({ logics, onLogicClick }) => {

  const sortedLogics = logics.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  const createData = () => {
    const clses: any = {}
    const funcs: any = {}
    logics.forEach((logic) => {
      if (logic.class_name !== null) {
        if (clses[logic.class_name] === undefined) {
          clses[logic.class_name] = [logic]
        } else {
          clses[logic.class_name].push(logic)
        }
      } else {
        funcs[logic.name] = logic
      }
    })
    return { "classes": clses, "funcs": funcs }
  }
  const data = createData()
  const [open, setOpen] = useState(Object.keys(data.classes).map((class_name) => false));


  const list = () => (
    <div style={{ width: 250 }}>
      <Box
        sx={{ width: 250 }}
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
          {Object.keys(data.classes).map((class_name, i) => {
            console.log(class_name)
            const funcs = data.classes[class_name]
            return (
              <div>
                <ListItem dense button key={class_name} onClick={() => {
                  const newOpen = [...open]
                  newOpen[i] = !newOpen[i]
                  setOpen(newOpen)
                }}>
                  <ListItemIcon>
                    <Apps />
                  </ListItemIcon>
                  <ListItemText primary={class_name} />
                  {open[i] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                </ListItem>

                <Collapse in={open[i]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {funcs.map((func: any) => {
                      return (
                        <ListItem dense button key={func.name} sx={{ pl: 4 }} onClick={() => onLogicClick(func)}>
                          <ListItemIcon>
                            <BookmarkBorder />
                          </ListItemIcon>
                          <ListItemText primary={func.name} />
                        </ListItem>
                      )
                    })}
                  </List>

                </Collapse>
              </div>
            )
          })}
          {Object.keys(data.funcs).map((func_name: string) => {
            const logic = data.funcs[func_name]
            return (
              <div>
                <ListItem dense button key={logic.name} onClick={() => onLogicClick(logic)}>
                  <ListItemIcon>
                    <BookmarkBorder />
                  </ListItemIcon>
                  <ListItemText primary={logic.name.split("/")[0]} />
                </ListItem>

              </div>
            )
          })}
        </List>
      </Box>
    </div>
  );
  return (
    <div style={{ width: 250 }}>
      <Drawer
        anchor={'left'}
        variant="permanent"
        open={true}
        onClose={() => { }}
      >
        {list()}
      </Drawer>
    </div>
  )
};

export default SideBar;
