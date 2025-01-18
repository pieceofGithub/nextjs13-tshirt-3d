import { proxy } from "valtio";

interface State {
  color: string;
  textures: {
    front: string | null;
    back: string | null;
    sleeves: string | null;
  };
}

const state = proxy<State>({
  color: "#EFBD48",
  textures: {
    front: null,
    back: null,
    sleeves: null,
  },
});

export default state;
