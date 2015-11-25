describe('showArrow', function() {
    it('should indicate the right player', function() {
        showArrow(3);
        expect($('.player1 > .arrow').hasClass('inv')).toBe(true);
        expect($('.player2 > .arrow').hasClass('inv')).toBe(false);
        showArrow(0);
        expect($('.player1 > .arrow').hasClass('inv')).toBe(false);
        expect($('.player2 > .arrow').hasClass('inv')).toBe(true);
    });
});

describe('winningCombos', function() {
    var comboCount;
    beforeAll(function() {
        comboCount = 0;
    });
    it('should have three cells in each combinations', function() {
        for (var k in winningCombos) {
            expect(winningCombos[k].length).toEqual(3);
            comboCount++;
        }
    });
    it('should be able to enumerate all winning combinations', function() {
        expect(comboCount).toBe(8);
    });
});

describe('potentialCombos', function() {
    it('should be able to return what combinations to check', function() {
        for (var i = 0; i < 9; i++) {
            var combos = potentialCombos[i];
            for (var k in winningCombos) {
                if (combos.indexOf(k) !== -1) {
                    expect(winningCombos[k].indexOf(i)).not.toBe(-1);
                } else {
                    expect(winningCombos[k].indexOf(i)).toBe(-1);
                }
            }
        }
    });
});

describe('initGame', function() {
    beforeAll(function() {
        gameOver = true;
        for (var i = 0; i < 9; i++) {
            currentState[i] = 1;
        }
        currentStep = 5;
        cells.addClass('win');
        initGame();
    });
    it('should set all 9 current states to null', function() {
        for (var i = 0; i < 9; i++) {
            expect(currentState[i]).toBeNull();
        }
    });
    it('should set current step to 0', function() {
        expect(currentStep).toBe(0);
    });
    it('should set game over to false', function() {
        expect(gameOver).toBe(false);
    });
    it('should remove winning mark on cells', function() {
        expect($('.cell.win').length).toBe(0);
    });
    it('should remove all messages', function() {
        expect($('.ss').text()).toBe('');
    });
});

describe('checkCombo', function() {
    beforeAll(function() {
        gameOver = true;
        initGame();
        currentState[0] = symbols[0];
        currentState[4] = symbols[0];
        currentState[8] = symbols[0];
        currentState[1] = symbols[1];
        currentState[7] = symbols[1];
    });
    it('should take a cell combination and determine if a player by making that combination', function() {
        expect(checkCombo(winningCombos['combo6'])).toBe(true);
        expect(checkCombo(winningCombos['combo4'])).toBe(false);
    });
});

describe('cellClickHandler', function() {
    beforeEach(function() {
        gameOver = true;
        initGame();
    });
    afterAll(function() {
        gameOver = true;
        initGame();
    });
    it('should update cell states', function() {
        cells.eq(0).click();
        expect(currentState[0]).toBe(symbols[0]);
        cells.eq(3).click();
        expect(currentState[3]).toBe(symbols[1]);
        cells.eq(3).click();
        expect(currentState[3]).toBe(symbols[1]);
        cells.eq(4).click();
        expect(currentState[4]).toBe(symbols[0]);
    });
    it('should correctly call game', function() {
        cells.eq(0).click();
        expect(gameOver).toBe(false);
        cells.eq(3).click();
        expect(gameOver).toBe(false);
        cells.eq(3).click();
        expect(gameOver).toBe(false);
        cells.eq(4).click();
        expect(gameOver).toBe(false);
        cells.eq(5).click();
        expect(gameOver).toBe(false);
        cells.eq(8).click();
        expect(gameOver).toBe(true);
    });
});
