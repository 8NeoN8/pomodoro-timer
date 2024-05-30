
<template>
  <div class="container">
    <PomodoroTimer 
      :focusTime="pomoTime" 
      :breakTime="breakTime" 
      @runCountdown="run()"
      @pauseCountdown="pause()"
      @stopCountdown="stop()"
    ></PomodoroTimer>

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
  </div>
</template>
<script>
import PomodoroTimer from './components/pomodoroTimer/PomodoroTimer.vue';

export default{
  components:{
    PomodoroTimer   
  },
  data() {
    return {
      pomoTime:25,
      breakTime:5,
      pomoSetCount:0,
      isRunning: false,
      isPaused: false,
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
