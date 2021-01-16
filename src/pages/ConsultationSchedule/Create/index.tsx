import React, { useState } from "react";
import { Container, Grid, Box } from "@material-ui/core";
import BlockSplit from "components/BlockSplit";
import { RangeInline } from "components/DatePicker/RangeInline";
import { IBlock } from "components/BlockSplit/Store";

const ConsulteantionCreate: React.FC = () => {
  const [, setBlocks] = useState<IBlock[]>([]);
  const [, setDates] = useState<{ from?: Date; to?: Date }>({});
  return (
    <Container>
      <Grid container>
        <Grid item component={Box} height="calc(100vh - 200px)">
          <BlockSplit begin={8 * 60} end={18 * 60} onSelected={setBlocks} />
        </Grid>
        <Grid item component={Box} pr={2} flex={0}>
          <RangeInline onSelect={setDates} />
        </Grid>
        <Grid item style={{ flex: 1 }}></Grid>
      </Grid>
    </Container>
  );
};

export default ConsulteantionCreate;
