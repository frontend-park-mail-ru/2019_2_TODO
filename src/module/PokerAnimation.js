

const card = new Image();
card.src = 'http://localhost:8000/assets/As.png';
const back = new Image();
back.src = 'http://localhost:8000/assets/b151b48f2d77cdd03b17256ce25886a5.jpg';

export class PokerAnimation {
    constructor(){
        this.bankerCoordinates = {x:512, y: 210};
        this.botCoordnates = {x: 850, y: 500};
        this.playerCoordinates = {x:512, y: 540};
        this.bankerCardsCoordinates = {x: 512, y: 370};
        this.cardWidth = 80;
        this.cardHeight = 150;
        this.back = new Image();
        this.back.src = 'http://localhost:8000/assets/b151b48f2d77cdd03b17256ce25886a5.jpg';
        this.back.onload = () => {
            this.ctx.drawImage(this.back, this.bankerCoordinates.x - 45,
                this.bankerCoordinates.y - this.cardHeight / 2, this.cardWidth, this.cardHeight);
        };
        this.ctx = document.getElementById('canvas').getContext('2d');
        this._playerCards = [];
        this._bankerCards = [];
        this._botCards = [];
        // this.ctx.translate(this.bankerCoordinates.x, this.bankerCoordinates.y);
        this.ctx.save();
    }
    addPlayerCards(cards) {
        cards.forEach(card => {
            const image = new Image();
            image.onload = () => {
                this._playerCards.push(image)
            };
            image.src = 'http://localhost:8000/assets/' + card + '.png';
        })
    }
    addBotCards(cards) {
        cards.forEach(card => {
            const image = new Image();
            image.onload = () => {
                this._botCards.push(image)
            };
            image.src = 'http://localhost:8000/assets/' + card + '.png';
        });
    }
    addBankerCards(cards) {
        cards.forEach(card => {
            const image = new Image();
            image.onload = () => {
                this._bankerCards.push(image)
            };
            image.src = 'http://localhost:8000/assets/' + card + '.png';
        })
    }
    givePlayerCards(cards) {
        this.addPlayerCards(cards);
        this.moveCards(this._playerCards, this.bankerCoordinates.x, this.bankerCoordinates.y, 0,
            this.playerCoordinates.y - this.bankerCoordinates.y, Math.PI * 2 / 60);
        const listener = () => {
            this.reverseCards(this._playerCards, this.playerCoordinates.x, this.playerCoordinates.y, 4);
            this.ctx.canvas.removeEventListener('endMoveCards', listener)
        };
        this.ctx.canvas.addEventListener('endMoveCards', listener);
    }
    giveBotCards(cards){
        this.addBotCards(cards);
        this.moveCards(
            this._botCards,
            this.bankerCoordinates.x,
            this.bankerCoordinates.y,
            this.botCoordnates.x - this.bankerCoordinates.x,
            this.botCoordnates.y - this.bankerCoordinates.y,
            Math.PI * 2 / 30);
    }
    giveBankerCards(cards) {
        this.addBankerCards(cards);
        this.moveCards(this._bankerCards, this.bankerCoordinates.x, this.bankerCoordinates.y, 0,
            this.bankerCardsCoordinates.y - this.bankerCoordinates.y, Math.PI * 2 / 30);

    }
    reverseBankerCards(cards, positionParams) {
        positionParams.forEach(param => {
            this.reverseCards(this._bankerCards.slice(param, param + 1), this.bankerCardsCoordinates.x -180 + 90 * param, this.bankerCardsCoordinates.y, 4);
        });


        this.ctx.canvas.addEventListener('cardsReversed', () => {
            this.ctx.canvas.dispatchEvent(new Event('bankerCardsReversed'));
        });

    }
    moveCards(cards, x, y, dx, dy, rotate = 0, stepX = dx / 60, stepY = dy/60) {
        let progress = 0;
        let rotated = 0;
        // this.ctx.drawImage(cards[0],100,100,100,100);
        const move = () => {
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.drawImage(this.back, -45, -75, 80, 150);
            this.ctx.translate(dx*progress, dy*progress);
            this.ctx.save();
            this.ctx.translate( progress*progress*(-(cards.length*90/2) + 45), 0);
            cards.reduce((differ, card) => {
                this.ctx.save();
                this.ctx.translate(differ,0);
                this.ctx.rotate(rotated);
                this.ctx.clearRect(- 48 , -2 - this.cardHeight / 2, this.cardWidth+6, this.cardHeight+6);
                this.ctx.restore();
                return differ + 90*(progress*progress);
            }, 0);
            this.ctx.restore();
            progress +=  dx ? stepX / dx:stepY / dy;
            // this.ctx.restore();
            rotated += rotate;
            // this.ctx.restore();

            this.ctx.translate(stepX, stepY);

            // this.ctx.save();
            // this.ctx.translate(rotated*50, rotated*50);
            // this.ctx.rotate(rotated);
            this.ctx.save();
            this.ctx.translate(progress*progress*(-(cards.length*90/2) + 45), 0);
            cards.reduce((differ, card) => {
                this.ctx.save();
                this.ctx.translate(differ,0);
                this.ctx.rotate(rotated);
                this.ctx.drawImage(this.back, - 45,  - this.cardHeight / 2, this.cardWidth, this.cardHeight);
                this.ctx.restore();
                return differ + 90*(progress*progress);
            }, 0);
            this.ctx.restore();


            // console.log(Math.min(stepX / dx, stepY / dy));
            // console.log(progress);
            if (progress < 1) {
                this.ctx.restore();
                window.requestAnimationFrame(move);
            }else {
                this.ctx.restore();
                this.ctx.canvas.dispatchEvent(new Event('endMoveCards') );
            }

        };
            window.requestAnimationFrame(move);
        // this.ctx.restore();
    }
    reverseCards(cards, x, y, turnRate) {
        let progress = 0;
        let turned = 0;

        const reverse = () => {
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.save();
            this.ctx.translate( -(cards.length*90/2) + 45, 0);
            this.ctx.translate(turned / 2, 0);
            cards.reduce((differ, card) => {
                this.ctx.save();
                this.ctx.translate(differ,0);
                this.ctx.clearRect(- 45 , -1 - this.cardHeight / 2, this.cardWidth -turned, this.cardHeight + 2);
                this.ctx.restore();
                return differ + 90;
            }, 0);
            this.ctx.restore();
            turned += turnRate;

            this.ctx.save();
            this.ctx.translate( -(cards.length*90/2) + 45, 0);
            this.ctx.translate(turned / 2, 0);
            cards.reduce((differ, card) => {
                const image = turned >= this.cardWidth ? card : this.back;
                this.ctx.save();
                this.ctx.translate(differ,0);
                this.ctx.drawImage(image, - 45 , -1 - this.cardHeight / 2, this.cardWidth - turned, this.cardHeight);
                this.ctx.restore();
                return differ + 90;
            }, 0);
            this.ctx.restore();
            progress += turnRate/(2 * this.cardWidth);
            if (progress < 1){
                this.ctx.restore();
                window.requestAnimationFrame(reverse)
            } else {
                this.ctx.restore();
                this.ctx.canvas.dispatchEvent(new Event('cardsReversed'))
            }
        };
        window.requestAnimationFrame(reverse);
        // this.ctx.restore();
    }

}