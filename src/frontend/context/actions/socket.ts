import ChatInterface, { MessageInterface } from '../../utils/interface/Chat';
import { ActionType } from '../../utils/interface/Socket';

export const chatEvent = (dispatch, chats: ChatInterface[], activeChat: ChatInterface) => {
  return (action: ActionType<ChatInterface>) => {
    const event = action.actionType;
    if (event === 'chat_created') {
      chats.push(action.data);
    } else if (event === 'chat_edited') {
      const chat = chats.find((cht) => cht._id === action.data._id);
      if (chat) {
        const idx = chats.findIndex((cht) => cht._id === action.data._id);
        const lastMessage = action.data.messages[action.data.messages.length - 1];
        chats.splice(idx, 1, { ...chat, lastMessage, name: action.data.name });
      }

      if (activeChat._id === action.data._id) {
        dispatch({ type: 'GET_CHAT', chat: action.data });
      }
    }

    dispatch({ type: 'GET_CHATS', chats });
  };
};

export const messageEvent = (dispatch, chats: ChatInterface[], chat: ChatInterface, isSocketEvent: boolean = true) => {
  return (action: ActionType<{ chat: ChatInterface; message: MessageInterface }>) => {
    const eventChat = action.data.chat;
    const chatIdx = chats.findIndex((cht) => cht._id === action.data.chat._id);
    if (chatIdx >= 0) {
      const { messages } = eventChat;
      const messageIdx = messages.findIndex((msg) => msg._id === action.data.message._id);

      if (chat && chat._id === eventChat._id && !isSocketEvent) {
        if (action.actionType === 'edited' || action.actionType === 'readed') {
          messages.splice(messageIdx, 1, action.data.message);
        } else if (action.actionType === 'deleted') {
          messages.splice(messageIdx, 1);
        } else if (action.actionType === 'created') {
          eventChat.messages = [...(eventChat.messages || []), action.data.message];
        }
      }

      if (action.data.message._id === chats[chatIdx].lastMessage._id) {
        if (action.actionType === 'edited' || action.actionType === 'readed') {
          chats.splice(chatIdx, 1, { ...chats[chatIdx], lastMessage: action.data.message });
        } else if (action.actionType === 'deleted') {
          chats.splice(chatIdx, 1, { ...chats[chatIdx], lastMessage: messages[(messages.length - 1)] });
        }
      }

      if (action.actionType === 'created') {
        chats.splice(chatIdx, 1, { ...chats[chatIdx], lastMessage: action.data.message });
      }

      dispatch({ type: 'GET_CHATS', chats });
      dispatch({ type: 'GET_CHAT', chat: { ...chat, messages: chat && chat._id === eventChat._id ? eventChat.messages : chat.messages } });
    }
  };
};
