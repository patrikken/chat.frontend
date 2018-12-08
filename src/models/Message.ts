declare interface Message {
    id: number,
    sender: number,
    content: string, 
    isReaded : boolean,
    creationDate : any,
    chat_hist_id : number,
    messageType : string
  }

  export default Message;