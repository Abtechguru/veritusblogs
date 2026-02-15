// African Proverbs, Tales, and Wise Words with Moral Lessons
export interface WiseWord {
  id: string;
  text: string;
  origin: string; // Country or tribe
  moralLesson: string;
  category: 'proverb' | 'tale' | 'saying';
}

export const africaWiseWords: WiseWord[] = [
  // Nigerian Proverbs
  {
    id: '1',
    text: 'A bird that flies from the ground onto an anthill does not know that it is still on the ground.',
    origin: 'Nigeria (Igbo)',
    moralLesson: 'Small achievements should not make us arrogant. True success requires continuous effort.',
    category: 'proverb'
  },
  {
    id: '2',
    text: 'When the moon is shining, the cripple becomes hungry for a walk.',
    origin: 'Nigeria (Yoruba)',
    moralLesson: 'Favorable conditions inspire us to overcome our limitations.',
    category: 'proverb'
  },
  {
    id: '3',
    text: 'No matter how hot your anger is, it cannot cook yams.',
    origin: 'Nigeria (Hausa)',
    moralLesson: 'Anger is destructive and unproductive. Channel your energy into constructive actions.',
    category: 'proverb'
  },
  
  // Ghanaian Wisdom
  {
    id: '4',
    text: 'The ruin of a nation begins in the homes of its people.',
    origin: 'Ghana (Ashanti)',
    moralLesson: 'Strong families build strong communities and nations.',
    category: 'proverb'
  },
  {
    id: '5',
    text: 'One head does not go into council.',
    origin: 'Ghana',
    moralLesson: 'Important decisions require collective wisdom and consultation.',
    category: 'proverb'
  },
  
  // Kenyan Wisdom
  {
    id: '6',
    text: 'Treat the earth well. It was not given to you by your parents, it was loaned to you by your children.',
    origin: 'Kenya (Maasai)',
    moralLesson: 'We are stewards of the earth for future generations.',
    category: 'proverb'
  },
  {
    id: '7',
    text: 'A united family eats from the same plate.',
    origin: 'Kenya (Kikuyu)',
    moralLesson: 'Unity and sharing are the foundations of family strength.',
    category: 'proverb'
  },
  
  // South African Wisdom
  {
    id: '8',
    text: 'Ubuntu: I am because we are.',
    origin: 'South Africa (Zulu)',
    moralLesson: 'Our humanity is interconnected. We exist through our relationships with others.',
    category: 'proverb'
  },
  {
    id: '9',
    text: 'A person is a person through other people.',
    origin: 'South Africa',
    moralLesson: 'Community and mutual support define our humanity.',
    category: 'proverb'
  },
  
  // Ethiopian Wisdom
  {
    id: '10',
    text: 'When spider webs unite, they can tie up a lion.',
    origin: 'Ethiopia',
    moralLesson: 'Collective effort can overcome even the mightiest obstacles.',
    category: 'proverb'
  },
  {
    id: '11',
    text: 'He who learns, teaches.',
    origin: 'Ethiopia',
    moralLesson: 'Knowledge is meant to be shared. Teaching reinforces learning.',
    category: 'proverb'
  },
  
  // Tanzanian Wisdom
  {
    id: '12',
    text: 'Sticks in a bundle are unbreakable.',
    origin: 'Tanzania',
    moralLesson: 'Unity is strength. Together we are stronger than we are alone.',
    category: 'proverb'
  },
  {
    id: '13',
    text: 'Little by little grows the banana.',
    origin: 'Tanzania (Swahili)',
    moralLesson: 'Great things are achieved through patience and consistent effort.',
    category: 'proverb'
  },
  
  // Ugandan Wisdom
  {
    id: '14',
    text: 'A roaring lion kills no game.',
    origin: 'Uganda',
    moralLesson: 'Action speaks louder than words. Empty threats achieve nothing.',
    category: 'proverb'
  },
  {
    id: '15',
    text: 'The elephant does not limp when walking on thorns.',
    origin: 'Uganda',
    moralLesson: 'Strength and resilience help us overcome difficulties without complaint.',
    category: 'proverb'
  },
  
  // Senegalese Wisdom
  {
    id: '16',
    text: 'A single bracelet does not jingle.',
    origin: 'Senegal',
    moralLesson: 'We need others to make meaningful impact. Collaboration creates harmony.',
    category: 'proverb'
  },
  {
    id: '17',
    text: 'The one who asks questions doesn\'t lose his way.',
    origin: 'Senegal (Wolof)',
    moralLesson: 'Seeking knowledge and guidance prevents mistakes.',
    category: 'proverb'
  },
  
  // Zimbabwean Wisdom
  {
    id: '18',
    text: 'If you can walk, you can dance. If you can talk, you can sing.',
    origin: 'Zimbabwe',
    moralLesson: 'Celebrate life and express joy. Everyone has the capacity for happiness.',
    category: 'proverb'
  },
  {
    id: '19',
    text: 'A wise person will always find a way.',
    origin: 'Zimbabwe (Shona)',
    moralLesson: 'Wisdom and determination overcome obstacles.',
    category: 'proverb'
  },
  
  // Cameroonian Wisdom
  {
    id: '20',
    text: 'A tree is known by its fruit.',
    origin: 'Cameroon',
    moralLesson: 'Character is revealed through actions and results, not words.',
    category: 'proverb'
  },
  
  // Moroccan Wisdom
  {
    id: '21',
    text: 'The mouth is not sweetened by saying honey.',
    origin: 'Morocco',
    moralLesson: 'Actions and experiences matter more than mere words.',
    category: 'proverb'
  },
  
  // Egyptian Wisdom
  {
    id: '22',
    text: 'The best answer will come from the person who is not angry.',
    origin: 'Egypt',
    moralLesson: 'Clear thinking requires a calm mind. Anger clouds judgment.',
    category: 'proverb'
  },
  {
    id: '23',
    text: 'Man\'s schemes are inferior to those made by heaven.',
    origin: 'Egypt',
    moralLesson: 'Humility before the divine. Some things are beyond our control.',
    category: 'proverb'
  },
  
  // Congolese Wisdom
  {
    id: '24',
    text: 'A family tie is like a tree; it can bend but it cannot break.',
    origin: 'Congo',
    moralLesson: 'Family bonds are resilient and endure through challenges.',
    category: 'proverb'
  },
  {
    id: '25',
    text: 'Knowledge is like a garden: if it is not cultivated, it cannot be harvested.',
    origin: 'Congo',
    moralLesson: 'Learning requires continuous effort and practice.',
    category: 'proverb'
  },
  
  // Malian Wisdom
  {
    id: '26',
    text: 'Wisdom is like a baobab tree; no one individual can embrace it.',
    origin: 'Mali',
    moralLesson: 'Wisdom is vast and requires collective understanding.',
    category: 'proverb'
  },
  {
    id: '27',
    text: 'Patience can cook a stone.',
    origin: 'Mali (Bambara)',
    moralLesson: 'With enough patience and persistence, impossible things become possible.',
    category: 'proverb'
  },
  
  // Rwandan Wisdom
  {
    id: '28',
    text: 'You can tell a ripe corn by its look.',
    origin: 'Rwanda',
    moralLesson: 'True quality and maturity are visible to the discerning eye.',
    category: 'proverb'
  },
  {
    id: '29',
    text: 'However long the night, the dawn will break.',
    origin: 'Rwanda',
    moralLesson: 'Hope persists. Difficult times will eventually pass.',
    category: 'proverb'
  },
  
  // Somali Wisdom
  {
    id: '30',
    text: 'Talking doesn\'t fill the basket in the market.',
    origin: 'Somalia',
    moralLesson: 'Work produces results, not empty words.',
    category: 'proverb'
  },
  
  // Botswana Wisdom
  {
    id: '31',
    text: 'Rain does not fall on one roof alone.',
    origin: 'Botswana',
    moralLesson: 'Blessings and hardships come to all. We share common experiences.',
    category: 'proverb'
  },
  
  // Liberian Wisdom
  {
    id: '32',
    text: 'The fool speaks, the wise man listens.',
    origin: 'Liberia',
    moralLesson: 'Wisdom comes from listening and learning, not from talking.',
    category: 'proverb'
  },
  
  // Namibian Wisdom
  {
    id: '33',
    text: 'Ears that do not listen to advice, accompany the head when it is chopped off.',
    origin: 'Namibia',
    moralLesson: 'Ignoring wise counsel leads to dire consequences.',
    category: 'proverb'
  },
  
  // Togolese Wisdom
  {
    id: '34',
    text: 'The butterfly that brushes against thorns will tear its wings.',
    origin: 'Togo',
    moralLesson: 'Reckless behavior leads to self-harm. Be mindful of dangers.',
    category: 'proverb'
  },
  
  // Burundian Wisdom
  {
    id: '35',
    text: 'Where there are experts, there will be no lack of learners.',
    origin: 'Burundi',
    moralLesson: 'Knowledge attracts those eager to learn. Expertise inspires growth.',
    category: 'proverb'
  },
  
  // Tales and Sayings
  {
    id: '36',
    text: 'The tortoise and the hare: Slow and steady wins the race.',
    origin: 'Pan-African',
    moralLesson: 'Consistency and determination triumph over natural talent without effort.',
    category: 'tale'
  },
  {
    id: '37',
    text: 'Why the sky is far from the earth: Long ago, the sky was close until humans became greedy.',
    origin: 'West Africa',
    moralLesson: 'Greed and disrespect separate us from blessings.',
    category: 'tale'
  },
  {
    id: '38',
    text: 'Anansi the Spider: The clever trickster who taught us wisdom through cunning.',
    origin: 'Ghana (Akan)',
    moralLesson: 'Intelligence and wit can overcome physical strength.',
    category: 'tale'
  },
  {
    id: '39',
    text: 'The lion and the mouse: Even the smallest can help the mightiest.',
    origin: 'East Africa',
    moralLesson: 'Never underestimate anyone. Kindness returns in unexpected ways.',
    category: 'tale'
  },
  {
    id: '40',
    text: 'Why the bat flies at night: The bat borrowed money from all animals and now hides in shame.',
    origin: 'Nigeria',
    moralLesson: 'Honesty and integrity are valuable. Avoiding responsibilities leads to isolation.',
    category: 'tale'
  },

  // Additional Nigerian Wisdom
  {
    id: '41',
    text: 'The lizard that jumped from the high Iroko tree to the ground said he would praise himself if no one else did.',
    origin: 'Nigeria (Igbo)',
    moralLesson: 'Self-acknowledgment is important. Celebrate your achievements.',
    category: 'proverb'
  },
  {
    id: '42',
    text: 'He who does not know one thing knows another.',
    origin: 'Nigeria',
    moralLesson: 'Everyone has unique knowledge and strengths.',
    category: 'proverb'
  },
  {
    id: '43',
    text: 'A child who says his mother will not sleep, he too will not sleep.',
    origin: 'Nigeria (Yoruba)',
    moralLesson: 'Our actions affect those around us. What we wish on others affects us too.',
    category: 'proverb'
  },
  {
    id: '44',
    text: 'The toad likes water, but not when it is boiling.',
    origin: 'Nigeria',
    moralLesson: 'We must be discerning about what we desire and when.',
    category: 'proverb'
  },
  {
    id: '45',
    text: 'If you want to go quickly, go alone. If you want to go far, go together.',
    origin: 'Nigeria',
    moralLesson: 'Teamwork and collaboration lead to greater achievements.',
    category: 'proverb'
  },

  // More Ghanaian Wisdom
  {
    id: '46',
    text: 'When a king has good counselors, his reign is peaceful.',
    origin: 'Ghana (Ashanti)',
    moralLesson: 'Good advice and wise counsel lead to successful leadership.',
    category: 'proverb'
  },
  {
    id: '47',
    text: 'The one who plants trees, knowing that he will never sit in their shade, has at least started to understand life.',
    origin: 'Ghana',
    moralLesson: 'True wisdom lies in working for future generations.',
    category: 'proverb'
  },
  {
    id: '48',
    text: 'A crab does not give birth to a bird.',
    origin: 'Ghana',
    moralLesson: 'Children often reflect their parents. Character and traits are inherited.',
    category: 'proverb'
  },
  {
    id: '49',
    text: 'The stranger has big eyes but sees nothing.',
    origin: 'Ghana',
    moralLesson: 'True understanding requires more than observation; it requires context and insight.',
    category: 'proverb'
  },
  {
    id: '50',
    text: 'No one tests the depth of a river with both feet.',
    origin: 'Ghana (Akan)',
    moralLesson: 'Be cautious when facing unknown situations. Test carefully before committing.',
    category: 'proverb'
  },

  // More Kenyan Wisdom
  {
    id: '51',
    text: 'Even the lion has to defend himself against flies.',
    origin: 'Kenya',
    moralLesson: 'No one is immune to challenges, regardless of their strength.',
    category: 'proverb'
  },
  {
    id: '52',
    text: 'A bird does not sing because it has answers. It sings because it has a song.',
    origin: 'Kenya',
    moralLesson: 'Express yourself joyfully without needing to justify everything.',
    category: 'proverb'
  },
  {
    id: '53',
    text: 'When elephants fight, it is the grass that suffers.',
    origin: 'Kenya',
    moralLesson: 'When the powerful clash, the innocent often bear the consequences.',
    category: 'proverb'
  },
  {
    id: '54',
    text: 'The eye crosses the river before the body.',
    origin: 'Kenya',
    moralLesson: 'Careful planning and foresight precede successful action.',
    category: 'proverb'
  },
  {
    id: '55',
    text: 'One does not follow bees and eat honey.',
    origin: 'Kenya',
    moralLesson: 'Good things require patience and proper timing.',
    category: 'proverb'
  },

  // More South African Wisdom
  {
    id: '56',
    text: 'Even an ant can hurt an elephant.',
    origin: 'South Africa',
    moralLesson: 'Size does not determine impact. Even the smallest can make a difference.',
    category: 'proverb'
  },
  {
    id: '57',
    text: 'A large chair does not make a king.',
    origin: 'South Africa',
    moralLesson: 'Position and symbols do not determine true leadership.',
    category: 'proverb'
  },
  {
    id: '58',
    text: 'When the music changes, so does the dance.',
    origin: 'South Africa',
    moralLesson: 'Adapt to changing circumstances. Flexibility is key to survival.',
    category: 'proverb'
  },
  {
    id: '59',
    text: 'The darkness of night cannot stop the light of morning.',
    origin: 'South Africa',
    moralLesson: 'Hope endures. Difficult times are temporary.',
    category: 'proverb'
  },
  {
    id: '60',
    text: 'He who refuses to obey cannot command.',
    origin: 'South Africa',
    moralLesson: 'Good leaders must first learn to follow and understand rules.',
    category: 'proverb'
  },

  // More Ethiopian Wisdom
  {
    id: '61',
    text: 'Coffee and love taste best when hot.',
    origin: 'Ethiopia',
    moralLesson: 'Some things are best enjoyed fresh and with passion.',
    category: 'proverb'
  },
  {
    id: '62',
    text: 'He who conceals his disease cannot expect to be cured.',
    origin: 'Ethiopia',
    moralLesson: 'Honesty about problems is necessary for solutions.',
    category: 'proverb'
  },
  {
    id: '63',
    text: 'One cannot count on riches.',
    origin: 'Ethiopia',
    moralLesson: 'Material wealth is uncertain. Build character and relationships instead.',
    category: 'proverb'
  },
  {
    id: '64',
    text: 'Advise and counsel him; if he does not listen, let adversity teach him.',
    origin: 'Ethiopia',
    moralLesson: 'Some lessons can only be learned through experience.',
    category: 'proverb'
  },
  {
    id: '65',
    text: 'A witness who denies the truth is no witness at all.',
    origin: 'Ethiopia',
    moralLesson: 'Integrity and honesty are fundamental to credibility.',
    category: 'proverb'
  },

  // More Tanzanian Wisdom
  {
    id: '66',
    text: 'Where there is no shame, there is no honor.',
    origin: 'Tanzania',
    moralLesson: 'A sense of propriety and honor are interconnected.',
    category: 'proverb'
  },
  {
    id: '67',
    text: 'The hunter does not rub himself with oil without reason.',
    origin: 'Tanzania',
    moralLesson: 'Preparation has purpose. People act with intention.',
    category: 'proverb'
  },
  {
    id: '68',
    text: 'To try and to fail is not laziness.',
    origin: 'Tanzania',
    moralLesson: 'Effort and attempts matter more than guaranteed success.',
    category: 'proverb'
  },
  {
    id: '69',
    text: 'A person is a guest for one or two days, but becomes an intruder on the third.',
    origin: 'Tanzania (Swahili)',
    moralLesson: 'Respect boundaries and don\'t overstay your welcome.',
    category: 'proverb'
  },
  {
    id: '70',
    text: 'The spirit of a man is like wings of an eagle.',
    origin: 'Tanzania',
    moralLesson: 'The human spirit is capable of soaring to great heights.',
    category: 'proverb'
  },

  // More Senegalese Wisdom
  {
    id: '71',
    text: 'A chattering bird builds no nest.',
    origin: 'Senegal',
    moralLesson: 'Too much talk without action achieves nothing.',
    category: 'proverb'
  },
  {
    id: '72',
    text: 'The heart of the wise man lies quiet like limpid water.',
    origin: 'Senegal',
    moralLesson: 'Wisdom brings inner peace and calm.',
    category: 'proverb'
  },
  {
    id: '73',
    text: 'A man who pays respect to the great paves the way for his own greatness.',
    origin: 'Senegal',
    moralLesson: 'Honor and respect others to build your own reputation.',
    category: 'proverb'
  },
  {
    id: '74',
    text: 'You are beautiful because of your possessions.',
    origin: 'Senegal (Wolof)',
    moralLesson: 'Inner qualities and character create true beauty.',
    category: 'proverb'
  },
  {
    id: '75',
    text: 'Do not call the forest that shelters you a jungle.',
    origin: 'Senegal',
    moralLesson: 'Be grateful for what protects and sustains you.',
    category: 'proverb'
  },

  // More Zimbabwean Wisdom
  {
    id: '76',
    text: 'The day you learn to be publicly specific in your prayer, that is the day you will discover power.',
    origin: 'Zimbabwe',
    moralLesson: 'Clarity and boldness in purpose bring results.',
    category: 'proverb'
  },
  {
    id: '77',
    text: 'Cross the river in a crowd and the crocodile won\'t eat you.',
    origin: 'Zimbabwe',
    moralLesson: 'There is safety in numbers and community.',
    category: 'proverb'
  },
  {
    id: '78',
    text: 'Two birds disputed about a kernel, when a third swooped down and carried it off.',
    origin: 'Zimbabwe',
    moralLesson: 'While we quarrel, opportunities slip away to others.',
    category: 'proverb'
  },
  {
    id: '79',
    text: 'An orphaned calf licks its own back.',
    origin: 'Zimbabwe',
    moralLesson: 'Self-reliance is necessary when support is absent.',
    category: 'proverb'
  },
  {
    id: '80',
    text: 'A cutting word is worse than a bowstring, a cut may heal, but the cut of the tongue does not.',
    origin: 'Zimbabwe',
    moralLesson: 'Words can cause deeper wounds than physical injuries.',
    category: 'proverb'
  },

  // More Egyptian Wisdom
  {
    id: '81',
    text: 'An army of sheep led by a lion can defeat an army of lions led by a sheep.',
    origin: 'Egypt',
    moralLesson: 'Leadership quality determines success more than followers\' strength.',
    category: 'proverb'
  },
  {
    id: '82',
    text: 'He who plants dates does not eat dates.',
    origin: 'Egypt',
    moralLesson: 'We work for future generations, not just immediate rewards.',
    category: 'proverb'
  },
  {
    id: '83',
    text: 'An educated man without work is like a cloud without rain.',
    origin: 'Egypt',
    moralLesson: 'Knowledge must be applied to be valuable.',
    category: 'proverb'
  },
  {
    id: '84',
    text: 'The best place to find a helping hand is at the end of your own arm.',
    origin: 'Egypt',
    moralLesson: 'Self-reliance is important. Start with your own efforts.',
    category: 'proverb'
  },
  {
    id: '85',
    text: 'Visit rarely, and you will be more loved.',
    origin: 'Egypt',
    moralLesson: 'Absence can increase appreciation. Don\'t become a burden.',
    category: 'proverb'
  },

  // More Congolese Wisdom
  {
    id: '86',
    text: 'Wood already touched by fire is not hard to set alight.',
    origin: 'Congo',
    moralLesson: 'Experience makes subsequent attempts easier.',
    category: 'proverb'
  },
  {
    id: '87',
    text: 'He who is unable to dance says that the yard is stony.',
    origin: 'Congo',
    moralLesson: 'People blame external factors for their own shortcomings.',
    category: 'proverb'
  },
  {
    id: '88',
    text: 'A single stick may smoke, but it will not burn.',
    origin: 'Congo',
    moralLesson: 'Collective effort creates lasting impact.',
    category: 'proverb'
  },
  {
    id: '89',
    text: 'The hand that gives is always on top.',
    origin: 'Congo',
    moralLesson: 'Generosity positions you advantageously in relationships.',
    category: 'proverb'
  },
  {
    id: '90',
    text: 'You cannot build a house for last year\'s summer.',
    origin: 'Congo',
    moralLesson: 'Focus on present and future needs, not past opportunities.',
    category: 'proverb'
  },

  // More Malian Wisdom
  {
    id: '91',
    text: 'Talking doesn\'t boil rice.',
    origin: 'Mali',
    moralLesson: 'Words without action produce no results.',
    category: 'proverb'
  },
  {
    id: '92',
    text: 'When you follow in the path of your father, you learn to walk like him.',
    origin: 'Mali',
    moralLesson: 'We learn by following examples and mentors.',
    category: 'proverb'
  },
  {
    id: '93',
    text: 'Do not let what you cannot do tear from your hands what you can.',
    origin: 'Mali',
    moralLesson: 'Focus on your abilities rather than limitations.',
    category: 'proverb'
  },
  {
    id: '94',
    text: 'A man\'s wealth may be superior to him.',
    origin: 'Mali (Bambara)',
    moralLesson: 'Material possessions don\'t define your worth or character.',
    category: 'proverb'
  },
  {
    id: '95',
    text: 'By trying often, the monkey learns to jump from the tree.',
    origin: 'Mali',
    moralLesson: 'Practice and persistence lead to mastery.',
    category: 'proverb'
  },

  // More Rwandan Wisdom
  {
    id: '96',
    text: 'The one who asks questions doesn\'t lose his way.',
    origin: 'Rwanda',
    moralLesson: 'Seeking knowledge and guidance prevents mistakes.',
    category: 'proverb'
  },
  {
    id: '97',
    text: 'A small house will hold a hundred friends.',
    origin: 'Rwanda',
    moralLesson: 'Hospitality and warmth matter more than material abundance.',
    category: 'proverb'
  },
  {
    id: '98',
    text: 'Ashes fly back into the face of him who throws them.',
    origin: 'Rwanda',
    moralLesson: 'Harm you intend for others often returns to you.',
    category: 'proverb'
  },
  {
    id: '99',
    text: 'Hurrying has no blessings.',
    origin: 'Rwanda',
    moralLesson: 'Patience and careful action lead to better outcomes than haste.',
    category: 'proverb'
  },
  {
    id: '100',
    text: 'One finger cannot lift a pebble.',
    origin: 'Rwanda',
    moralLesson: 'Cooperation and teamwork are necessary for success.',
    category: 'proverb'
  }
];

// Function to get random wise word
export const getRandomWiseWord = (): WiseWord => {
  return africaWiseWords[Math.floor(Math.random() * africaWiseWords.length)];
};

// Function to get wise words by category
export const getWiseWordsByCategory = (category: WiseWord['category']): WiseWord[] => {
  return africaWiseWords.filter(word => word.category === category);
};

// Function to get wise words by origin
export const getWiseWordsByOrigin = (origin: string): WiseWord[] => {
  return africaWiseWords.filter(word => word.origin.toLowerCase().includes(origin.toLowerCase()));
};