import MessageInterface from './MessageInterface';


class Message implements MessageInterface {
  id !: number;
  sender !: number;
  content !: string;
  isReaded !: boolean;
  creationDate !: any;
  chat_hist_id !: number;
  messageType !: string;

  constructor(sender : number, content : string){
      this.sender = sender;
      this.content = content;
      this.messageType = 'TEXT'
  } 

  getFormattedData(receiver_id : number){
    return {
      user_sender_id : this.sender,
      user_reciever_id : receiver_id,
      body : this.content,
      type : this.messageType
    }
  }
}


export default Message;