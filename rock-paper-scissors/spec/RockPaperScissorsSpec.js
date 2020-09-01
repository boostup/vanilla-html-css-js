describe("A Rock Paper Scissors game", function() {
 
	var gameLogic,
		possibleValues;

	beforeEach(function() {
		gameLogic = new window.FHB.RockPaperScissors(
			window.FHB.errorHandling, 
			window.FHB.helpers);

		possibleValues = [
							gameLogic.possibleMoves[0].name,
							gameLogic.possibleMoves[1].name,
							gameLogic.possibleMoves[2].name,
						];
	});

	it("currently should include only 3 valid moves", function() {
		expect(gameLogic.possibleMoves.length).toEqual(3);
	})

	it("should return a valid move name", function() {
		expect(possibleValues).toContain(gameLogic.getRandCardName());
	});	

	it("should throw an error when INVALID move name is supplied", function() {
		expect(function() {
			gameLogic.evaluate("someInvalidMoveName", "paper");
		}).toThrow();
	});

	it("should NOT throw an error when VALID move name is supplied", function() {
		expect(function() {
			gameLogic.evaluate("paper", "rock");
		}).not.toThrow();
	});	

});