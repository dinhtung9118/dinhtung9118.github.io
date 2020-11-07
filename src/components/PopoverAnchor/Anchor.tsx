import React, { ReactNode, useState } from "react";
import { Popover, PopoverProps } from "@material-ui/core";

type IAnchorBuilder = (
  setAnchor: (el: Element) => void,
  open?: boolean,
) => ReactNode;
type IChildrenBuilder = (setClose: () => void) => ReactNode;

export type IAnchorProps = Omit<
  PopoverProps,
  "open" | "anchorEl" | "children"
  > & {
  renderAnchor: IAnchorBuilder;
  children: IChildrenBuilder;
};

export const PopoverAnchor = ({ renderAnchor, ...props }: IAnchorProps) => {
  const [anchor, setAnchor] = useState<Element>();
  const isOpen = Boolean(anchor);
  const close = () => setAnchor(undefined);
  return (
    <>
      {renderAnchor(setAnchor, isOpen)}
      <Popover
        {...props}
        open={isOpen}
        anchorEl={anchor}
        onClose={close}
        children={props.children(close)}
      />
    </>
  );
};
