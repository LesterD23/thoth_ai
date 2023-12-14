import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";

function App2() {
  // typing indicator (1): const[typing , setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am Thoth AI. How can I help you?",
      sender: "Thoth_AI"
    }
  ]) // []

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    const newMessages = [...messages, newMessage]; // all the old messages + the new message

    // update out messages state
    setMessages(newMessages);

    // set a typing indicator (chatgpt is typing...)
    // (1) setTyping(true);

    // process manage to ChatGPT (send it over and see the response)
    await processMessageToChatGPT(newMessages);
  }

  async function processMessageToChatGPT(chatMessages) {
    // chatMessages {sender: "user" or "thoth ai" or "chatGPT", message: "The message content"}
    // apiMessages {role: "user" or "assitant", content: "The message content"}

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Thoth_AI") {
        role = "assistant";
      }
      else {
        role = "user";
      }
      return {role: role, content: messageObject.message};
    });

    // role: "user" -> a message from the user
    // role: "bot" -> a response from chat gpt
    // role: "system" -> generally one initial message HOW we want chat gpt to respond

    const systemMessage = {
      role: "system",
      content: "Explain like I am a ten years old child."
       // Explain like I am a pirate or Explain like I am a third year college student
    }

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        ...apiMessages // [message1, message2, message3]
      ]
    }
    
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then ((data) => {
      console.log(data);
      console.log(data.choices[0].message.content);
      setMessages(
        [...chatMessages, {
          sender: "Thoth_AI", 
          message: data.choices[0].message.content,
          }]
      );
      // (1) setTyping(false);
    })
  }

  return (
    <div className='App'>
      <div style={{height: "500px", weight: "700px", width: "300px"}}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              // (1) typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing..." /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App2
