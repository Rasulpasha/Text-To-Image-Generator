const adjectives = [
  'vibrant', 'ethereal', 'mysterious', 'futuristic', 'ancient', 
  'magical', 'cosmic', 'serene', 'cyberpunk', 'enchanted',
  'dreamy', 'dystopian', 'surreal', 'hyper-realistic', 'minimalist'
];

const subjects = [
  'cityscape', 'forest', 'astronaut', 'robot', 'dragon', 
  'spaceship', 'ocean', 'mountains', 'cybernetic being', 'samurai',
  'floating islands', 'portal', 'garden', 'temple', 'space station'
];

const settings = [
  'at sunset', 'under a starry sky', 'in a foggy landscape', 'during a storm',
  'with neon lights', 'with bioluminescent elements', 'in a post-apocalyptic world',
  'with floating particles', 'with aurora borealis', 'in a crystal cave'
];

export const generateRandomPrompt = (): string => {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
  const randomSetting = settings[Math.floor(Math.random() * settings.length)];

  return `A ${randomAdjective} ${randomSubject} ${randomSetting}`;
};