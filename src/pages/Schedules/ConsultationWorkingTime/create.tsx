import React, { useState } from "react";
import { Container, Grid, Box, Button, IconButton } from "@material-ui/core";
import BlockSplit from "components/BlockSplit";
import { RangeInline } from "components/DatePicker/RangeInline";
import { IBlock } from "components/BlockSplit/Store";
import useAuthentication from "stores/AuthenticationsStore/authentication";
import { CloseButton } from "components/Notistack";
import { doctor as repoDoctor } from "services/repos";

import { useStyles } from "./style";
import { useSnackbar } from "notistack";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useHistory } from "react-router";

const timeDateConfig = 1000;

type Errors = {
  blocks?: string;
  dates?: string;
};

const ConsulteantionCreate: React.FC = () => {
  const classes = useStyles();
  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const [dates, setDates] = useState<{ from?: Date; to?: Date }>({});
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [state] = useAuthentication();
  const handleSave = () => {
    const timeStamps: number[] = [];
    const fromDate =
      Math.floor((dates.from?.getTime() || 0) / timeDateConfig) *
      timeDateConfig;
    const toDate =
      Math.floor((dates.to?.getTime() || 0) / timeDateConfig || fromDate) *
        timeDateConfig +
      1;
    if (fromDate) {
      for (let num = fromDate; num < toDate; num += 86400 * timeDateConfig) {
        timeStamps.push(num);
      }
    }

    const isError: Errors = {};
    if (!blocks.length) isError.blocks = "Please select block time";
    if (!timeStamps.length) isError.dates = "Please select time range";

    if (Object.values(isError).length) {
      return Object.entries(isError).forEach(([key, msg]) => {
        enqueueSnackbar(
          <CloseButton name="doctorWorkingTimeError" message={msg!} />,
          {
            key: "doctorWorkingTimeError" + key,
            variant: "error",
            preventDuplicate: true,
          },
        );
      });
    }

    console.log(
      "session:",
      blocks.map((block) => ({ ...block, seats: 10 })),
    );
    const listSessions = blocks.map((block) => ({ ...block, seats: 10 }));
    const workingTimes = listSessions.map((sesions) => {
      return {
        doctorId: state.account.externalId,
        dates: timeStamps,
        from: sesions.from,
        to: sesions.to,
        seats: sesions.seats,
      };
    });

    repoDoctor.batchCreate({
      workingTimes,
    });
  };

  return (
    <Container className={classes.root}>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
      >
        <IconButton
          onClick={() => {
            history.goBack();
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          type="submit"
        >
          Save
        </Button>
      </Box>
      <Box>
        <Grid container>
          <Grid item component={Box} pr={2} flex={0} width={258}>
            <RangeInline onSelect={setDates} />
          </Grid>
          <Grid item component={Box} height="calc(100vh - 200px)">
            <BlockSplit begin={8 * 60} end={18 * 60} onSelected={setBlocks} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ConsulteantionCreate;
