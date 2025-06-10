// utils/registry.js
import { Registry } from "@cosmjs/proto-signing";
import { MsgCreateGame, MsgJoinGame, MsgPlayMove, MsgRevealMove, MsgClaimTimeout } from "../types/types/roshambo/rps/tx";

export const customRegistry = new Registry([
  ["/roshambo.rps.MsgCreateGame", MsgCreateGame],
  ["/roshambo.rps.MsgJoinGame", MsgJoinGame],
  ["/roshambo.rps.MsgPlayMove", MsgPlayMove],
  ["/roshambo.rps.MsgRevealMove", MsgRevealMove],
  ["/roshambo.rps.MsgClaimTimeout", MsgClaimTimeout],
]);
