<template>
  <div class="countdown-timer">
    <div class="timer">

      <template v-if="timeForFocus">
        <h1 class="focus-header"> Time to Focus </h1>
        <div class="display-time">
          {{timer.hours}} : {{timer.minutes}} : {{ timer.seconds }}
        </div>
      </template>

      <template v-if="!timeForFocus">
        <h1 class="focus-header"> Time to Relax </h1>
        <div class="display-time">
          Hour : minutes : seconds {{ focusTime}} {{ breakTime }}
        </div>
      </template>


    </div>

    <div class="option-buttons">

      <button class="option-button" @click="startTimer()" v-if="!isRunning && !isPaused"> Start </button>

      <button class="option-button" @click="pauseTimer()" v-if="isRunning && !isPaused"> Pause </button>

      <button class="option-button" @click="continueTimer()" v-if="isPaused"> Continue </button>

      <button class="option-button" @click="stopTimer()" v-if="isRunning || isPaused" > Stop </button>

    </div>
  </div>
</template>

<script>
export default {
  name:'PomodoroTimer',
  props:{
    focusTime: {
      type: Number,
      required: true
    },
    breakTime:{
      type: Number,
      required: true,
    },
  },
  emits:[
  'runCountdown','pauseCountdown','stopCountdown'
  ],
  data() {
    return {
      isRunning: false,
      isPaused: false,
      timeForFocus: true,
      timer:{
        seconds: '00',
        hours:'00',
        minutes: '00'
      },
      pomodoroFinished: false,
    }
  },
  computed:{
    /* countdownFocus(){
      let time = {
        hour: 0,
        minutes: this.focusTime
      }
      if(this.focusTime > 60){
        time.hour = 1
        time.minutes = this.focusTime - 60
      }
      return time
    },
    countdownBreak(){
      return this.breakTime
    }, */
  },
  created() {
    
  },
  mounted() {
  },
  methods: {
    setupCountdown(){ 
      
      if(!this.timeForFocus){
        this.timer.minutes = this.breakTime
        this.$emit('increaseSets')
        return
      }
      

      if(this.focusTime > 60){
        this.timer.hours = '01'
        let newMinutes = this.focusTime - 60
        this.timer.minutes = newMinutes < 10 ? `0${newMinutes}` : newMinutes
      }

    },
    countDown(){

      if(!this.isRunning) return

      if(this.timer.minutes == 0 && this.timer.seconds <= 0){
        this.pomodoroFinished = true
      }

      
      setTimeout(() => {

        if(this.timer.seconds <= 0){
          this.timer.seconds = 60
        }

        if(this.timer.minutes){

        }


        this.timer.seconds--
        if(this.isRunning) this.countDown()
      }, 1000);

      /* if(!this.isRunning) return

      this.timerSeconds--
      if(this.seconds <= 0){
        this.seconds = 29
        this.countdownFocus.minutes--
      }

      if(this.countdownFocus.hour == 1){
        if (this.countdownFocus.minutes <= 0) {
          this.countdownFocus.minutes = 59
          this.countdownFocus.hour = 0
        }
      }


      setTimeout(() => {
        this.countDown()
      }, 1100); */
    },
    startTimer(){
      this.isRunning = true
      this.isPaused = false
      this.$emit('runCountdown')
      this.setupCountdown()
      this.countDown()
    },
    pauseTimer(){
      this.isRunning = false
      this.isPaused = true
      this.$emit('pauseCountdown')
    },
    continueTimer(){
      this.isRunning = true
      this.isPaused = false
      this.$emit('runCountdown')
      this.countDown()
    },
    stopTimer(){
      this.isRunning = false
      this.isPaused = false
      this.$emit('stopCountdown')

      this.timer.hours = '00'
      this.timer.seconds = '00'
      this.timer.minutes = '00'
    },
  },
}
</script>

<style>
@import '../..//assets/styles/pomodoroTimer/pomodoroTimerStyles.css'
</style>
