$(function() {
    "use strict";
    var cells = $('.cell');
    var symbols = ['&#10799;', '&#9675;'];
    var currentStep = 0,
        currentState = {};
    var gameOver = true;
    var winningCombos = {
        0: [0, 1, 2],
        1: [3, 4, 5],
        2: [6, 7, 8],
        3: [0, 3, 6],
        4: [1, 4, 7],
        5: [2, 5, 8],
        6: [0, 4, 8],
        7: [2, 4, 6]
    };
    var potentialCombos = {
        0: [0, 3, 6],
        1: [0, 4],
        2: [0, 5, 7],
        3: [1, 3],
        4: [1, 4, 6, 7],
        5: [1, 5],
        6: [2, 3, 7],
        7: [2, 4],
        8: [2, 5, 6],
    };

    var showArrow = function(p) {
        if (p % 2 === 0) {
            $('.player1 > .arrow').removeClass('inv');
            $('.player2 > .arrow').addClass('inv');        
        } else {
            $('.player1 > .arrow').addClass('inv');
            $('.player2 > .arrow').removeClass('inv');            
        }
    };

    var initGame = function() {
        if (gameOver) {
            cells.empty();
            for (var i = 0; i < 9; i ++) {
                currentState[i] = null;
            }
            currentStep = 0;
            showArrow(currentStep);
            gameOver = false;
            cells.removeClass('win');
            $('.ss').text('');
        }
    };
    initGame();
    var winResizeHandler = function() {
        var c = cells;
        var w = c.width();
        c
        .css({
            'line-height': w * 0.92 + 'px',
            'font-size': w + 'px'
        })
        .height(w);
    };
    $(window)
        .resize(winResizeHandler)
        .keydown(function(e) {
            e.preventDefault();
            initGame();
        });
        
    winResizeHandler();

    var checkCombo = function(a) {
        var a0 = currentState[a[0]],
            a1 = currentState[a[1]],
            a2 = currentState[a[2]];
        var w = (a0 === a1 && a1 === a2);
        if (w) {
            $('.cell[data-i="' + a[0] + '"]').addClass('win');
            $('.cell[data-i="' + a[1] + '"]').addClass('win');
            $('.cell[data-i="' + a[2] + '"]').addClass('win');
        }
        return w;
    };

    cells.click(function(e) {
        if (!gameOver) {
            var $this = $(this);
            var i = $this.data('i');
            if (currentState[i] === null) {
                var s = symbols[currentStep++ % 2];
                currentState[i] = s;
                $this.html(s);
                for (var j = 0, len = potentialCombos[i].length; j < len; j++) {
                    if (checkCombo(winningCombos[potentialCombos[i][j]])) {
                        console.log(s + 'won');
                        gameOver = true;
                        $('.ss').text('按任意鍵重新開始~');
                        return;
                    }
                }
                if (currentStep === 9) {
                    gameOver = true;
                    $('.ss').text('平手! 按任意鍵重新開始~');
                    return;
                }
                showArrow(currentStep);
            }
        }
    });
});