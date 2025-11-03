export interface Battle {
  id: string;
  title: string;
  year: number;
  participants: string[];
  description: string;
  impact: number;
  tags: string[];
  image: string;
  keyTracks: {
    title: string;
    artist: string;
    year: number;
    description: string;
    youtubeUrl: string;
  }[];
  context: string;
  outcome: string;
  culturalImpact: string;
}

// Images hébergées sur CDN externe (solution temporaire)
export const battles: Battle[] = [
  {
    id: "nas-jay-z",
    title: "Nas vs Jay-Z",
    year: 2001,
    participants: ["Nas", "Jay-Z"],
    description: "L'une des battles les plus légendaires du hip-hop, opposant deux géants de la côte Est dans un affrontement lyrical épique.",
    impact: 10,
    tags: ["Légende", "East Coast", "Technique", "Lyrical"],
    image: "https://townsquare.media/site/812/files/2014/10/jay-z-nas-2005.jpg?w=780&q=75",
    keyTracks: [
      {
        title: "Takeover",
        artist: "Jay-Z",
        year: 2001,
        description: "Jay-Z lance les hostilités avec ce morceau agressif qui vise Nas et Prodigy de Mobb Deep.",
        youtubeUrl: "https://www.youtube.com/watch?v=Aht7DVRRNiQ"
      },
      {
        title: "Ether",
        artist: "Nas",
        year: 2001,
        description: "La réponse dévastatrice de Nas, considérée comme l'un des meilleurs diss tracks de tous les temps.",
        youtubeUrl: "https://www.youtube.com/watch?v=0ePQKD9iBfU"
      }
    ],
    context: "La rivalité entre Nas et Jay-Z couvait depuis des années, alimentée par la compétition pour le titre de roi du rap new-yorkais. Les tensions ont éclaté publiquement en 2001.",
    outcome: "Généralement considéré comme une victoire de Nas grâce à 'Ether', bien que les deux artistes se soient réconciliés en 2005.",
    culturalImpact: "Cette battle a redéfini les standards des diss tracks et reste une référence absolue dans la culture hip-hop."
  },
  {
    id: "ice-cube-nwa",
    title: "Ice Cube vs N.W.A",
    year: 1990,
    participants: ["Ice Cube", "N.W.A"],
    description: "La battle qui a secoué le rap West Coast quand Ice Cube a quitté N.W.A et a riposté avec 'No Vaseline'.",
    impact: 10,
    tags: ["Légende", "West Coast", "Gangsta Rap", "Révolutionnaire"],
    image: "https://i.ebayimg.com/images/g/ATkAAOSwhAxgakFB/s-l400.jpg",
    keyTracks: [
      {
        title: "No Vaseline",
        artist: "Ice Cube",
        year: 1991,
        description: "L'un des diss tracks les plus brutaux de l'histoire, Ice Cube détruit ses anciens partenaires de N.W.A.",
        youtubeUrl: "https://www.youtube.com/watch?v=bvRc7pwnt0U"
      }
    ],
    context: "Ice Cube a quitté N.W.A en 1989 à cause de disputes financières avec le manager Jerry Heller et Eazy-E.",
    outcome: "Victoire écrasante d'Ice Cube. 'No Vaseline' est considéré comme l'un des meilleurs diss tracks de tous les temps.",
    culturalImpact: "Cette battle a montré le pouvoir destructeur d'un diss track bien construit et a influencé toute une génération de rappeurs."
  },
  {
    id: "eminem-mgk",
    title: "Eminem vs Machine Gun Kelly",
    year: 2018,
    participants: ["Eminem", "Machine Gun Kelly"],
    description: "La battle moderne qui a rappelé pourquoi Eminem reste le roi du diss track.",
    impact: 9,
    tags: ["Moderne", "Technique", "Destruction", "Viral"],
    image: "https://i.ytimg.com/vi/FxQTY-W6GIo/maxresdefault.jpg",
    keyTracks: [
      {
        title: "Rap Devil",
        artist: "Machine Gun Kelly",
        year: 2018,
        description: "MGK répond aux attaques d'Eminem avec ce diss track agressif.",
        youtubeUrl: "https://www.youtube.com/watch?v=Fp0BScQSSvg"
      },
      {
        title: "Killshot",
        artist: "Eminem",
        year: 2018,
        description: "La réponse dévastatrice d'Eminem qui a mis fin à la carrière rap de MGK.",
        youtubeUrl: "https://www.youtube.com/watch?v=FxQTY-W6GIo"
      }
    ],
    context: "La tension entre Eminem et MGK couvait depuis des années, notamment à cause de commentaires de MGK sur la fille d'Eminem.",
    outcome: "Victoire écrasante d'Eminem. MGK s'est tourné vers le rock après cette battle.",
    culturalImpact: "Cette battle a prouvé qu'Eminem reste le maître incontesté du diss track à l'ère des réseaux sociaux."
  },
  {
    id: "drake-pusha-t",
    title: "Drake vs Pusha T",
    year: 2018,
    participants: ["Drake", "Pusha T"],
    description: "La battle qui a révélé le fils secret de Drake et changé sa vie à jamais.",
    impact: 10,
    tags: ["Révélation", "Scandale", "Moderne", "Destruction"],
    image: "https://media.newyorker.com/photos/5b1175893ce62235239ce9b2/master/w_2560%2Cc_limit/StFelix-Drake-Pusha-T.jpg",
    keyTracks: [
      {
        title: "Duppy Freestyle",
        artist: "Drake",
        year: 2018,
        description: "Drake répond aux attaques de Pusha T avec ce freestyle confiant.",
        youtubeUrl: "https://www.youtube.com/watch?v=Pm8qZ8HQJv0"
      },
      {
        title: "The Story of Adidon",
        artist: "Pusha T",
        year: 2018,
        description: "Le diss track qui a révélé l'existence du fils secret de Drake, Adonis.",
        youtubeUrl: "https://www.youtube.com/watch?v=VfIuJFuI8_M"
      }
    ],
    context: "La rivalité remonte aux tensions entre les labels YMCMB et G.O.O.D Music, exacerbées par les subliminals de Pusha T.",
    outcome: "Victoire de Pusha T. Drake a été forcé de reconnaître publiquement son fils.",
    culturalImpact: "Cette battle a montré que même les plus grandes stars peuvent être vulnérables face à un diss track bien construit."
  },
  {
    id: "kendrick-drake-2024",
    title: "Kendrick Lamar vs Drake",
    year: 2024,
    participants: ["Kendrick Lamar", "Drake"],
    description: "La battle explosive de 2024 qui a dominé les charts mondiaux et redéfini le rap game.",
    impact: 10,
    tags: ["Récent", "Viral", "Charts", "Épique"],
    image: "https://www.hollywoodreporter.com/wp-content/uploads/2024/05/Drake-and-Kendrick-Lamar-Split-Getty-H-2024.jpg?w=1296&h=730&crop=1",
    keyTracks: [
      {
        title: "Family Matters",
        artist: "Drake",
        year: 2024,
        description: "Drake attaque Kendrick avec des accusations personnelles dans ce morceau de 7 minutes.",
        youtubeUrl: "https://www.youtube.com/watch?v=Aht7DVRRNiQ"
      },
      {
        title: "Meet the Grahams",
        artist: "Kendrick Lamar",
        year: 2024,
        description: "Kendrick répond avec un morceau glaçant qui s'adresse directement à la famille de Drake.",
        youtubeUrl: "https://www.youtube.com/watch?v=0ePQKD9iBfU"
      },
      {
        title: "Not Like Us",
        artist: "Kendrick Lamar",
        year: 2024,
        description: "Le coup de grâce de Kendrick qui a atteint le #1 des charts et est devenu un phénomène culturel.",
        youtubeUrl: "https://www.youtube.com/watch?v=bvRc7pwnt0U"
      }
    ],
    context: "La tension a éclaté après des années de subliminals, déclenchée par le verse de Kendrick sur 'Like That' de Future et Metro Boomin.",
    outcome: "Victoire largement attribuée à Kendrick Lamar, 'Not Like Us' devenant un hit mondial.",
    culturalImpact: "Cette battle a prouvé que le diss track reste un art vivant et peut encore dominer la culture populaire en 2024."
  },
  {
    id: "2pac-biggie",
    title: "2Pac vs Biggie",
    year: 1996,
    participants: ["2Pac", "The Notorious B.I.G."],
    description: "La battle tragique qui symbolise la guerre East Coast vs West Coast et ses conséquences dramatiques.",
    impact: 10,
    tags: ["Tragique", "Légende", "East vs West", "Historique"],
    image: "https://i.guim.co.uk/img/media/f98c12e4a4ea9376628372851311cf9f0eba28e4/0_0_2953_1773/master/2953.jpg?width=465&dpr=1&s=none&crop=none",
    keyTracks: [
      {
        title: "Hit 'Em Up",
        artist: "2Pac",
        year: 1996,
        description: "L'un des diss tracks les plus agressifs de l'histoire, 2Pac attaque violemment Biggie et Bad Boy Records.",
        youtubeUrl: "https://www.youtube.com/watch?v=41qC3w3UUkU"
      },
      {
        title: "Who Shot Ya?",
        artist: "The Notorious B.I.G.",
        year: 1995,
        description: "Bien que Biggie ait nié que ce soit un diss, 2Pac l'a interprété comme une provocation.",
        youtubeUrl: "https://www.youtube.com/watch?v=Y7yQwQNHn9g"
      }
    ],
    context: "La rivalité a commencé après l'agression de 2Pac en 1994, qu'il a attribuée à Biggie et Bad Boy Records.",
    outcome: "Tragédie : les deux artistes ont été assassinés en 1996 et 1997, mettant fin à cette guerre destructrice.",
    culturalImpact: "Cette battle a changé le hip-hop à jamais, montrant les dangers de l'escalade dans les conflits rap."
  },
  {
    id: "ll-cool-j-canibus",
    title: "LL Cool J vs Canibus",
    year: 1997,
    participants: ["LL Cool J", "Canibus"],
    description: "La battle technique qui a opposé la légende LL Cool J au jeune prodige Canibus.",
    impact: 8,
    tags: ["Technique", "Lyrical", "Vétéran vs Rookie", "Skills"],
    image: "https://media.gettyimages.com/id/75502671/photo/ll-cool-j-on-7-2-87-in-chicago-il-in-various-locations.jpg?s=612x612&w=gi&k=20&c=7jUtMiuzkpVZPjQOshfrwk99-wg113ynWb3Pmkxvwfg=",
    keyTracks: [
      {
        title: "4, 3, 2, 1",
        artist: "LL Cool J ft. Canibus",
        year: 1997,
        description: "Le morceau qui a déclenché la battle, avec un malentendu sur les paroles de Canibus.",
        youtubeUrl: "https://www.youtube.com/watch?v=vHe7RSPxhyE"
      },
      {
        title: "Second Round K.O.",
        artist: "Canibus",
        year: 1998,
        description: "Canibus attaque LL Cool J avec des punchlines techniques impressionnantes.",
        youtubeUrl: "https://www.youtube.com/watch?v=WHuvJFwCu_U"
      }
    ],
    context: "La battle a commencé par un malentendu lors de l'enregistrement de '4, 3, 2, 1', escaladant rapidement.",
    outcome: "Match nul selon la plupart des observateurs, chacun ayant montré ses forces.",
    culturalImpact: "Cette battle a souligné l'importance des skills lyriques purs dans le hip-hop."
  },
  {
    id: "common-ice-cube",
    title: "Common vs Ice Cube",
    year: 1994,
    participants: ["Common", "Ice Cube"],
    description: "Le clash entre rap conscient et gangsta rap qui a divisé la communauté hip-hop.",
    impact: 7,
    tags: ["Conscient vs Gangsta", "Philosophique", "Chicago vs LA", "Débat"],
    image: "https://media.gettyimages.com/id/483623386/photo/premiere-of-universal-pictures-and-legendary-pictures-straight-outta-compton-after-party.jpg?s=1024x1024&w=gi&k=20&c=4LEnO4wLzYGwKCXyAavaFGLQWyhJsS9H2tJC32swsg0=",
    keyTracks: [
      {
        title: "I Used to Love H.E.R.",
        artist: "Common",
        year: 1994,
        description: "Common critique l'évolution du hip-hop vers le gangsta rap, visant indirectement Ice Cube.",
        youtubeUrl: "https://www.youtube.com/watch?v=C99iG4HoO1c"
      },
      {
        title: "The Bitch in Yoo",
        artist: "Ice Cube",
        year: 1996,
        description: "Ice Cube répond violemment aux critiques de Common sur le gangsta rap.",
        youtubeUrl: "https://www.youtube.com/watch?v=2z3GJiZqDCI"
      }
    ],
    context: "Le conflit représentait un débat plus large sur la direction artistique du hip-hop dans les années 90.",
    outcome: "Victoire artistique de Common, défendant avec succès le rap conscient.",
    culturalImpact: "Cette battle a légitimé le rap conscient face au gangsta rap dominant de l'époque."
  },
  {
    id: "50-cent-ja-rule",
    title: "50 Cent vs Ja Rule",
    year: 2003,
    participants: ["50 Cent", "Ja Rule"],
    description: "La guerre commerciale et personnelle qui a dominé le rap des années 2000, opposant deux titans de New York.",
    impact: 9,
    tags: ["Commercial", "New York", "2000s", "Vendetta"],
    image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/10/28/09/screen-shot-2018-10-28-at-09.49.34.png?width=1200",
    keyTracks: [
      {
        title: "Back Down",
        artist: "50 Cent",
        year: 2003,
        description: "50 Cent attaque Ja Rule avec ce morceau agressif qui lance officiellement la guerre.",
        youtubeUrl: "https://www.youtube.com/watch?v=7JW133P0rZs"
      },
      {
        title: "Loose Change",
        artist: "Ja Rule",
        year: 2003,
        description: "La réponse de Ja Rule qui tente de riposter aux attaques de 50 Cent.",
        youtubeUrl: "https://www.youtube.com/watch?v=VfIuJFuI8_M"
      }
    ],
    context: "La rivalité a commencé dans les rues de Queens et s'est intensifiée avec le succès commercial des deux artistes.",
    outcome: "Victoire de 50 Cent qui a dominé commercialement et artistiquement, mettant fin à la carrière de Ja Rule.",
    culturalImpact: "Cette battle a montré l'importance du marketing et de la stratégie dans les conflits hip-hop modernes."
  },
  {
    id: "eazy-e-dr-dre",
    title: "Eazy-E vs Dr. Dre",
    year: 1993,
    participants: ["Eazy-E", "Dr. Dre"],
    description: "La bataille entre anciens partenaires de N.W.A qui a révélé les tensions internes du groupe légendaire.",
    impact: 8,
    tags: ["N.W.A", "West Coast", "Trahison", "Producteur vs Rappeur"],
    image: "https://exposedvocals.com/wp-content/uploads/2024/08/Dr-dre-vs-eazy-e-exposedvocals.png",
    keyTracks: [
      {
        title: "Real Muthaphuckkin G's",
        artist: "Eazy-E",
        year: 1993,
        description: "Eazy-E attaque Dr. Dre et Snoop Dogg avec ce diss track brutal et personnel.",
        youtubeUrl: "https://www.youtube.com/watch?v=fJuapp9SORA"
      },
      {
        title: "Dre Day",
        artist: "Dr. Dre ft. Snoop Dogg",
        year: 1992,
        description: "Dr. Dre lance les hostilités contre Eazy-E avec ce hit qui a dominé les charts.",
        youtubeUrl: "https://www.youtube.com/watch?v=QFcv5Ma8u8k"
      }
    ],
    context: "La rupture de N.W.A a créé des tensions entre Eazy-E et Dr. Dre, exacerbées par des questions d'argent et de crédit artistique.",
    outcome: "Match nul artistique, mais Dr. Dre a gagné commercialement avec 'The Chronic'.",
    culturalImpact: "Cette battle a montré que même les plus proches collaborateurs peuvent devenir des ennemis dans l'industrie musicale."
  },
  {
    id: "kendrick-control-verse",
    title: "Kendrick Lamar - Control Verse",
    year: 2013,
    participants: ["Kendrick Lamar", "Tous les rappeurs"],
    description: "Le verse qui a secoué tout le rap game, Kendrick défiant une génération entière de rappeurs.",
    impact: 10,
    tags: ["Révolutionnaire", "2010s", "Défi", "Nouvelle École"],
    image: "https://f4.bcbits.com/img/a3271014018_16.jpg",
    keyTracks: [
      {
        title: "Control",
        artist: "Big Sean ft. Kendrick Lamar",
        year: 2013,
        description: "Le verse de Kendrick qui a défié Drake, Big Sean, Pusha T et toute la nouvelle génération.",
        youtubeUrl: "https://www.youtube.com/watch?v=W7zdMeZPkpY"
      },
      {
        title: "The Language",
        artist: "Drake",
        year: 2013,
        description: "Une des nombreuses réponses indirectes au défi de Kendrick.",
        youtubeUrl: "https://www.youtube.com/watch?v=3Gb3faOzvBk"
      }
    ],
    context: "Kendrick a utilisé un featuring sur l'album de Big Sean pour lancer un défi à toute sa génération de rappeurs.",
    outcome: "Kendrick a établi sa domination artistique, peu de rappeurs ont osé répondre directement.",
    culturalImpact: "Ce verse a redéfini la compétition dans le rap moderne et établi Kendrick comme le roi de sa génération."
  },
  {
    id: "lil-wayne-pusha-t",
    title: "Lil Wayne vs Pusha T",
    year: 2012,
    participants: ["Lil Wayne", "Pusha T"],
    description: "La bataille qui a précédé le conflit Drake vs Pusha T, opposant le mentor et le futur rival.",
    impact: 7,
    tags: ["YMCMB vs G.O.O.D", "Mentor vs Challenger", "2010s", "Prélude"],
    image: "https://www.lilwaynehq.com/images/beef/lil-wayne-pusha-t.jpg",
    keyTracks: [
      {
        title: "Ghoulish",
        artist: "Pusha T",
        year: 2012,
        description: "Pusha T attaque Lil Wayne et Young Money avec ce morceau agressif.",
        youtubeUrl: "https://www.youtube.com/watch?v=tKnuWsxVIAI"
      },
      {
        title: "Goulish (Response)",
        artist: "Lil Wayne",
        year: 2012,
        description: "La réponse de Lil Wayne qui défend son empire Young Money.",
        youtubeUrl: "https://www.youtube.com/watch?v=tKnuWsxVIAI"
      }
    ],
    context: "Les tensions entre les labels YMCMB et G.O.O.D Music ont créé ce conflit entre deux générations de rappeurs.",
    outcome: "Match nul, mais cette battle a préparé le terrain pour le futur conflit Drake vs Pusha T.",
    culturalImpact: "Cette battle a montré l'évolution des conflits hip-hop vers des guerres de labels plutôt que personnelles."
  }
];

export const timeline = battles
  .sort((a, b) => a.year - b.year)
  .map(battle => ({
    year: battle.year,
    title: battle.title,
    description: battle.description,
    id: battle.id
  }));

export const timelineEvents = battles
  .sort((a, b) => a.year - b.year)
  .map(battle => ({
    id: battle.id,
    year: battle.year,
    title: battle.title,
    description: battle.description,
    impact: battle.impact,
    participants: battle.participants
  }));