// Comment function
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const emotes = ['🌟', '🛡️', '🐱', '🐉', '🦆', '🥄', '✨', '🚀', '🌈', '🌸', '🌊', '🏰'];

const subjects = [
  'A brave knight', 'A curious cat', 'A mischievous fox', 'An adventurous panda',
  'A wise owl', 'A friendly alien', 'A magical unicorn', 'A determined explorer',
  'A talking robot', 'A time traveler', 'A fearless astronaut', 'A magical mermaid',
  'A quirky inventor', 'A talented artist', 'A heroic firefighter', 'A mysterious detective',
  // ... Add more subjects
];

const actions = [
  'embarked on a journey', 'explored a mysterious cave', 'discovered a hidden treasure', 'flew to a distant planet',
  'ventured into the enchanted forest', 'solved a cosmic mystery', 'battled an army of snowmen', 'uncovered an ancient map',
  'bravely faced a dragon', 'rescued a lost friend', 'found a secret portal', 'defended a magical realm',
  'sailed through uncharted waters', 'unraveled a puzzling riddle', 'created a magical potion', 'defeated the villainous sorcerer',
  // ... Add more actions
];

const endings = [
  'and found unexpected companions.', 'and faced magical challenges.', 'and lived happily ever after.',
  'with a heart full of adventure.', 'forever changed by the experience.', 'that echoed through the ages.',
  'with a smile that could light up the universe.', 'as legends in their own right.', 'that inspired generations to come.',
  'that brought harmony to the world.', 'that proved dreams can come true.', 'that ignited the sparks of imagination.',
  // ... Add more endings
];

const plots = [
  'An ancient prophecy foretells a great quest', 'An otherworldly artifact holds immense power', 'A time loop leads to unexpected encounters',
  'Mysterious disappearances plague the village', 'A forbidden love blossoms between two worlds', 'A portal opens to a realm of magic and wonder',
  'A secret society guards the knowledge of a hidden treasure', 'A cosmic event threatens to reshape reality',
  'A cursed object must be destroyed to save the realm', 'A rival adventurer seeks the same legendary artifact',
  // ... Add more plots
];

const drama = [
  'betrayal', 'revenge', 'jealousy', 'sacrifice', 'forgiveness', 'redemption', 'triumph over adversity', 'unexpected alliances',
  'self-discovery', 'unmasking of secrets', 'conflict with inner demons', 'unbreakable bonds', 'loss and resilience', 'unveiling of a hidden truth',
  // ... Add more drama elements
];

const love = [
  'forbidden love', 'unrequited love', 'true love', 'love at first sight', 'fierce devotion', 'sacrificial love', 'unbreakable bond', 'enduring affection',
  // ... Add more love elements
];

function generateStory() {
  const randomSubject = getRandomElement(subjects);
  const randomAction = getRandomElement(actions);
  const randomEnding = getRandomElement(endings);
  const randomPlot = getRandomElement(plots);
  const randomDrama = getRandomElement(drama);
  const randomLove = getRandomElement(love);

  const selectedEmotes = shuffleArray(emotes).slice(0, 1)

  const storyParts = selectedEmotes.map((emote) => {
    return ` ${emote} ${generateSentence(randomSubject, randomAction, randomEnding, randomPlot, randomDrama, randomLove)}`;
  });
  return `Once upon a time...${storyParts.join('')}`;
}

function generateSentence(subject, action, ending, plot, drama, love) {
  return `${subject} ${action}, in a tale filled with ${drama} and ${love}. ${plot}. ${ending}`;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const story = generateStory();
data.result = story

    return {
        code: d.util.setCode(data),
    };
};
