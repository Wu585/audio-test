<script setup>
import {ref} from "vue";

const transcript = ref('')
const startSpeechRecognition = () => {
  const recognition = new webkitSpeechRecognition();
  console.log(recognition);
  console.log(recognition);
  recognition.lang = 'zh-CN'; // 设置语言
  recognition.start();
  recognition.onresult = (event) => {
    console.log('event');
    console.log(event);
    transcript.value = event.results[0][0].transcript;
    // sendTranscriptToBackend(transcript.value);
  };
}

const playText = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

const sendTranscriptToBackend = (transcript) => {
  // 发送语音识别文本到后端
  fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({transcript}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('data');
      console.log(data);
      playText(data.msg);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

</script>

<template>
  <div>
    <button @click="startSpeechRecognition">开始语音识别</button>
    <div>{{ transcript }}</div>
  </div>
</template>
