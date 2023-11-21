<template>
  <div class="app">
    <div class="chat-container">
      <div class="messages">
        <div class="message" v-for="message in messages" :key="message.id">
          {{ message.content }}
        </div>
      </div>
      <div class="input-container">
        <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type your message"/>
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import axios from "axios";

const messages = ref([])
const inputMessage = ref('')
const sendMessage = async () => {
  if (inputMessage.value.trim() === '') {
    return
  }
  messages.value.push({id: Date.now(), content: inputMessage.value, sender: 'user'});
  // inputMessage.value = '';
  try {
    const response = await axios.post('/api/chat', {message: inputMessage.value});
    messages.value.push({id: Date.now(), content: response.data.message, sender: 'chatbot'});
  } catch (error) {
    console.error(error);
  }
}

</script>

<style>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.chat-container {
  width: 400px;
  height: 600px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  padding: 10px;
  overflow-y: scroll;
}

.message {
  margin-bottom: 10px;
}

.input-container {
  display: flex;
  padding: 10px;
}

input {
  flex: 1;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 5px;
}

button {
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
