import React from "react";
import {
  Button,
  MenuItem,
  IconButton,
  Checkbox,
  Divider,
} from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { PopoverAnchor } from "components/PopoverAnchor";
import { useBlockSplit } from "./Store";
import { WorkingTime } from "models";

export const BlockEdit = ({
  index,
  className,
}: {
  index: number;
  className: string;
}) => {
  const [{ blocks }, actions] = useBlockSplit();
  const block = blocks[index];

  return (
    <PopoverAnchor
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      renderAnchor={(setAnchor) => (
        <Button
          variant="text"
          onClick={(e) => setAnchor(e.currentTarget)}
          className={block.enable ? "work" : "disable"}
        >
          {WorkingTime.minusFormat(block.value)}
        </Button>
      )}
    >
      {(close) => {
        return (
          <>
            <MenuItem component="div" className={className} disableGutters>
              <IconButton
                size="small"
                onClick={() => {
                  actions.blockRemove(index);
                  close();
                }}
              >
                <DeleteOutline color="error" />
              </IconButton>
              <Checkbox
                size="small"
                checked={block.enable}
                onChange={() => {
                  actions.blockToggle(index);
                  close();
                }}
              />
            </MenuItem>
            <Divider />
            {actions.snaps(block.value).map((value) => {
              return (
                <MenuItem
                  key={value}
                  component="label"
                  onClick={() => {
                    actions.blockUpdate(index, value);
                    close();
                  }}
                >
                  {value}'
                </MenuItem>
              );
            })}
          </>
        );
      }}
    </PopoverAnchor>
  );
};

export const BlockSelect = ({ index }: { index: number }) => {
  const [{ blocks }, actions] = useBlockSplit();
  const { enable, selected, value } = blocks[index];
  const className = selected ? " selected" : enable ? "rested" : "disable";

  return (
    <Button
      variant="text"
      onClick={(e) => actions.select(index)}
      className={className}
      disabled={!enable}
    >
      {WorkingTime.minusFormat(value)}
    </Button>
  );
};
