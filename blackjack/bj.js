var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
var stopLoop = true;
var playerCards = [];
var dealerCards = [];
var totalPointsOfPlayer;
var totalPointsOfDealer;
var canHit = true;
var canStand = true;

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    
    get desc() {
        var rank_str;
        if (this.rank == 1) 
            rank_str = "Ace";
        else if (this.rank == 11) 
            rank_str = "Jack";
        else if (this.rank == 12) 
            rank_str = "Queen";
        else if (this.rank == 13)
            rank_str = "King";
        else 
            rank_str = this.rank;
        
        return rank_str + " of " + suits[this.suit];
    }
    
    get image() {
        var rank_str;
        if (this.rank == 1) 
            rank_str = "A";
        else if (this.rank == 11) 
            rank_str = "J";
        else if (this.rank == 12) 
            rank_str = "Q";
        else if (this.rank == 13)
            rank_str = "K";
        else 
            rank_str = this.rank;
        
        return rank_str + suits[this.suit].charAt(0) + ".png";
    }
};

class Deck {
    constructor() {
        //Genertates all 52 cards in a deck
        this.deck = [];
        for(var suit = 0; suit < 4; suit++) //
        {
            for(var rank = 1; rank <= 13; rank++)
            {
                var card = new Card(suit, rank);  
                this.deck[this.deck.length] = card;
            }
        }
        
        this.currentTopCardIndex = 0;   //
    }
    
    shuffle() {
        for (var i = this.deck.length - 1; i > 0; i--)
        {

            // Pick a random index from 0 to i inclusive
            let j = Math.floor(Math.random() * (i + 1));

            // Swap arr[i] with the element
            // at random index
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    
    deal() {
        var topCard = this.currentTopCardIndex;
        this.currentTopCardIndex += 1;
        if(this.currentTopCardIndex >= this.deck.length) {
            console.log("Reset the deck...")
            this.shuffle();
            this.currentTopCardIndex = 0;
        }
        return this.deck[topCard];
    }
    
    
}

var deckObj = new Deck();


var showPlayerCards = function(cards) {
    document.getElementById("cards_player").innerHTML = "";
    for(var i=0; i<cards.length; i++) {
        let card_img = document.createElement("img");
        card_img.src = "./cards/" + cards[i].image;
        document.getElementById("cards_player").append(card_img);
    }
}

var showDealerCards = function(cards) {
    document.getElementById("cards_dealer").innerHTML = "";
    for(var i=0; i<cards.length; i++) {
        let card_img = document.createElement("img");
        card_img.src = "./cards/" + cards[i].image;
        document.getElementById("cards_dealer").append(card_img);
    }
}

var isBlackJack = function(cards) {
    //You must only have two cards.
    if(cards.length == 2) {
        //The total points are 21
        if(sum(cards) == 21) {
            return true;
        } else {
            return false;
        }
    } else {
       return false; 
    }
    
}


var sum = function(cards) {
    
    var total = 0;
    var numOfAces = 0;
    
    for(var i=0; i<cards.length; i++) {
        var rank = cards[i].rank;
        var point = 0;
        if(rank == 1) {
            point = 11;
            numOfAces += 1;
        }
        else if(rank == 11 || rank == 12 || rank == 13) {
            point = 10;
        } else {
            point = rank;
        }
        
        total += point;
    }
    
    
    for(var i=0; i<numOfAces; i++) {
        total -= 10;
        if(total<=21)
            break;
    }
    
    return total;
}

window.onload = function() {
    //Create the deck
    playerCards = [];
    dealerCards = [];
    totalPointsOfDealer = 0;
    totalPointsOfPlayer = 0;
    
    deckObj.shuffle();
    
    //The dealer deals two cards to himself/herself
    dealerCards[dealerCards.length] = deckObj.deal();
    dealerCards[dealerCards.length] = deckObj.deal();
    totalPointsOfDealer = sum(dealerCards);
    
    //The dealer deals two cards to the player
    playerCards[playerCards.length] = deckObj.deal();
    playerCards[playerCards.length] = deckObj.deal();
    totalPointsOfPlayer = sum(playerCards);
    
    //Show the cards from player
    console.log("Cards in your hands:");
    showPlayerCards(playerCards);
    console.log("Total points in your hands:");
    document.getElementById("sum_player").innerHTML = sum(playerCards);
    console.log(sum(playerCards));
    console.log("===========================");
    console.log("Cards in dealer's hands:");
    let card_img = document.createElement("img");
    card_img.src = "./cards/" + dealerCards[1].image;
    document.getElementById("cards_dealer").append(card_img);
    console.log(dealerCards[1].desc);
    if(isBlackJack(playerCards)) {
        alert("You've got a Black jack! You win!");
        showResults();
        return;
    }
    

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
    document.getElementById("deal").addEventListener("click", deal);

    
}

function hit() {
    //Player's Round
    if(canHit == true) {
        totalPointsOfPlayer = sum(playerCards);
        playerCards[playerCards.length] = deckObj.deal();
        console.log("==========================");
        console.log("Cards in your hands:");
        showPlayerCards(playerCards);
        console.log("Total points in your hands:");
        totalPointsOfPlayer = sum(playerCards);
        document.getElementById("sum_player").innerHTML = totalPointsOfPlayer;
        console.log(totalPointsOfPlayer);
        if(totalPointsOfPlayer > 21) {
            alert("You burst! You lose!");
            document.getElementById("game_results").innerHTML = "You burst! You lose!";
            canHit = false;
            canStand = false;
            return;
        }  
    }
}

function stand() {
    canHit = false;
    //Dealer's Round
    if(canStand == true) {
        getMoreCard = true;
        if(isBlackJack(dealerCards)) {
            alert("The dealer has got a Black jack! You lose!");
            return;
        }
        totalPointsOfDealer = sum(dealerCards);
        while(getMoreCard) {
            if(totalPointsOfDealer >= 16) {
                getMoreCard = false;
            } else {
                
                dealerCards[dealerCards.length] = deckObj.deal();
                console.log("==========================");
                console.log("Cards in dealer's hands:");
                showDealerCards(dealerCards);
                console.log("Total points in dealer's hands:");
                document.getElementById("sum_dealer").innerHTML = totalPointsOfDealer;
                totalPointsOfDealer = sum(dealerCards);
                console.log(totalPointsOfDealer);
                if(totalPointsOfDealer > 21) {
                    alert("Dealer bursts! You win!");
                    document.getElementById("game_results").innerHTML = "Dealer bursts! You win!";
                    showResults();
                    return;
                }
            }
        }
        showResults();
    }
    canStand = false;
    
}

function deal() {
    playerCards = [];
    dealerCards = [];
    totalPointsOfPlayer = 0;
    totalPointsOfDealer = 0;
    document.getElementById("cards_dealer").innerHTML = '<img id="hidden" src="./cards/red_back.png">';
    document.getElementById("cards_player").innerHTML = "";
    location.reload();
}

function showResults() {
    canStand = false;
    document.getElementById("sum_player").innerHTML = totalPointsOfPlayer;
    document.getElementById("sum_dealer").innerHTML = totalPointsOfDealer;
    showDealerCards(dealerCards);
    showPlayerCards(playerCards);

    alert("You've got " + totalPointsOfPlayer + " points and the dealer has got " + totalPointsOfDealer + " points.");
    if(totalPointsOfPlayer > totalPointsOfDealer) {
        alert("You win!");
        document.getElementById("game_results").innerHTML = "You win!";
    } else if(totalPointsOfPlayer < totalPointsOfDealer) {
        alert("You lose!");
        document.getElementById("game_results").innerHTML = "You lose!";
    } else {
        alert("Draw. Good game!");
        document.getElementById("game_results").innerHTML = "Draw. Good game!";
    }
}