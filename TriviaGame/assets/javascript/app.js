$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
  })
  let trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 15,
    timerOn: false,
    timerId : '',
    // questions,options and answers data
    questions: {
      q1: 'What year was "Aliens" released?',
      q2: 'In "Aliens-1986", which character used the shotgun for close encounters?',
      q3: 'How many marines were sent to fight the aliens mentioned in "Aliens-1986"?',
      q4: 'Who directed the 1986 movie "Aliens"?',
      q5: 'Who designed the alien in "Aliens"?',
      q6: 'What famous quote is used in the "Alien-1979" trailer?',
      q7: 'What do they call the Alien?'
    },
    options: {
      q1: ['1984', '1987', '1989', '1986'],
      q2: ['Pvt.Drake', 'Ripley', 'Pvt.Hudson', 'Cpl.Hicks'],
      q3: ['100', '90', '11', '20'],
      q4: ['Steven Spielberg', 'Barry Levinson', 'James Cameron', 'Ridley Scott'],
      q5: ['H.R Giger','George Lucas','Gordon Carroll','Stan Winston'],
      q6: ['Darkness awaits','The perfect hunter in space','In space no one can hear you scream','They mostly come at night, Mostly'],
      q7: ['E.T', 'Xenomorph', 'Predator','Android']
    },
    answers: {
      q1: '1986',
      q2: 'Cpl.Hicks',
      q3: '11',
      q4: 'James Cameron',
      q5: 'H.R Giger',
      q6: 'In space no one can hear you scream',
      q7: 'Xenomorph'
    },
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      $('#game').show();
      $('#results').html('');
      $('#timer').text(trivia.timer);
      $('#start').hide();
      $('#remaining-time').show();
      trivia.nextQuestion();
    },
    nextQuestion : function(){
      // set timer to 15 seconds each question
      trivia.timer = 15;
      $('#timer').text(trivia.timer);
      // stop timer speed up
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      // all questions then indexes the current questions
      let questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      // all user options for the current question
      let questionOptions = Object.values(trivia.options)[trivia.currentSet];
      // append trivia guess options to html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
      }
      // the time has run out and increment unanswered, run result
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! Correct answer'+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        // append results
        $('#results').html('<h3>Thanks for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Play again!</p>');
        // start button to restart the game
        $('#start').show();
      }
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      // timer ID for gameResult setTimeout
      let resultId;
      // the answer to the current question being asked
      let currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      // if selected = the answer then increment correct
      if($(this).text() === currentAnswer){
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else increment incorrect
      else{
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
    },
    // remove previous question results and options
    guessResult : function(){
      // increment to next question set
      trivia.currentSet++;
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      // begin next question
      trivia.nextQuestion();
    }
  }