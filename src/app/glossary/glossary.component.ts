import {Component, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html'
})
export class GlossaryComponent {

  public keywords = [
    {
      title: 'Ambush',
      text: 'When an enemy with the ambush keyword enters play, each player, starting with the first player and ' +
          'proceeding clockwise, must make an engagement check. The engagement check is only made against the enemy ' +
          'that just entered play, and not other enemies that are in the staging area. If the enemy engages a player ' +
          'as the result of this effect, then no further engagement checks are made against it.'
    },
    {
      title: 'Archery X',
      text: 'While a card with the archery keyword is in play, players must deal damage to character cards in play ' +
          'equal to the specified archery value at the beginning of each combat phase. This damage can be dealt to ' +
          'characters under any player’s control, and it can be divided among the players as they see fit. If there ' +
          'is disagreement as to where to assign archery damage, the first player makes the final decision. If ' +
          'multiple cards with the archery keyword are in play, the effects are cumulative. Remember that [Shield] does ' +
          'not block archery damage.'
    },
    {
      title: 'Battle',
      text: 'If a quest card has the battle keyword, when characters are committed to that quest, they count their ' +
          'total [Attack] instead of their total [Quest] when resolving the quest. Enemies and locations in the ' +
          'staging area still use their [Threat] in opposition to this quest attempt.'
    },
    {
      title: 'Clue objectives',
      text: 'In some scenarios, players are searching for Clue objective cards. Players should try to find and claim ' +
          'as many copies of them as they can while playing the scenario. When one of these cards is claimed, its card ' +
          'text transforms it into a condition attachment, and it is attached to a hero committed to the quest, with ' +
          'text that returns the card to the top of the encounter deck if the attached hero is destroyed. Additionally, ' +
          'if the attached hero is destroyed or leaves play for any other reason, the clue objective card is returned ' +
          'to the top of the encounter deck.'
    },
    {
      title: 'Doomed X',
      text: 'If an encounter card with the doomed keyword is revealed during the staging step of the quest phase, ' +
          'each player must raise his threat level by the specified value.'
    },
    {
      title: 'Guarded',
      text: 'The guarded keyword is a reminder on some objective cards to reveal and attach the next card of the ' +
          'encounter deck to the objective when it enters the staging area from the encounter deck, and place them ' +
          'both in the staging area. The objective cannot be claimed as long as any encounter card is attached. Once ' +
          'that encounter is dealt with, the objective remains in the staging area until it is claimed. If another ' +
          'objective card comes up while attaching a card for the guarded keyword, place the second objective in the ' +
          'staging area, and use the next card of the encounter deck to fulfill the original keyword effect.'
    },
    {
      title: 'Hide',
      text: 'When an encounter card with the Hide X keyword is revealed, the player who revealed the card must make a ' +
          'Hide test. If the encounter card with the Hide X keyword also has a “When Revealed” or “Forced” effect, the ' +
          'Hide test must be resolved before resolving the rest of the card. When a player is instructed to make a ' +
          'Hide test, that player may exhaust any number of characters he controls to commit those characters to the ' +
          'Hide test. Then, that player discards the top X cards of the encounter deck where X is equal to the Hide X ' +
          'value.'
    },
    {
      title: 'Indestructible',
      text: 'An enemy with the Indestructible keyword cannot be destroyed by damage, even when it has damage on it ' +
          'equal to its hit points.'
    },
    {
      title: 'Peril',
      text: 'When a player reveals an encounter card with the Peril keyword, he must resolve the staging of that card ' +
          'on his own without conferring with the other players. The other players cannot take any actions or trigger ' +
          'any responses during the resolution of that cards staging.'
    },
    {
      title: 'Permanent',
      text: 'Permanent is a new keyword found on some boons and burdens. Once a boon or burden with the permanent ' +
          'keyword is earned, it is attached to a hero and that choice is recorded in the Campaign Log. A card with ' +
          'the permanent keyword can only be attached to one hero for the duration of a campaign. Attachments with ' +
          'the permanent keyword cannot be discarded from the attached hero while that hero is in play. If a hero ' +
          'leaves play, attachments with the permanent keyword attached to that hero are removed from the game.'
    },
    {
      title: 'Prowl X',
      text: 'When an encounter card with the prowl keyword is revealed from the encounter deck, the players (as a ' +
          'group) must discard the specified number of resources from their heroes’ resource pools. If the players ' +
          'do not have enough resources to match the specified value, then they must discard as many resources as ' +
          'they can.'
    },
    {
      title: 'Ranged',
      text: 'A character with the ranged keyword can be declared by its controller as an attacker against enemies that ' +
          'are engaged with other players. A character can declare ranged attacks against these targets while its ' +
          'owner is declaring attacks, or it can participate in attacks that are declared by other players. In either ' +
          'case, the character must exhaust and meet any other requirements necessary to make the attack.'
    },
    {
      title: 'Regenerate X',
      text: 'An enemy with the Regenerate keyword heals damage from itself equal to the specified amount each round. ' +
          'This takes place immediately following the passing of the first player token during the Refresh Phase, and ' +
          'occurs before player actions.'
    },
    {
      title: 'Restricted',
      text: 'Some attachments have the restricted keyword. A character can never have more than two attachments with ' +
          'the restricted keyword attached. If a third restricted attachment is ever attached to a character, one of ' +
          'the restricted attachments must moved to its owners discard pile.'
    },
    {
      title: 'Sack X',
      text: 'When the keyword Sack X is triggered by the encounter deck, the first player draws the top X cards from ' +
          'the sack deck and resolves the “When Sacked” effects on those cards. If players are instructed to draw ' +
          'multiple cards from the sack deck, those cards are drawn and resolved one at a time. If the Sack X keyword ' +
          'is triggered and there are no cards remaining in the sack deck, the Sack X effect is ignored. If a Sack card ' +
          'leaves play for any reason, shuffle it back into the sack deck.'
    },
    {
      title: 'Searches X',
      text: 'The Searches X keyword represents the heroes search for the Orc captain, Mugash. When a location with the ' +
          'Searches X keyword leaves play, the player (or players) identified by that location reveals the top X cards ' +
          'of his out-of-play deck. Players who reveal cards this way add each revealed enemy to the staging area, ' +
          'choose 1 player card to take into their hand, and discard the rest.'
    },
    {
      title: 'Secrecy X',
      text: 'Secrecy lowers the cost to play the card by the specified value, provided the threat of the player who is ' +
          'playing the card is 20 or below. Secrecy only applies when the card is played from hand, and never modifies ' +
          'the printed cost of the card.'
    },
    {
      title: 'Sentinel',
      text: 'A character with the sentinel keyword can be declared by its controller as a defender during enemy attacks ' +
          'that are made against other players. A character can declare sentinel defense after the player engaged with ' +
          'the enemy making the attack declares "no defenders." The defending sentinel character must exhaust and meet ' +
          'any other requirements necessary to defend the attack.'
    },
    {
      title: 'Siege',
      text: 'If a quest card has the siege keyword, when characters are committed to that quest, they count their total ' +
          '[Shield] instead of their total [Quest] when resolving the quest. Enemies and locations in the staging area ' +
          'still use their [Threat] in opposition to this quest attempt.'
    },
    {
      title: 'Surge',
      text: 'When an encounter card with the surge keyword is revealed during the staging step of the quest phase, ' +
          'reveal 1 additional card from the encounter deck. Resolve the surge keyword immediately after resolving any ' +
          'when revealed effects on the card.'
    },
    {
      title: 'Time X',
      text: 'Time X is a new keyword that represents the urgency of the heroes’ quest. When a card with the Time X ' +
          'keyword is revealed, the players put X resource tokens on that card. These tokens are called time counters. ' +
          'At the end of each refresh phase, remove 1 time counter from each card with the Time X keyword, if able. ' +
          'When the last time counter is removed, there will be a triggered effect that resolves on that card. Some ' +
          'encounter cards will also remove time counters, making it more difficult for the players to predict when ' +
          'they will run out of time.'
    },
    {
      title: 'Underworld X',
      text: 'When a location with the underworld keyword enters play, take cards from the top underworld deck equal to ' +
          'the specified value and stack them facedown underneath that location. When a location leaves play, any ' +
          'facedown cards stacked underneath that location are revealed one at a time, and added to the staging area. ' +
          'If a card from the underworld deck would be discarded, it is placed in the encounter deck discard pile. If ' +
          'a location with underworld is revealed from the encounter deck and there are no cards left in the underworld ' +
          'deck, then the underwold keyword has no eccect.'
    },
    {
      title: 'Victory X',
      text: 'Some enemy and location cards award victory points when they are defeated. When such a card leaves play, ' +
          'one player should place it near his threat dial to remind the players of the victory points when they are ' +
          'scoring at the end of the game. It is recommended that one player collects all the victory cards the players ' +
          'earn during the scenario, as victory points are applied to the score of the entire group.'
    },
    {
      title: 'Villagers',
      text: 'The villagers keyword creates tokens that represent the people living near to Amon Dîn who need the heroes ' +
          'to rescue them. When a location with the villagers keyword enters play, or a quest card with villagers is ' +
          'revealed, place resource tokens on it equal to the specified value. Resource tokens placed on a location or ' +
          'quest this way are villager tokens.Villager tokens do not count as resources. When a villager token is ' +
          'discarded, return that token to the token bank.'
    }
  ];

  @ViewChild(MatAccordion, { static: false } as any) accordion: MatAccordion;

  trackByFn(index: number): number {
    return index;
  }

}
