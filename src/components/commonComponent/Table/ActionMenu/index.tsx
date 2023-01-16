import { IconButton, Menu, MenuItem, Box, SvgIcon } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Span from "components/commonComponent/Span";
import COLORS from "../../../../constants/colors";
import useStyles from "./style";
import { useState } from "react";

export type MenuType = {
  label: string;
  icon?: JSX.Element;
  onClick: (event: React.MouseEvent<HTMLElement>, id: string) => void;
  access: boolean;
};

interface IActionMenuProps {
  menu: MenuType[];
  id: string;
}

export default function ActionMenu(props: IActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { menu } = props;

  const showActions = Boolean(anchorEl);
  const classes = useStyles();

  function handleClose(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(null);
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }

  return (
    <>
      <IconButton aria-label="add to shopping cart" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id={`long-menu-`}
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={showActions}
        onClose={handleClose}
      >
        {menu.map(
          (menuItem) =>
            menuItem.access == true && (
              <MenuItem
                onClick={(event) => {
                  menuItem.onClick(event, props.id);
                  handleClose(event);
                }}
              >
                <Box className={classes.numberOfRows}>
                  {menuItem.icon ? (
                    <SvgIcon
                      fontSize="small"
                      style={{ marginRight: 4, color: COLORS.SECONDARY_FONT }}
                    >
                      {menuItem.icon}
                    </SvgIcon>
                  ) : null}

                  <Span fontType="secondary" size="extra-small">
                    {menuItem.label}
                  </Span>
                </Box>
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
}
