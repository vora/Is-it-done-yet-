export type StatusType =
  | "Active"
  | "In-review"
  | "Needs changes"
  | "Approved"
  | "In-development";

export interface IMessageType {
  ticketNumber: string;
  status: StatusType;
  resizeWindow?: boolean;
}

export interface IPluginMessage {
  type: string;
  message: IMessageType;
}

export interface IFrameNodeData {
  status: StatusType;
  ticketNumber?: string;
  frameName: string;
}
