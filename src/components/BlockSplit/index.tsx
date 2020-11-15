import React, { useEffect } from "react";
import { IconButton } from "@material-ui/core";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import DoneAll from "@material-ui/icons/DoneAll";

import { useStyles } from "./Styles";
import { useBlockSplit, Container, IBlock } from "./Store";
import { BlockEdit, BlockSelect } from "./Block";
import { AddButton } from "./AddButton";
import { WorkingTime } from "models";

const Spliter = ({
  label,
  classes,
}: {
  label: string;
  classes: { root: string; label: string };
}) => {
  return (
    <div className={classes.root}>
      <div className={classes.label}>
        <span>{label}</span>
        <ChevronRight />
      </div>
    </div>
  );
};

const BlockSplit = ({
  onSelected,
}: {
  onSelected?: (blocks: IBlock[]) => any;
}) => {
  const classes = useStyles();
  const [
    { isEdit, blocks, length, begin, selected },
    actions,
  ] = useBlockSplit();
  const spliter = (minus: number, key?: string) => (
    <Spliter
      key={key}
      label={WorkingTime.minusFormat(minus)}
      classes={{ root: classes.spliter, label: classes.spliterTime }}
    />
  );

  useEffect(() => {
    onSelected?.(selected);
  }, [onSelected, selected]);

  return (
    <div className={classes.root}>
      {spliter(begin)}
      <div className={classes.content}>
        {blocks
          .map((block, index) => {
            const height = (block.value / length) * 100 + 0.5 + "%";
            return (
              <div
                key={`block-${index}`}
                className={classes.block}
                style={{ height }}
              >
                {isEdit ? (
                  <BlockEdit
                    key={index}
                    index={index}
                    className={classes.noRipper}
                  />
                ) : (
                  <BlockSelect key={index} index={index} />
                )}
              </div>
            );
          })
          .seperate((index) => spliter(blocks[index].to, `spriter-${index}`))}
        <AddButton className={classes.addButton} />
      </div>
      {spliter(begin + length)}

      <IconButton color="secondary" size="small" onClick={actions.editToggle}>
        {isEdit ? <DoneAll /> : <Edit />}
      </IconButton>
    </div>
  );
};

type BlockSplitProps = {
  begin: number;
  end: number;
  onSelected?: (blocks: IBlock[]) => any;
};

export default ({ onSelected, ...props }: BlockSplitProps) => {
  return (
    <Container {...props}>
      <BlockSplit onSelected={onSelected} />
    </Container>
  );
};
