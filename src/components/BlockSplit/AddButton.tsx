import React from "react";
import { IconButton, MenuItem } from "@material-ui/core";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";

import { PopoverAnchor } from "components/PopoverAnchor";
import { useBlockSplit } from "./Store";
import { WorkingTime } from "models";

export const AddButton = ({ className }: { className: string }) => {
  const [{ isEdit }, actions] = useBlockSplit();
  const snaps = actions.snaps();
  return isEdit && snaps.length ? (
    <div className={className}>
      <PopoverAnchor
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        renderAnchor={(setAnchor) => (
          <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)}>
            <PlaylistAdd />
          </IconButton>
        )}
      >
        {(close) => {
          return (
            <>
              {actions.snaps().map((value) => {
                return (
                  <MenuItem
                    key={value}
                    component="label"
                    onClick={() => {
                      actions.blockAdd(value);
                      close();
                    }}
                  >
                    {WorkingTime.minusFormat(value)}
                  </MenuItem>
                );
              })}
            </>
          );
        }}
      </PopoverAnchor>
    </div>
  ) : null;
};
