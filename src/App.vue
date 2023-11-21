<script setup>
import {ref} from "vue";
import Test from "./components/Test.vue";
import Chat from "./components/Chat.vue";

const isRecording = ref(false)
const mediaRecorder = ref(null)
const recordedChunks = ref([])
const isSending = ref(false)


const startRecording = () => {
  recordedChunks.value = []
  isRecording.value = true
  navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
    mediaRecorder.value = new MediaRecorder(stream);
    mediaRecorder.value.addEventListener('dataavailable', (event) => {
      recordedChunks.value.push(event.data)
    })
    mediaRecorder.value.start()
  }).catch((error) => {
    console.error('Error accessing microphone:', error);
  })
}

const stopRecording = () => {
  isRecording.value = false
  mediaRecorder.value.stop()
}

const sendToServer = (voiceData) => {
  fetch('/api/get/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({voiceData}),
  }).then(res => {
    res.text()
  }).then((reply) => {
    console.log('Reply:', reply);
    // 在这里处理后端返回的回复
  }).catch((error) => {
    console.error('Error sending voice message:', error);
  })
}

const sendVoiceMessage = () => {
  isSending.value = true
  const blob = new Blob(recordedChunks.value, {type: 'audio/webm'});
  const reader = new FileReader();
  reader.onloadend = () => {
    const voiceData = reader.result.split(',')[1];
    recordedChunks.value = [];
    sendToServer(voiceData);
  };
  reader.readAsDataURL(blob);
}


const onXiApi = () => {
  const options = {
    method: 'POST',
    headers: {
      'xi-api-key': '45cd7dc97cd931754b7293d84d8bc2aa',
      'Content-Type': 'application/json'
    },
    body: '{"model_id":"eleven_monolingual_v1","text":"你好，今天天气真好"}'
  };

  fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream', options)
      .then(response => {
        const url = new Blob([response.body],{type:"audio/mpeg"})
        console.log('url');
        console.log(url);
        const src = URL.createObjectURL(url)
        const audioElement = new Audio();

        audioElement.src = src;

        audioElement.play();
      })

}

</script>

<template>
  <div>
    <!--    <button @click="startRecording" :disabled="isRecording">Start Recording</button>-->
    <!--    <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>-->
    <!--    <button @click="sendVoiceMessage" :disabled="isRecording || isSending">Send Message</button>-->
    <Test/>
    <div @click="onXiApi">xi-api</div>
    <!--    <Chat/>-->
  </div>
</template>

<style scoped>

</style>
