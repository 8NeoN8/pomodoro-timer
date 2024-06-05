
<template>
  <div class="container">

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
            {{timer.hours}} : {{timer.minutes}} : {{ timer.seconds }}
          </div>
        </template>
  
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
  
        <div class="sets-count">
          <span>Pomodoro Count:</span> <span>{{pomoSetCount}}</span>
        </div>
      </div>
      <div class="option-buttons">
  
        <button class="option-button" @click="startTimer()"> Start </button>
  
        <button class="option-button" @click="pauseTimer()"> Pause </button>
  
        <button class="option-button" @click="continueTimer()"> Continue </button>
  
        <button class="option-button" @click="stopTimer()"> Stop </button>

      </div>  
    </div>
  </div>
</template>
<script>

export default{
  components:{
  },
  data() {
    return {
      pomoTime:25,
      breakTime:5,
      pomoSetCount:0,
      isRunning: false,
      isPaused: false,
      timeForFocus: true,
      timeForRelax: true,
      timer:{
        seconds: 0,
        hours: 0,
        minutes: 0
      },
      pomodoroFinished: false,
      
    }
  },
  computed:{
    focusTime(){
      return this.pomoTime
    }
  },
  methods: {
    run(){
      this.isRunning = true;
      this.isPaused = false;
    },
    pause(){
      this.isRunning = false;
      this.isPaused = true;
    },
    stop(){
      this.isRunning = false;
      this.isPaused = false;
    },
    setupCountdown(){ 

      this.timer.hours = 0
      this.timer.minutes = 0
      this.timer.seconds = 0

      if(!this.timeForFocus){
        this.timer.minutes = this.breakTime
        this.$emit('increaseSets')
        return
      }

      if(!this.timeForFocus){
        this.timer.minutes = this.breakTime
        this.$emit('increaseSets')
        return
      }

      this.timer.minutes = this.focusTime


      if(this.focusTime > 60){
        this.timer.hours = '01'
        let newMinutes = this.focusTime - 60
        this.timer.minutes = newMinutes < 10 ? `0${newMinutes}` : newMinutes
      }

      },
      countDown(){

      if(!this.isRunning) return
      let continueDown = true

      setTimeout(() => {

        if(this.timer.seconds <= 0){
          this.timer.seconds = 60
          this.timer.minutes--
          if(this.timer.minutes < 10) this.timer.minutes = `0${this.timer.minutes}`
        }

        if(this.timer.minutes < 0 && this.timer.hours == '01'){
          this.timer.minutes = 59
          this.timer.hours = 0
        }

        if(this.timer.minutes <= 0 && this.timer.hours == 0 && this.timer.seconds == 1){
          continueDown = false
          this.pomodoroFinished = true
          this.isRunning = false
          this.timer.hours = 0
          this.timer.seconds = 0
          this.timer.minutes = 0
        }


        

        if(continueDown){
          this.timer.seconds--
          if(this.timer.seconds < 10) this.timer.seconds = `0${this.timer.seconds}`
        }

        if(!this.isRunning && !this.isPaused){
          this.pomodoroFinished = true
          this.isRunning = false
          this.timer.hours = 0
          this.timer.seconds = 0
          this.timer.minutes = 0
        }
        
        if (this.pomodoroFinished) {
          this.stopTimer()
          this.timeForFocus = false
          this.setupCountdown
        }

        if(this.isRunning) this.countDown()
        
      }, 10);

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
      this.pauseTimer()
      this.isRunning = false
      this.isPaused = false
      this.$emit('stopCountdown')

      this.timer.hours = 0
      this.timer.seconds = 0
      this.timer.minutes = 0
      },

  },
  watch:{
    pomoTime(){
      this.pomoTime = parseInt(this.pomoTime)
    },
    breakTime(){
      this.breakTime = parseInt(this.breakTime)
    },
    
  }
}
</script>

<style>
@import './assets/styles/app/appStyles.css';
</style>
