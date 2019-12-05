export interface IMessageType {
  ticketNumber: string;
  status: StatusType;
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

export type StatusType =
  | "Active"
  | "In-review"
  | "Needs changes"
  | "Approved"
  | "In-development";
