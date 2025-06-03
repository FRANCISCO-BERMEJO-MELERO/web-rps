// utils/registry.js
import { Registry } from "@cosmjs/proto-signing";
import { MsgCreateGame, MsgJoinGame, MsgPlayMove, MsgRevealMove, MsgClaimTimeout } from "../types/generated/red/rps/tx";

export const customRegistry = new Registry([
  ["/red.rps.MsgCreateGame", MsgCreateGame],
  ["/red.rps.MsgJoinGame", MsgJoinGame],
  ["/red.rps.MsgPlayMove", MsgPlayMove],
  ["/red.rps.MsgRevealMove", MsgRevealMove],
  ["/red.rps.MsgClaimTimeout", MsgClaimTimeout],
]);
