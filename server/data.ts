export type IQuerystring = {
  position: string;
};

export type IReply = {
  200: { resultValue: number };
  400: { error: string };
};
