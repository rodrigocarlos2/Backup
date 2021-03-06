// Generated by CoffeeScript 1.12.2
(function() {
  var Game;

  Game = {
    init: function() {
      this.storage = localStorage;
      if (typeof this.storage.highestScore === 'undefined') {
        this.storage.highestScore = 0;
      }
      this.highestScore = parseInt(this.storage.highestScore);
      this.score = 0;
      this.updateScore();
      $('section').hide();
      $('section#start-game').show();
      $('a#start').click(function(ev) {
        ev.preventDefault();
        return Game.startGame();
      });
      $('a#next-question').click(function(ev) {
        ev.preventDefault();
        return Game.nextQuestion();
      });
      $('a#restart').click(function(ev) {
        ev.preventDefault();
        return Game.restart();
      });
      return Game.watchAnswering();
    },
    startGame: function() {
      this.score = 0;
      Game.updateScore();
      return Game.nextQuestion();
    },
    restart: function() {
      return Game.startGame();
    },
    nextQuestion: function() {
      var i, j, options, question, results;
      $('section').hide();
      $('section#game').show();
      this.factor_1 = this.randomNumber(11);
      this.factor_2 = this.randomNumber(10);
      question = this.factor_1 + " x " + this.factor_2;
      $('#question').html(question);
      this.answer = this.factor_1 * this.factor_2;
      options = [this.answer, this.randomNumber(110), this.randomNumber(110), this.randomNumber(110)];
      options = this.shuffleArray(options);
      console.log(options);
      results = [];
      for (i = j = 1; j <= 4; i = ++j) {
        $("#option-" + i).html(options[i - 1]);
        results.push($("#option-" + i)[0].dataset.val = options[i - 1]);
      }
      return results;
    },
    randomNumber: function(max) {
      return 1 + parseInt(max * Math.random());
    },
    shuffleArray: function(arr) {
      return arr.sort(function() {
        return 0.5 - Math.random();
      });
    },
    watchAnswering: function() {
      return $('.option-card').click(function() {
        var val;
        val = parseInt($(this).find('.option')[0].dataset.val);
        if (val === Game.answer) {
          return Game.correctAnswer();
        } else {
          return Game.wrongAnswer();
        }
      });
    },
    updateScore: function() {
      if (Game.score > Game.highestScore) {
        Game.storage.highestScore = Game.score;
        Game.highestScore = Game.score;
      }
      $('#highest-score').html(Game.highestScore);
      return $('#score').html(Game.score);
    },
    correctAnswer: function() {
      this.score++;
      this.updateScore();
      $('section').hide();
      return $('section#correct-answer').show();
    },
    wrongAnswer: function() {
      var helpMsg;
      $('section').hide();
      helpMsg = Game.factor_1 + " x " + Game.factor_2 + " = " + Game.answer;
      $('section#wrong-answer .help-msg').html(helpMsg);
      return $('section#wrong-answer').show();
    }
  };

  $(function() {
    return Game.init();
  });

}).call(this);
