

const cardCoordinates = {
    'Ac': [0, 0, 46, 67],
    '2c': [46, 0, 46, 67],
    '3c': [92, 0, 46, 67],
    '4c': [138, 0, 46, 67],
    '5c': [184, 0, 46, 67],
    '6c': [230, 0, 46, 67],
    '7c': [276, 0, 46, 67],
    '8c': [322, 0, 46, 67],
    '9c': [368, 0, 46, 67],
    'Tc': [414, 0, 46, 67],
    'Jc': [460, 0, 46, 67],
    'Qc': [506, 0, 46, 67],
    'Kc': [552, 0, 46, 67],

    'Ad': [0, 67, 46, 67],
    '2d': [46, 67, 46, 67],
    '3d': [92, 67, 46, 67],
    '4d': [138, 67, 46, 67],
    '5d': [184, 67, 46, 67],
    '6d': [230, 67, 46, 67],
    '7d': [276, 67, 46, 67],
    '8d': [322, 67, 46, 67],
    '9d': [368, 67, 46, 67],
    'Td': [414, 67, 46, 67],
    'Jd': [460, 67, 46, 67],
    'Qd': [506, 67, 46, 67],
    'Kd': [552, 67, 46, 67],

    'Ah': [0, 134, 46, 67],
    '2h': [46, 134, 46, 67],
    '3h': [92, 134, 46, 67],
    '4h': [138, 134, 46, 67],
    '5h': [184, 134, 46, 67],
    '6h': [230, 134, 46, 67],
    '7h': [276, 134, 46, 67],
    '8h': [322, 134, 46, 67],
    '9h': [368, 134, 46, 67],
    'Th': [414, 134, 46, 67],
    'Jh': [460, 134, 46, 67],
    'Qh': [506, 134, 46, 67],
    'Kh': [552, 134, 46, 67],

    'As': [0, 201, 46, 67],
    '2s': [46, 201, 46, 67],
    '3s': [92, 201, 46, 67],
    '4s': [138, 201, 46, 67],
    '5s': [184, 201, 46, 67],
    '6s': [230, 201, 46, 67],
    '7s': [276, 201, 46, 67],
    '8s': [322, 201, 46, 67],
    '9s': [368, 201, 46, 67],
    'Ts': [414, 201, 46, 67],
    'Js': [460, 201, 46, 67],
    'Qs': [506, 201, 46, 67],
    'Ks': [552, 201, 46, 67],
};

export class PokerAnimation {
  constructor() {
      this.bankerCoordinates = {x: 512, y: 210};
      this.botCoordnates = {x: 850, y: 500};
      this.playerCoordinates = {x: 512, y: 540};
      this.bankerCardsCoordinates = {x: 512, y: 370};
      this.shapes = [];
      this.back = new Image();
      this.back.src = 'assets/AllCards.png';
      this.ctx = document.getElementById('canvas').getContext('2d');
      this.back.onload = () => {
          this.ctx.drawImage(this.back, this.bankerCoordinates.x - 45,
              this.bankerCoordinates.y - this.cardHeight / 2, this.cardWidth, this.cardHeight);
      };
      this.cardWidth = this.ctx.canvas.width * 0.07;
      this.cardHeight = this.ctx.canvas.height * 0.20;
      this._playerCards = [46, 67];
      this._bankerCards = [46, 67];
      this._botCards = [46, 67];
      // this.ctx.translate(this.bankerCoordinates.x, this.bankerCoordinates.y);
      this.ctx.save();
  }
  addPlayerCards(cards) {
    cards.forEach((card) => {
      const image = new Image();
      image.onload = () => {
        this._playerCards.push(image);
      };
      image.src = '/assets/' + card + '.png';
    });
  }
  addBotCards(cards) {
    cards.forEach((card) => {
      const image = new Image();
      image.onload = () => {
        this._botCards.push(image);
      };
      image.src = '/assets/' + card + '.png';
    });
  }
  addBankerCards(cards) {
    cards.forEach((card) => {
      const image = new Image();
      image.onload = () => {
        this._bankerCards.push(image);
      };
      image.src = '/assets/' + card + '.png';
    });
  }
  startRoundAnimation(playerCards, botCards, bankerCards){
      this._playerCards = playerCards;
      this._botCards = botCards;
      this._bankerCards = bankerCards;
      // this.ctx.clearRect(0,0,1024,768);
      const playerListener = () => {
          const botListener = () => {
              this.giveBankerCards(bankerCards);
              this.ctx.canvas.removeEventListener('moveToBot', botListener)
              this.ctx.canvas.addEventListener('moveToBank', ()=> {
                  dispatchEvent(new Event('endOfStartAnimation'));
              })
          };
          this.ctx.canvas.removeEventListener('playerCardsGiven', playerListener)
          this.ctx.canvas.addEventListener('moveToBot', botListener);
          this.giveBotCards(botCards);
      };
      this.ctx.canvas.addEventListener('playerCardsGiven', playerListener);
      this.givePlayerCards(playerCards);
  }
    givePlayerCards(cards) {
    this.moveCards(cards, this.bankerCoordinates.x, this.bankerCoordinates.y, 0,
        this.playerCoordinates.y - this.bankerCoordinates.y, Math.PI * 2 / 60, 'moveToUser');
    const listener = () => {
      this.reverseCards(cards, this.playerCoordinates.x, this.playerCoordinates.y, 4, 'playerCardsGiven');
      this.ctx.canvas.removeEventListener('moveToUser', listener);
    };
    this.ctx.canvas.addEventListener('moveToUser', listener);
  }
    giveBotCards(cards) {
    this.moveCards(
        cards,
        this.bankerCoordinates.x,
        this.bankerCoordinates.y,
        this.botCoordnates.x - this.bankerCoordinates.x,
        this.botCoordnates.y - this.bankerCoordinates.y,
        Math.PI * 2 / 30, 'moveToBot');
  }
    giveBankerCards(cards) {
    // this.addBankerCards(cards);
    this.moveCards(cards, this.bankerCoordinates.x, this.bankerCoordinates.y, 0,
        this.bankerCardsCoordinates.y - this.bankerCoordinates.y, 0, 'moveToBank');
  }
    reverseBankerCards(cards, positionParams) {
    positionParams.forEach((param) => {
      this.reverseCards([cards[param]], this.bankerCardsCoordinates.x -180 + 90 * param, this.bankerCardsCoordinates.y, 4, 'bankerCardsReversed');
    });
  }
    reverseBotCards(cards, endRoundEvent = null){
      this.reverseCards(cards, this.botCoordnates.x, this.botCoordnates.y, 4, 'botsCardsReversed');
      if (endRoundEvent) {
          const listener = () => {
              this.ctx.canvas.removeEventListener('botsCardsReversed', listener);
              dispatchEvent(new Event(endRoundEvent));
          };
          this.ctx.canvas.addEventListener('botsCardsReversed', listener);
      }
  }
    moveCards(cards, x, y, dx, dy, rotate = 0,event = 'endMoveCards', stepX = dx / 60, stepY = dy/60,) {
    let progress = 0;
    let rotated = 0;
    // this.ctx.drawImage(cards[0],100,100,100,100);
    const move = () => {
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.drawImage(this.back, 92, 267, 46, 67, -45, -75, this.cardWidth, this.cardHeight);
      this.ctx.translate(dx*progress, dy*progress);
      this.ctx.save();
      this.ctx.translate( progress*progress*(-(cards.length*90/2) + 45), 0);
      cards.reduce((differ, card) => {
        this.ctx.save();
        this.ctx.translate(differ, 0);
        this.ctx.rotate(rotated);
        this.ctx.clearRect(- 48, -2 - this.cardHeight / 2, this.cardWidth+6, this.cardHeight+6);
        this.ctx.restore();
        return differ + 90*(progress*progress);
      }, 0);
      this.ctx.restore();

      progress += dx ? stepX / dx:stepY / dy;
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
        this.ctx.translate(differ, 0);
        this.ctx.rotate(rotated);
        this.ctx.drawImage(this.back, 92, 267, 46, 67, -45, -this.cardHeight/2, this.cardWidth, this.cardHeight);
        this.ctx.restore();
        return differ + 90*(progress*progress);
      }, 0);
      this.ctx.restore();


      // console.log(Math.min(stepX / dx, stepY / dy));
      // console.log(progress);
      if (progress < 1) {
        this.ctx.restore();
        window.requestAnimationFrame(move);
      } else {
        this.ctx.restore();
        this.ctx.canvas.dispatchEvent(new Event(event) );
      }
    };
    window.requestAnimationFrame(move);
    // this.ctx.restore();
  }
  removeAllCards() {
      let progress = 1;
      // this.ctx.drawImage(cards[0],100,100,100,100);
      const move = () => {
          this.ctx.save();
          this.ctx.translate(this.bankerCoordinates.x, this.bankerCoordinates.y);

          this.ctx.save();
          this.ctx.translate((-this.bankerCoordinates.x + this.playerCoordinates.x) * progress,
              (-this.bankerCoordinates.y + this.playerCoordinates.y) * progress);
          this.ctx.translate(progress * progress * (-(this._playerCards.length * 90 / 2) + 45), 0);
          this._playerCards.reduce((differ, card) => {
              this.ctx.save();
              this.ctx.translate(differ, 0);
              this.ctx.clearRect(-48, -2 - this.cardHeight / 2, this.cardWidth + 6, this.cardHeight + 6);
              this.ctx.restore();
              return differ + 90 * (progress * progress);
          }, 0);
          this.ctx.restore();

          this.ctx.save();
          this.ctx.translate((-this.bankerCoordinates.x + this.botCoordnates.x) * progress,
              (-this.bankerCoordinates.y + this.botCoordnates.y) * progress);
          this.ctx.translate(progress * progress * (-(this._botCards.length * 90 / 2) + 45), 0);
          this._botCards.reduce((differ, card) => {
              this.ctx.save();
              this.ctx.translate(differ, 0);
              this.ctx.clearRect(-48, -2 - this.cardHeight / 2, this.cardWidth + 6, this.cardHeight + 6);
              this.ctx.restore();
              return differ + 90 * (progress * progress);
          }, 0);


          this.ctx.restore();

          this.ctx.save();
          this.ctx.translate((-this.bankerCoordinates.x + this.bankerCardsCoordinates.x) * progress,
              (-this.bankerCoordinates.y + this.bankerCardsCoordinates.y) * progress);
          this.ctx.translate(progress * progress * (-(this._bankerCards.length * 90 / 2) + 45), 0);
          this._bankerCards.reduce((differ, card) => {
              this.ctx.save();
              this.ctx.translate(differ, 0);
              this.ctx.clearRect(-48, -2 - this.cardHeight / 2, this.cardWidth + 6, this.cardHeight + 6);
              this.ctx.restore();
              return differ + 90 * (progress * progress);
          }, 0);
          this.ctx.restore();

          progress -= 1 / 60;

          this.ctx.save();
          this.ctx.translate((-this.bankerCoordinates.x + this.playerCoordinates.x) * progress,
              (-this.bankerCoordinates.y + this.playerCoordinates.y) * progress);
          this.ctx.translate(progress * progress * (-(this._playerCards.length * 90 / 2) + 45), 0);
          this._playerCards.reduce((differ, card) => {
              this.ctx.save();
              this.ctx.translate(differ, 0);
              this.ctx.drawImage(this.back, ...cardCoordinates[card], -45, -this.cardHeight / 2, this.cardWidth, this.cardHeight);
              this.ctx.restore();
              return differ + 90 * (progress * progress);
          }, 0);
          this.ctx.restore();

          this.ctx.save();
          this.ctx.translate((-this.bankerCoordinates.x + this.botCoordnates.x) * progress,
              (-this.bankerCoordinates.y + this.botCoordnates.y) * progress);
          this.ctx.translate(progress * progress * (-(this._botCards.length * 90 / 2) + 45), 0);
          this._botCards.reduce((differ, card) => {
              this.ctx.save();
              this.ctx.translate(differ, 0);
              this.ctx.drawImage(this.back, ...cardCoordinates[card], -45, -this.cardHeight / 2, this.cardWidth, this.cardHeight);
              this.ctx.restore();
              return differ + 90 * (progress * progress);
          }, 0);
          this.ctx.restore();


          this.ctx.save();
          console.log(-this.bankerCoordinates.y + this.bankerCardsCoordinates.y);
          this.ctx.translate((-this.bankerCoordinates.x + this.bankerCardsCoordinates.x) * progress * progress,
              (-this.bankerCoordinates.y + this.bankerCardsCoordinates.y) * progress);
          this.ctx.translate(progress * progress * (-(this._bankerCards.length * 90 / 2) + 45), 0);
          this._bankerCards.reduce((differ, card) => {
              this.ctx.save();
              this.ctx.translate(differ, 0);
              this.ctx.drawImage(this.back, ...cardCoordinates[card], -45, -this.cardHeight / 2, this.cardWidth, this.cardHeight);
              this.ctx.restore();
              return differ + 90 * (progress * progress);
          }, 0);
          this.ctx.restore();
          this.ctx.drawImage(this.back, 92, 267, 46, 67, -45, -75, this.cardWidth, this.cardHeight);
          this.ctx.restore();

          // console.log(Math.min(stepX / dx, stepY / dy));
          // console.log(progress);
          if (progress >= 0) {
              // console.log(progress);
              requestAnimationFrame(move);
          }else {
              dispatchEvent(new Event('roundAnimationEnd'))
          }
      };
      requestAnimationFrame(move);
  }

  reverseCards(cards, x, y, turnRate, event = 'cardsReversed') {
    let progress = 0;
    let turned = 0;
      console.log(cards);
    const reverse = () => {
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.save();
      this.ctx.translate( -(cards.length*90/2) + 45, 0);
      this.ctx.translate(turned / 2, 0);
      cards.reduce((differ, card) => {
        this.ctx.save();
        this.ctx.translate(differ, 0);
        this.ctx.clearRect(- 45, -1 - this.cardHeight / 2, this.cardWidth -turned, this.cardHeight + 2);
        this.ctx.restore();
        return differ + 90;
      }, 0);
      this.ctx.restore();
      turned += turnRate;

      this.ctx.save();
      this.ctx.translate( -(cards.length*90/2) + 45, 0);
      this.ctx.translate(turned / 2, 0);
      cards.reduce((differ, card) => {
        // const image = turned >= this.cardWidth ? card : this.back;
        this.ctx.save();
        this.ctx.translate(differ, 0);
        if (turned >= this.cardWidth) {
          this.ctx.drawImage(this.back, ...cardCoordinates[card], - 45, - this.cardHeight / 2, this.cardWidth - turned, this.cardHeight);
        } else {
          this.ctx.drawImage(this.back, 92, 267, 46, 67, -45, -this.cardHeight / 2, this.cardWidth - turned, this.cardHeight);
        }
        this.ctx.restore();
        return differ + 90;
      }, 0);
      this.ctx.restore();
      progress += turnRate/(2 * this.cardWidth);
      if (progress < 1) {
        this.ctx.restore();
        window.requestAnimationFrame(reverse);
      } else {
        this.ctx.restore();
        this.ctx.canvas.dispatchEvent(new Event(event));
      }
    };
    window.requestAnimationFrame(reverse);
    // this.ctx.restore();
  }
}
