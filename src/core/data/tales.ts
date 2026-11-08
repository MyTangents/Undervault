import type { TaleDef } from '../types';

/**
 * Tales and rumours told in town (story kit, section 4). Each ends in a hook the player can act on.
 * `hints` names a discovery the tale points toward, so listening has mechanical value.
 */
export const TALES: TaleDef[] = [
  { id: 'tale-sword-that-screamed', speaker: 'Maud the Lender', tone: 'funny', hints: 'overdraft-blade',
    text: `"A fellow came in with a sword that screamed. I said I'd give him three silver for it. He said it was worth three hundred, so I held it up to the lamp and it said, loud as a bell, 'He owes me forty.' I paid him nothing. The Overdraft Blade is in the Pawn Gallery, third case, and it wants a new owner with good credit."` },
  { id: 'tale-missing-book', speaker: 'Old Tamsin Quell', tone: 'sad',
    text: `"I had a daughter, Ria, who went down the Tallow Stair with a candle and a book. She came up in three pieces, which is the number the Wardens like. But I counted: there was a fourth. Her book was not in any of them. Find me the book. I'll tell you what is in it if you bring it back."` },
  { id: 'tale-stranger-ash', speaker: 'Sister Ottoline', tone: 'uplifting',
    text: `"Three weeks ago a man came in with an urn he had carried from the deep. Not his own. A stranger's. He had gone out of his way, down seven stairs, to bring a stranger's ash home. We raised her, no charge. She walked out of here and shook his hand. Find the man, he is still in town, and ask him what else he's carried."` },
  { id: 'tale-place-card', speaker: 'Brannoch the Bold', tone: 'memorable', hints: 'lienholders-primer',
    text: `"I went down once. Reached the Receiving Hall. Table forty paces long, set for guests. A place card with my name on it. I'd never told anyone my real name was Dennis. I left my sword on the table and ran. The place cards are still there. Yours might be too. There's writing on the wall behind them, a lesson, I think. I did not stay to read it."` },
  { id: 'tale-regret-and-lute', speaker: 'Hobb Ferrule', tone: 'funny',
    text: `"Sold a boy a sword last month. He said, 'Does it come with a guarantee?' I said, 'It comes with a name.' It's called Regret. He took it down to the Choir Cistern and a mermaid hit him with a lute. Don't ask about the lute. Ask about the mermaid."` },
  { id: 'tale-same-name', speaker: 'Corporal Moss', tone: 'sad', hints: 'saint-orrels-ledger',
    text: `"I read out a name this morning that I'd read out eleven years ago. Same name. Same spelling. Either the dead are coming back and dying again, or someone's using the name. I'd like to know which. I'd prefer the first. The second is worse. Go to the Drop of Names and check the wall. Somebody's been keeping a ledger down there, and it isn't mine."` },
  { id: 'tale-ninth-key', speaker: 'Wenna Ashby', tone: 'uplifting',
    text: `"Had a girl stay here once, scared stiff. Said she was a thief, didn't want to go down. I said, 'Sleep. We'll see.' She went down the next morning and came back a week later with a bag of keys and a limp, and paid for the room twice. She keeps the Ninth Key in a sock. She'll tell you where it goes if you buy the ale."` },
  { id: 'tale-quiet-below', speaker: 'Merrow Dunn', tone: 'memorable', hints: 'quiets-receipt',
    text: `"Light the fat candle on the fourth stair, and sing. Don't ask why. The Quiet Below will ask whether you've come about the account. Say yes. Say it as if you mean it. People who said no don't have names any more. People who said yes had a very pleasant afternoon, and came back with a receipt."` },
  { id: 'tale-ripe-tree', speaker: 'Pim the tavern boy', tone: 'funny',
    text: `"Right, so, the Slow Orchard. There's a tree with fruit that never ripens, and my uncle said if you pee on it, it ripens. He did. It did. It was extremely ripe. It chased him for three floors. That's all I know. Please don't tell my mother."` },
  { id: 'tale-warm-ash', speaker: 'Joss the Sweeper', tone: 'sad', hints: 'tally-hymnal',
    text: `"I keep a jar for every one. When the jar is full, I pour it out the back door, into the river. Last week I opened a jar and it was warm. Not the jar. The ash. It had a little pulse. I don't think that's allowed. The Sisters won't talk about it. Take it down to the Drainage Shrine, if you can bear it. There's a hymn book down there, in the hands of someone who stopped singing."` },
  { id: 'tale-gargoyle-grave', speaker: 'Gudrun Sixfingers', tone: 'uplifting',
    text: `"I was born with a bread knife and a bad attitude. I killed a gargoyle with the knife because I was too stubborn to run. It was crying afterwards. Not me, the gargoyle. I buried it in the Rope Cathedral, in a hole it had dug. Someone should put a flower there. It would be nice."` },
  { id: 'tale-the-ticket', speaker: 'Maud the Lender', tone: 'memorable',
    text: `"Everyone who goes down gets a ticket. You won't see it, but it's pinned somewhere on you. When I weigh you, I can feel it. Yours says, 'Due: soon.' Don't look so surprised. Everyone's does. Mine says 'Overdue.' Go find out what it means before you find out the hard way."` },
];
