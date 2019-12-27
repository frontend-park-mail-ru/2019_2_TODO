import BaseView from '../BaseView/BaseView';
import {HeaderComponent} from '../../components/Header/Header';
import {TextComponent} from '../../components/TextComponent/Text';

export default class RulesView extends BaseView {
  constructor(element) {
    super(element);
  }

  render() {
    const application = this.el;
    application.innerHTML = '';
    application.style.backgroundImage = 'url("assets/asfalt.png")';
    const header = new HeaderComponent(application);
    header.render();
    const form = document.createElement('div');
    form.className = 'rules-form';
    const headText = new TextComponent({
      tag: 'h1',
      class: 'rules',
      text: 'HOW TO PLAY TEXAS HOLD’EM POKER',
    });
    const rules = new TextComponent({
      tag: 'p',
      class: 'rules-text',
      text: `Texas Hold’em is arguably the most famous of all poker games. 
      If you are new to the game of poker, Texas Hold’em Poker is a great 
      place to start. 
      Hold ’em consists of two cards (“hole cards”) being dealt 
      face down to each player 
      and then five community cards being placed face-up by 
      the dealer — a series of 
      three (“the flop”) then an additional single card 
      (“the turn”) and another 
      additional card (“the river”) – with players having
       the option to check, bet, 
      raise or fold after each deal; i.e., betting may occur prior to the flop, 
      “on the flop”, “on the turn”, and “on the river”.`,
    });
    const rules_2 = new TextComponent({
      tag: 'p',
      class: 'rules-text',
      text: `Each player is dealt two private cards in hold ’em, 
      which are dealt first. Play begins with each player being 
      dealt two cards face down, with the player in the small blind 
      receiving the first card and the player in the button seat receiving 
      the last card dealt. (As in most poker games, the deck is a standard 
      52-card deck containing no jokers.) These cards are the players’ 
      hole or pocket cards. These are the only cards each player will 
      receive individually, and they will only (possibly) be revealed at 
      the showdown.`,
    });
    const rules_3 = new TextComponent({
      tag: 'p',
      class: 'rules-text',
      text: `The poker hand begins with a “pre-flop” 
      betting round, beginning with the player to the 
      left of the big blind (or the player to the left 
      of the dealer, if no blinds are used) and continuing
      clockwise. A round of betting continues until every 
      player has folded, put in all of their chips, or 
      matched the amount put in by all other active players. 
      Note that the blinds in the pre-flop betting round 
      are counted toward the amount that the blind player 
      must contribute. If all players call around to the 
      player in the big blind position, that player may
      either check or raise.`,
    });
    const rules_4 = new TextComponent({
      tag: 'p',
      class: 'rules-text',
      text: `After the pre-flop betting round, assuming 
      there remain at least two players taking part in the 
      hand, the dealer deals a flop, three face-up community 
      cards. The flop is followed by a second betting round. 
      All betting rounds begin with the player to the button’s
      left and continue clockwise. After the flop betting round
      ends, a single community card (called the turn or fourth
      street) is dealt, followed by a third betting round. A 
      final single community card (called the river or fifth 
      street) is then dealt, followed by a fourth betting round
      and the showdown, if necessary.`,
    });
    const rules_5 = new TextComponent({
      tag: 'p',
      class: 'rules-text',
      text: `In all casinos, the dealer will “burn” a card 
      before the flop, turn, and river. The burn occurs so 
      players who are betting cannot see the back of the next
      community card to come. This is done for historical/traditional 
      reasons, to avoid any possibility of a player knowing in advance
      the next card to be dealt.`,
    });
    application.appendChild(headText.render());
    form.appendChild(rules.render());
    form.appendChild(rules_2.render());
    form.appendChild(rules_3.render());
    form.appendChild(rules_4.render());
    form.appendChild(rules_5.render());
    application.appendChild(form);
  }
}
