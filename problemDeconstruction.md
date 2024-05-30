# Pomodoro Timer

## What it is and what it does:

In Essence, a pomodoro timer is a countdown timer that indicates or separates blocks of focus that is used to accomplish a task, originally being 25 minutes of work, with a set of 5 minutes to stop and relax, then another 25 minutes, repeated over 4 times to get a a full hour of focused attention to a task

### Now, how can it be deconstructed as smaller processes?

the basis is a single countdown, that recives an input in minutes, let's say 25, and after those X(25) minutes have concluded, it signalizes for a break, may it be through a sound alert or any other methods, then the countdown should then start the break timer with another input in minutes, lets's say 5 minutes, this is know as a single pomodoro, a block of 2 instances of a countdown, that may repeat however many times it has been stablished previously with another input of pomodoro blocks or sets, at the end it may show a summary of the time spent in focus, break, and the quantity of pomodoro sets


### Separated requirements

+ 1 input for the focus time, up to a maximum of 60 minutes
+ 1 input for the break time, up to a maximum of 30 minutes
+ single countdown timer that indicates the time left in the current block of time
+ pause, continue, stop, restart options for the current pomodoro
  + stop option skips the current pomodoro and pauses at the beginning of the next pomodoro if there is at least one more, else it finishes the session
+ stop and restart options for the full pomodoro session