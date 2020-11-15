import { createStore, createContainer, createHook } from "react-sweet-state";

const sum = (nums: IBlock[]) => nums.reduce((a, b) => a + b.value, 0);

export type IBlock = {
  from: number;
  to: number;
  value: number;
  enable: boolean;
  selected: boolean;
};

const prepareBlocks = (blocks: IBlock[], first: number) => {
  for (let i = 0; i < blocks.length - 1; i++) {
    const block = blocks[i];
    const from = blocks[i - 1]?.to || first;
    block.from = from;
    block.to = from + block.value;
  }
};

export const BLOCKSPLITTIME_STORE = "BlockSplit";

const Store = createStore({
  initialState: {
    isEdit: false,
    begin: 480,
    length: 540,
    snaps: [15, 30, 45, 60, 75, 90, 105, 120],
    selected: Array<IBlock>(),
    blocks: Array<IBlock>(),
  },
  actions: {
    editToggle: () => ({ getState, setState }) => {
      const { isEdit, blocks } = getState();
      if (isEdit) {
        blocks.forEach((block) => {
          block.selected = block.enable ? block.selected : false;
        });
      }
      setState({ isEdit: !isEdit });
    },
    blockAdd: (value: number) => ({ getState, setState }) => {
      const { blocks, begin } = getState();
      const from = blocks.last?.to || begin;
      blocks.push({
        value,
        enable: true,
        selected: false,
        from,
        to: from + value,
      });
      setState({ blocks: [...blocks] });
    },
    blockUpdate: (index: number, value: number) => ({ getState, setState }) => {
      const { blocks, begin } = getState();
      blocks[index].value = value;
      prepareBlocks(blocks, begin);
      setState({ blocks: [...blocks] });
    },
    blockRemove: (index: number) => ({ getState, setState }) => {
      const { blocks } = getState();
      blocks.splice(index, 1);
      setState({ blocks: [...blocks] });
    },
    blockToggle: (index: number) => ({ getState, setState }) => {
      const { blocks } = getState();
      blocks[index].enable = !blocks[index].enable;
      setState({ blocks: [...blocks] });
    },

    snaps: (current = 0) => ({ getState }) => {
      const { snaps, length, blocks } = getState();
      const max = length - sum(blocks) + current;
      return snaps.filter((snap) => snap < max);
    },

    select: (index: number) => ({ getState, setState }) => {
      const { blocks } = getState();
      blocks[index].selected = !blocks[index].selected;
      setState({
        blocks: [...blocks],
        selected: blocks.filter((b) => b.selected),
      });
    },
  },
  name: BLOCKSPLITTIME_STORE,
});

export const Container = createContainer(Store, {
  onInit: () => (
    { setState },
    { begin, end }: { begin: number; end: number },
  ) => {
    setState({ begin, length: end - begin });
  },
});

export const useBlockSplit = createHook(Store);
