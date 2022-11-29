export interface IChat {
  friendId: string;
  friendName: string;
  avatarColor: string;
  messages: Array<IMessage> | Array<undefined>;
}
export class Chat implements IChat {
  friendId: string;
  friendName: string;
  avatarColor: string;
  messages: Array<IMessage> | Array<undefined>;
  constructor(options: IChat) {
    this.friendId = options.friendId;
    this.friendName = options.friendName;
    this.avatarColor = options.avatarColor;
    this.messages = options.messages;
  }
}
export interface IMessage {
  content: string;
  date: {
    time: {
      hours: string,
      minutes: string,
      seconds: string,
    };
    dayMonthYear: string
  }
  author: string;
}
