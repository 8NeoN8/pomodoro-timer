<template>
  <div class="container">

    <div class="countdown-timer">
      <div class="timer">
  
        <template v-if="timeToFocus">
          <h1 class="focus-header"> Time to Focus </h1>
        </template>
        <template v-if="timeToRelax">
          <h1 class="focus-header"> Time to Relax </h1>
        </template>
        <div class="display-time">
          {{timer.minutes}} : {{ timer.seconds }}
        </div>

      </div>
    </div>

    <div class="inputs-container">
      <div class="timer-inputs">
        <div class="focus-input">
          <label for="focusInput">Focus Minutes: </label>
          <input :disabled="isRunning || isPaused" type="range" step="5" min="5" max="90" value="25" name="focusInput" id="focusInput" v-model="pomoTime">
          <span class="input-display">
            {{ pomoTime }}
          </span>
        </div>
  
        <div class="break-input">
          <label for="breakInput">Break Minutes: </label>
          <input :disabled="isRunning || isPaused" type="range" step="1" min="1" max="30" value="5" name="breakInput" id="breakInput" v-model="breakTime">
          <span class="input-display">
            {{ breakTime }}
          </span>
        </div>
  
        <div class="autoplay-timer">
          <label for="">Auto start breaks and sets?</label>
          <input type="checkbox" name="autoplay-timer" id="autoplay-timer" v-model="autoplay">
        </div>
        <div class="sets-count">
          <span>Pomodoro Count:</span> <span>{{pomoSetCount}}</span>
        </div>

      </div>
      <div class="option-buttons">
  
        <button class="option-button" v-if="!isRunning && !isPaused" @click="setupCountdown(); startTimer()"> Start </button>
  
        <button class="option-button" v-if="isRunning" @click="pauseTimer()"> Pause </button>
  
        <button class="option-button" v-if="isPaused" @click="continueTimer()"> Continue </button>
  
        <button class="option-button" v-if="isRunning || isPaused" @click="stopTimer()"> Stop </button>

      </div>  
    </div>
  </div>
</template>

<script>
import timerEnd from './assets/audio/timerEnd.mp3'
export default{
  components:{
  },
  data() {
    return {
      pomoTime:5,
      breakTime:1,
      pomoSetCount:0,
      isRunning: false,
      isPaused: false,
      timeToFocus: true,
      timeToRelax: false,
      timer:{
        seconds: 0,
        minutes: 0
      },
      autoplay: false,
      audio: null,
    }
  },
  computed:{
    
  },
  created() {
    
  },
  mounted() {
    this.audio = new Audio(timerEnd)
    this.audio.volume = 0.1
  },
  methods: {
    setupCountdown(){ 
      
      this.timer.minutes = 0
      this.timer.seconds = 0
      
      if(this.timeToRelax){
        this.timer.minutes = this.breakTime
      }
      
      if(this.timeToFocus){
        this.timer.minutes = this.pomoTime
      }
    },
    startTimer(){
      this.isRunning = true
      this.isPaused = false
      this.countDown()
    },
    countDown(){
      if(!this.isRunning){
        
        return
      }

      setTimeout(() => {

        if(this.timer.seconds > 0) this.timer.seconds--

        if(this.timer.seconds <= 0){
          this.timer.seconds = 59
          this.timer.minutes--
        }

        if(this.timer.minutes <= 0){
          this.timer.minutes = 0
          this.timer.seconds = 0

          if(this.timeToRelax) this.pomoSetCount++;

          this.timeToFocus = !this.timeToFocus
          this.timeToRelax = !this.timeToRelax
          
          this.isRunning = false
          this.audio.pause()
          this.audio.currentTime = 0
          this.audio.play()
        }

        if(this.autoplay && this.timer.minutes <= 0){
          this.setupCountdown()
          this.startTimer()
          return
        }

        this.countDown()

      }, 1000);

    },
    pauseTimer(){
      this.isRunning = false
      this.isPaused = true
    },
    continueTimer(){
      this.isRunning = true
      this.isPaused = false
      this.countDown()
    },
    stopTimer(){
      this.isRunning = false
      this.isPaused = false
      this.setupCountdown()
    },

  },
  watch:{
  }
}
</script>

<style>
@import './assets/styles/app/appStyles.css';
</style>
