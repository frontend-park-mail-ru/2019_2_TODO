const cardCoordinates = {
  'Ac': [1, 412, 94, 131],
  '2c': [100, 412, 94, 131],
  '3c': [200, 412, 94, 131],
  '4c': [296, 412, 94, 131],
  '5c': [395, 412, 94, 131],
  '6c': [495, 412, 94, 131],
  '7c': [594, 412, 94, 131],
  '8c': [692, 412, 94, 131],
  '9c': [791, 412, 94, 131],
  'Tc': [890, 412, 94, 131],
  'Jc': [990, 412, 94, 131],
  'Qc': [1088, 412, 94, 131],
  'Kc': [1186, 412, 94, 131],

  'Ad': [1, 274, 94, 131],
  '2d': [100, 274, 94, 131],
  '3d': [200, 274, 94, 131],
  '4d': [296, 274, 94, 131],
  '5d': [395, 274, 94, 131],
  '6d': [495, 274, 94, 131],
  '7d': [594, 274, 94, 131],
  '8d': [692, 274, 94, 131],
  '9d': [791, 274, 94, 131],
  'Td': [890, 274, 94, 131],
  'Jd': [990, 274, 94, 131],
  'Qd': [1088, 274, 94, 131],
  'Kd': [1186, 274, 94, 131],

  'Ah': [1, 1, 94, 131],
  '2h': [100, 1, 94, 131],
  '3h': [200, 1, 94, 131],
  '4h': [296, 1, 94, 131],
  '5h': [395, 1, 94, 131],
  '6h': [495, 1, 94, 131],
  '7h': [594, 1, 94, 131],
  '8h': [692, 1, 94, 131],
  '9h': [791, 1, 94, 131],
  'Th': [890, 1, 94, 131],
  'Jh': [990, 1, 94, 131],
  'Qh': [1088, 1, 94, 131],
  'Kh': [1186, 1, 94, 131],

  'As': [1, 139, 94, 131],
  '2s': [100, 139, 94, 131],
  '3s': [200, 139, 94, 131],
  '4s': [296, 139, 94, 131],
  '5s': [395, 139, 94, 131],
  '6s': [495, 139, 94, 131],
  '7s': [594, 139, 94, 131],
  '8s': [692, 139, 94, 131],
  '9s': [791, 139, 94, 131],
  'Ts': [890, 139, 94, 131],
  'Js': [990, 139, 94, 131],
  'Qs': [1088, 139, 94, 131],
  'Ks': [1186, 139, 94, 131],

  'back': [2, 549, 94, 131],
};

export class PokerAnimation {
  constructor() {
    this.bankerCoordinates = {x: 512, y: 110};
    this.botCoordnates = {x: 850, y: 500, rotate: - Math.PI * 2 / 6};
    this.playerCoordinates = {x: 512, y: 540};
    this.bankerCardsCoordinates = {x: 512, y: 290};
    this.shapes = [];
    this.back = new Image();
    this.back.src = 'assets/AllCardsHQ.png';
    this.ctx = document.getElementById('canvas').getContext('2d');
    this.back.onload = () => {
      this.ctx.drawImage(this.back, this.bankerCoordinates.x - 45,
          this.bankerCoordinates.y - this.cardHeight / 2, this.cardWidth, this.cardHeight);
    };
    this.cardWidth = this.ctx.canvas.width * 0.08;
    this.cardHeight = this.ctx.canvas.height * 0.20;
    this._playerCards = [94, 131];
    this._bankerCards = [94, 131];
    this._botCards = [94, 131];
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
  startRoundAnimation(playerCards, botCards, bankerCards) {
    this._playerCards = playerCards;
    this._botCards = botCards;
    this._bankerCards = bankerCards;
    // this.ctx.clearRect(0,0,1024,768);
    const playerListener = () => {
      const botListener = () => {
        this.giveBankerCards(bankerCards);
        this.ctx.canvas.removeEventListener('moveToBot', botListener);
        this.ctx.canvas.addEventListener('moveToBank', ()=> {
          dispatchEvent(new Event('endOfStartAnimation'));
        });
      };
      this.ctx.canvas.removeEventListener('playerCardsGiven', playerListener);
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
        Math.PI * 2 / 30, 'moveToBot', this.botCoordnates.rotate);
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
  reverseBotCards(cards, endRoundEvent = null) {
    this.reverseCards(cards, this.botCoordnates.x, this.botCoordnates.y, 4, 'botsCardsReversed',
        this.botCoordnates.rotate);
    if (endRoundEvent) {
      const listener = () => {
        this.ctx.canvas.removeEventListener('botsCardsReversed', listener);
        dispatchEvent(new Event(endRoundEvent));
      };
      this.ctx.canvas.addEventListener('botsCardsReversed', listener);
    }
  }
  moveCards(cards, x, y, dx, dy, rotate = 0, event = 'endMoveCards', rotateC = 0, stepX = dx / 60, stepY = dy/60,) {
    let progress = 0;
    let rotated = 0;
    // this.ctx.drawImage(cards[0],100,100,100,100);
    const move = () => {
      this.ctx.save();

      this.ctx.translate(x, y);
      this.ctx.clearRect(- 48, -2 - this.cardHeight / 2, this.cardWidth+6, this.cardHeight+6);
      this.ctx.drawImage(this.back, ...cardCoordinates['back'], -45, -75, this.cardWidth, this.cardHeight);
      this.ctx.translate(dx*progress, dy*progress);
      this.ctx.save();
      this.ctx.rotate(rotateC);
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
      this.ctx.rotate(rotateC);
      this.ctx.translate(progress*progress*(-(cards.length*90/2) + 45), 0);
      cards.reduce((differ, card) => {
        this.ctx.save();
        this.ctx.translate(differ, 0);
        this.ctx.rotate(rotated);
        this.ctx.drawImage(this.back, ...cardCoordinates['back'], -this.cardWidth/2 - 5, -this.cardHeight/2, this.cardWidth, this.cardHeight);
        this.ctx.restore();
        return differ + 90*(progress*progress);
      }, 0);
      this.ctx.restore();


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
    const func = () => {
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
        this.ctx.rotate(this.botCoordnates.rotate);
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
        this.ctx.rotate(this.botCoordnates.rotate);
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
        this.ctx.drawImage(this.back, ...cardCoordinates['back'], -45, -75, this.cardWidth, this.cardHeight);
        this.ctx.restore();

        if (progress >= 0) {
          requestAnimationFrame(move);
        } else {
          this.ctx.save();
          this.ctx.clearRect(0, 0, 1024, 768);
          this.ctx.translate(this.bankerCoordinates.x, this.bankerCoordinates.y);
          this.ctx.drawImage(this.back, ...cardCoordinates['back'], -45, -75, this.cardWidth, this.cardHeight);
          this.ctx.restore();
          dispatchEvent(new Event('roundAnimationEnd'));
        }
      };
      requestAnimationFrame(move);
    };
    func(this);
  }

  reverseCards(cards, x, y, turnRate, event = 'cardsReversed', rotateC = 0) {
    let progress = 0;
    let turned = 0;
    const reverse = () => {
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.save();
      this.ctx.rotate(rotateC);
      this.ctx.translate( -(cards.length*90/2) + 45, 0);
      this.ctx.translate(turned / 2, 0);
      cards.reduce((differ, card) => {
        this.ctx.save();
        this.ctx.translate(differ, 0);
        this.ctx.clearRect(- 46, -1 - this.cardHeight / 2, this.cardWidth -turned + 2, this.cardHeight + 2);
        this.ctx.restore();
        return differ + 90;
      }, 0);
      this.ctx.restore();
      turned += turnRate;

      this.ctx.save();
      this.ctx.rotate(rotateC);
      this.ctx.translate( -(cards.length*90/2) + 45, 0);
      this.ctx.translate(turned / 2, 0);
      cards.reduce((differ, card) => {
        // const image = turned >= this.cardWidth ? card : this.back;
        this.ctx.save();
        this.ctx.translate(differ, 0);
        if (turned >= this.cardWidth) {
          this.ctx.drawImage(this.back, ...cardCoordinates[card], - 45, - this.cardHeight / 2, this.cardWidth - turned, this.cardHeight);
        } else {
          this.ctx.drawImage(this.back, ...cardCoordinates['back'], -45, -this.cardHeight / 2, this.cardWidth - turned, this.cardHeight);
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
