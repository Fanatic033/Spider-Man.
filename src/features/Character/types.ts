
interface PowerStats {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  }
  
 interface Biography {
    "full-name": string;
    "alter-egos": string;
    aliases: string[];
    "place-of-birth": string;
    "first-appearance": string;
    publisher: string;
    alignment: string;
  }
  
 interface Appearance {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    "eye-color": string;
    "hair-color": string;
  }
  
 export  interface Hero {
    id: string;
    name: string;
    powerstats: PowerStats;
    biography: Biography;
    appearance: Appearance;
    image: {
      url: string;
    };
  }