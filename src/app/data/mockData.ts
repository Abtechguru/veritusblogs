export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  coverImage: string;
  publishedAt: string;
  views: number;
  readTime: number;
  tags: string[];
  featured: boolean;
}

export type Category = 'sports' | 'cultures' | 'politics' | 'weather' | 'celebrity-gist';

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export const categories: { name: string; slug: Category; description: string }[] = [
  { name: 'Sports', slug: 'sports', description: 'Latest updates and analysis from the world of sports' },
  { name: 'Cultures', slug: 'cultures', description: 'Exploring traditions, arts, and lifestyle' },
  { name: 'Politics', slug: 'politics', description: 'In-depth coverage of political landscape and events' },
  { name: 'Weather', slug: 'weather', description: 'Real-time updates and forecasts' },
  { name: 'Celebrity Gist', slug: 'celebrity-gist', description: 'Trending news and entertainment stories' },
];

export const mockArticles: Article[] = [
  {
    id: 'ombugadu-declaration-2027',
    title: 'Editorial: Ombugadu Dispels Speculation with Definitive 2027 Governorship Declaration',
    slug: 'ombugadu-dispels-speculation-2027',
    excerpt: 'A Direct Pronouncement Reorients the Political Narrative and Nullifies Deputy Ticket Rumors. Ombugadu himself has made an explicit and unambiguous declaration.',
    content: `
      <p>In the prelude to every major electoral cycle, conjecture often competes with fact, and rumor attempts to masquerade as reality. The unfolding political discourse surrounding the 2027 Nasarawa State governorship race has been no exception. Persistent claims suggesting that David Ombugadu is positioning himself for a deputy governorship slot have circulated in various quarters. That narrative, however, has now been authoritatively extinguished. Ombugadu himself has made an explicit and unambiguous declaration: his aspiration is for the office of Governor.</p>
      <img src="https://placehold.co/800x400/1a1a1a/FFF?text=Electoral+Clarification" alt="Electoral Clarification" class="w-full rounded-lg my-6 shadow-lg" />

      <p>Such a forthright proclamation carries decisive weight. In political communication, there exists no higher evidentiary standard than a candidate’s own categorical statement of intent. Ombugadu’s declaration is neither implied nor speculative — it is deliberate, direct, and dispositive. It reconfigures the conversation and renders contrary insinuations untenable.</p>
      <img src="/david portrat.jpg" alt="David Ombugadu" class="w-full rounded-lg my-6 shadow-lg" />

      <p>The endurance of the deputy governorship rumor illustrates a familiar electoral phenomenon: premature projections and strategically seeded interpretations often seek to define candidacies before aspirants define themselves. These narratives, while sometimes politically motivated, frequently generate avoidable confusion among supporters and the broader electorate. In this instance, the candidate’s own voice has superseded the rumor mill, restoring clarity where ambiguity had been allowed to fester.</p>
      <img src="https://placehold.co/800x400/1F2937/FFF?text=Dispelling+Rumors" alt="Dispelling Rumors" class="w-full rounded-lg my-6 shadow-lg" />

      <p>Moreover, Ombugadu’s stated ambition coheres with his political pedigree, electoral history, and leadership profile. Figures who have operated at the apex of gubernatorial contests seldom recalibrate toward subordinate roles absent a formal coalition framework or negotiated alliance — neither of which has been credibly advanced here. Instead, what has emerged is a self-articulated, principal-ticket ambition that aligns with his established political trajectory.</p>
      <img src="/david_campaign_flag.jpg" alt="Campaign Flag" class="w-full rounded-lg my-6 shadow-lg" />

      <p>This clarification should serve as a pivot point for more substantive civic engagement. Electoral dialogue in Nasarawa State ought now to transcend speculative ticket permutations and instead interrogate matters of governance philosophy, developmental strategy, institutional reform, and administrative competence. Democracies are strengthened when voter attention is directed toward vision and viability rather than rumor and conjecture.</p>
      <img src="https://placehold.co/800x400/000000/FFF?text=Civic+Engagement" alt="Civic Engagement" class="w-full rounded-lg my-6 shadow-lg" />

      <p>Political commentators, stakeholders, and opinion shapers bear a corresponding obligation to elevate factual accuracy above sensational repetition. To perpetuate a disproven narrative after a candidate’s unequivocal declaration is not merely imprecise — it is intellectually negligent.</p>
      <img src="https://placehold.co/800x400/374151/FFF?text=Media+Responsibility" alt="Media Responsibility" class="w-full rounded-lg my-6 shadow-lg" />

      <p>With his personal and public pronouncement, David Ombugadu has conclusively settled the matter of his 2027 electoral objective. The proposition is no longer interpretive; it is declarative. His candidacy, by his own words, is aimed squarely at the governorship — unequivocally, unapologetically, and unmistakably.</p>
      <img src="/david portrat.jpg" alt="David Ombugadu Victory" class="w-full rounded-lg my-6 shadow-lg" />
    `,
    category: 'politics',
    authorId: '5',
    authorName: 'Editorial Board',
    authorAvatar: '/david portrat.jpg',
    coverImage: '/david portrat.jpg',
    publishedAt: new Date().toISOString(),
    views: 15420,
    readTime: 6,
    tags: ['Politics', 'Nasarawa2027', 'Ombugadu', 'Editorial'],
    featured: true,
  },
  {
    id: '1',
    title: 'The Rise of African Football: A New Era of Excellence',
    slug: 'rise-of-african-football',
    excerpt: 'African nations are making unprecedented strides in world football, with young talents emerging as global superstars.',
    content: `<p>The landscape of world football is witnessing a remarkable transformation as African nations continue to produce exceptional talent that dominates leagues across Europe and beyond.</p>
    
    <h2>A New Generation of Stars</h2>
    <p>From the Premier League to La Liga, African players are not just participating—they're leading. The combination of raw talent, tactical intelligence, and unwavering determination has created a generation of footballers who are redefining excellence in the sport.</p>
    
    <h2>Investment in Youth Development</h2>
    <p>Many African nations have invested heavily in youth academies and development programs, creating pathways for young talents to reach their full potential. This systematic approach is now bearing fruit at the highest levels of the game.</p>
    
    <p>As we look to the future, the trajectory is clear: African football is not just rising—it's soaring to new heights that will shape the global game for decades to come.</p>`,
    category: 'sports',
    authorId: '2',
    authorName: 'Jane Doe',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=600&fit=crop',
    publishedAt: '2026-02-10T14:30:00Z',
    views: 12453,
    readTime: 5,
    tags: ['Football', 'Africa', 'Sports'],
    featured: true,
  },
  {
    id: '2',
    title: 'Traditional Art Forms: Preserving Cultural Heritage in Modern Times',
    slug: 'traditional-art-forms',
    excerpt: 'How communities across Nigeria are keeping ancient artistic traditions alive while embracing contemporary influences.',
    content: `<p>In an era of rapid globalization, the preservation of traditional art forms has become both a challenge and a celebration of cultural identity.</p>
    
    <h2>The Living Traditions</h2>
    <p>From intricate beadwork to powerful bronze sculptures, Nigerian traditional arts represent centuries of knowledge, skill, and cultural wisdom passed down through generations.</p>
    
    <h2>Modern Renaissance</h2>
    <p>Young artists are now finding innovative ways to blend traditional techniques with contemporary themes, creating works that speak to both heritage and modern experience.</p>
    
    <p>Museums and cultural centers are playing a vital role in documenting and showcasing these art forms, ensuring they remain accessible to future generations.</p>`,
    category: 'cultures',
    authorId: '2',
    authorName: 'Jane Doe',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    coverImage: 'https://images.unsplash.com/photo-1578926078326-ee6c29a1d51b?w=1200&h=600&fit=crop',
    publishedAt: '2026-02-09T10:15:00Z',
    views: 8765,
    readTime: 6,
    tags: ['Culture', 'Art', 'Heritage'],
    featured: true,
  },
  {
    id: '3',
    title: 'David Ombugadu: A Vision for 2027',
    slug: 'david-ombugadu-vision-2027',
    excerpt: 'An in-depth look at the political aspirations and proposed policies that could shape the future of Nasarawa State.',
    content: `<p>As political discourse intensifies ahead of the 2027 elections, David Ombugadu has emerged as a prominent voice advocating for transformative change and inclusive governance.</p>
    
    <h2>Key Policy Proposals</h2>
    <p>Ombugadu's platform centers on education reform, agricultural development, and healthcare accessibility—areas he identifies as critical to the state's progress.</p>
    
    <h2>Community Engagement</h2>
    <p>Through extensive grassroots engagement, his campaign has prioritized listening to constituents and incorporating their concerns into policy frameworks.</p>
    
    <p>The coming months will reveal how these proposals resonate with voters and whether they translate into electoral support.</p>`,
    category: 'politics',
    authorId: '5',
    authorName: 'Michael Adebayo',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    coverImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=600&fit=crop',
    publishedAt: '2026-02-08T16:45:00Z',
    views: 15234,
    readTime: 7,
    tags: ['Politics', 'Elections', 'Nasarawa'],
    featured: false,
  },
  {
    id: '4',
    title: 'Climate Patterns Shift: What to Expect This Rainy Season',
    slug: 'climate-patterns-rainy-season',
    excerpt: 'Meteorologists predict unusual weather patterns that could impact agriculture and daily life across the region.',
    content: `<p>Recent climate data suggests the upcoming rainy season may deviate from traditional patterns, with implications for farming communities and urban areas alike.</p>
    
    <h2>Forecast Analysis</h2>
    <p>Advanced meteorological models indicate delayed onset of rains in some regions while predicting heavier than usual precipitation in others.</p>
    
    <h2>Preparation Recommendations</h2>
    <p>Agricultural experts advise farmers to adjust planting schedules and consider drought-resistant crop varieties in areas expecting reduced rainfall.</p>
    
    <p>Urban planners are also taking note, with enhanced drainage systems being prioritized in flood-prone areas.</p>`,
    category: 'weather',
    authorId: '6',
    authorName: 'Sarah Ibrahim',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    coverImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&h=600&fit=crop',
    publishedAt: '2026-02-07T08:20:00Z',
    views: 6543,
    readTime: 4,
    tags: ['Weather', 'Climate', 'Agriculture'],
    featured: false,
  },
  {
    id: '5',
    title: 'Nollywood Stars Shine at International Film Festival',
    slug: 'nollywood-international-film-festival',
    excerpt: 'Nigerian cinema gains global recognition as multiple films receive prestigious awards and nominations.',
    content: `<p>The international film community continues to embrace Nollywood's unique storytelling and production excellence, with recent festivals highlighting the industry's global impact.</p>
    
    <h2>Award-Winning Performances</h2>
    <p>Several Nigerian actors received standing ovations and critical acclaim for performances that showcased the depth and range of African cinema.</p>
    
    <h2>Industry Growth</h2>
    <p>With increased investment in production quality and distribution channels, Nollywood is positioning itself as a major player in global entertainment.</p>
    
    <p>These achievements represent not just individual success, but a collective triumph for African storytelling on the world stage.</p>`,
    category: 'celebrity-gist',
    authorId: '7',
    authorName: 'Chioma Okonkwo',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma',
    coverImage: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1200&h=600&fit=crop',
    publishedAt: '2026-02-06T12:00:00Z',
    views: 19876,
    readTime: 5,
    tags: ['Entertainment', 'Nollywood', 'Film'],
    featured: true,
  },
  {
    id: '6',
    title: 'Breaking Records: Nigerian Athletes Dominate Track Events',
    slug: 'nigerian-athletes-track-records',
    excerpt: 'A new generation of sprinters and distance runners are setting national and international records.',
    content: `<p>The athletics world is taking notice as Nigerian runners consistently deliver outstanding performances across various distances.</p>
    
    <h2>Record-Breaking Achievements</h2>
    <p>From 100-meter sprints to marathon distances, Nigerian athletes are pushing the boundaries of what's possible in track and field.</p>
    
    <h2>Training Programs</h2>
    <p>State-of-the-art facilities and world-class coaching have created an environment where excellence thrives and records fall.</p>
    
    <p>With the Olympics approaching, expectations are high for medal-winning performances that will inspire the next generation.</p>`,
    category: 'sports',
    authorId: '2',
    authorName: 'Jane Doe',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop',
    publishedAt: '2026-02-05T15:30:00Z',
    views: 10234,
    readTime: 4,
    tags: ['Athletics', 'Sports', 'Records'],
    featured: false,
  },
  {
    id: '7',
    title: 'Official Declaration of Resolve: David Ombugadu\'s Gubernatorial Ambition',
    slug: 'david-ombugadu-official-declaration-resolve',
    excerpt: 'David Emmanuel Ombugadu clarifies his gubernatorial ambition for Nasarawa State, emphasizing his unwavering commitment to lead and his strategic approach to securing the mandate of the people.',
    content: `<div class="prose prose-lg max-w-none">
      <h2>Subject: Clarification of Gubernatorial Ambition and Strategic Direction</h2>
      
      <p>It has become necessary to address the various narratives and speculations being circulated regarding my political trajectory in Nasarawa State. While I have maintained an open-door policy for dialogue across the board, let me make it abundantly clear that certain misconceptions require immediate and final correction.</p>
      
      <h3>The Goal is Non-Negotiable</h3>
      
      <p>My focus is singular as well as my resolve is absolute: <strong>I am running for the Office of the Executive Governor of Nasarawa State.</strong> I wish to state for the record that I have not, at any point, consented to serve as a Deputy Governor to any individual.</p>
      
      <p>This mission is about the fundamental liberation of our people and the realization of a greater Nasarawa; it is not a quest for a "spare tire" role or a position of mere convenience, but a strategy.</p>
      
      <h3>Strategic Approach to Victory</h3>
      
      <p>For victory in achieving this goal, I am prepared to deploy every necessary resource. I will engage every necessary contact, apply every necessary principle, and implement every necessary idea, strategy and morally driven plan required to secure this mandate. We are building a structure that is both intellectually grounded and politically formidable.</p>
      
      <h3>Our Track Record and the Promise of 2027</h3>
      
      <p>Our track records and the promise of 2027 is consistent. We are not strangers to success. We have a proven track record of victory:</p>
      
      <ul>
        <li>We won in 2019</li>
        <li>We won in 2023</li>
        <li>By the grace of God and the unwavering support of the people, we will win together again</li>
      </ul>
      
      <p>However, let this serve as a firm notice: <strong>this time, the process will be different.</strong> We are putting every mechanism in place to ensure that our vote will not only count, but it will be fiercely protected. We will ensure the sanctity of the ballot box from the polling units to the final collation center.</p>
      
      <h3>A Call to Action</h3>
      
      <p>In conclusion, I am focused, I am resolute, and I am ready to lead. The path to our conviction requires us to stand firm against distractions and manipulative tendencies.</p>
      
      <p><strong>Nasarawa deserves a leader who emerges from the collective will of the people, persuaded by a shared vision for all.</strong></p>
      
      <p class="text-xl font-bold mt-6">It is still possible to win together.</p>
      
      <p class="text-right mt-8 font-semibold">—David Emmanuel Ombugadu</p>
    </div>`,
    category: 'politics',
    authorId: '5',
    authorName: 'David Emmanuel Ombugadu',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidOmbugadu',
    coverImage: '/david_campaign_flag.jpg',
    publishedAt: '2026-02-15T00:00:00Z',
    views: 2547,
    readTime: 8,
    tags: ['Politics', 'Elections', 'Nasarawa', 'Gubernatorial', '2027'],
    featured: true,
  },
  {
    id: '8',
    title: 'Redefining Economic Paradigms: The Transformational Leadership of Dr. Zacch Adedeji and President Tinubu in Nigeria\'s Tax Reformation',
    slug: 'dr-zacch-adedeji-tax-reformation-nigeria',
    excerpt: 'Dr. Zacch Adedeji, Executive Chairman of FIRS, emerges as the visionary architect of Nigeria\'s comprehensive tax system overhaul under President Tinubu\'s Renewed Hope Agenda.',
    content: `<div class="prose prose-lg max-w-none">
      <p>Progress, though often arduous, is indispensable for substantial transformation, and in 2024, Nigeria embarked on a monumental journey of reform catalyzed by astute leadership. Dr. Zacch Adedeji, the Executive Chairman of the Federal Inland Revenue Service (FIRS) and a distinguished alumnus of Obafemi Awolowo University, has emerged as the visionary architect of a comprehensive overhaul of the nation's tax system.</p>
      
      <h2>Presidential Vision and Leadership</h2>
      <p>These transformative reforms unfolded under the dynamic leadership of President Bola Ahmed Tinubu, whose Renewed Hope Agenda was predicated upon the selection of visionary leaders—individuals not only capable but fervently dedicated to Nigeria's socio-economic advancement.</p>
      
      <h2>Technological Innovation</h2>
      <p>Dr. Zacch's approach was grounded in the innovative integration of cutting-edge technology and data-driven methodologies. A cardinal achievement was the radical modernization of the TaxProMax system, which automated over 80% of the previously manual tax processes.</p>
      
      <h2>Revenue Achievement</h2>
      <p>The efficacy of these reforms was underscored in 2024 when FIRS surpassed its ambitious N19.4 trillion revenue target, eclipsing the N12.3 trillion collected in 2023. This extraordinary achievement stands as a testament to the transformative leadership of Dr. Zacch.</p>
      
      <h2>The 2024 Tax Reform Bill</h2>
      <p>The 2024 Tax Reform Bill has successfully passed its second reading in the Senate. This bill seeks to unify Nigeria's fragmented and often opaque tax laws into a transparent, efficient framework.</p>
      
      <p class="text-xl font-bold mt-6">Key provisions include:</p>
      <ul>
        <li>Exemption of individuals earning minimum wage from income tax</li>
        <li>Tax-exempt status for small businesses with annual revenues below ₦50 million</li>
        <li>Gradual reduction of corporate tax rates</li>
        <li>Elimination of double taxation</li>
        <li>VAT exemptions on essential goods and services</li>
      </ul>
      
      <p>The 2024 reforms signify far more than a mere increase in revenue; they represent a bold step toward achieving fiscal autonomy and resilience for Nigeria.</p>
    </div>`,
    category: 'politics',
    authorId: '8',
    authorName: 'Goldsweath Babie',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Goldsweath',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop',
    publishedAt: '2025-02-13T11:11:00Z',
    views: 8934,
    readTime: 12,
    tags: ['Politics', 'Economy', 'Tax Reform', 'Nigeria', 'FIRS'],
    featured: true,
  },
  {
    id: '9',
    title: '2Baba\'s Brother Charles Speaks His Truth About Annie, His Brother\'s Wife',
    slug: '2baba-brother-charles-speaks-truth-annie',
    excerpt: 'Tuface Idibia\'s younger brother, Charlybrave, pours his heart out in an emotional Instagram post addressing family tensions and respect.',
    content: `<div class="prose prose-lg max-w-none">
      <p class="text-lg italic">"I pray for composure as I write these and I pray for clarity because there is so much to say. This is in no shape or form an attack on anybody, I just want to create a peaceful space in my heart and move forward."</p>
      
      <h2>A Brother's Perspective</h2>
      <p>Annie, I am sure you are shocked that all these are coming from me, because in your heart of hearts you know I have always loved you and treated you the best way a brother in-law should... not because you gave me reasons to, but because I tried to see you through Inno's eyes, and what he loved I cherished.</p>
      
      <h2>On Respect and Dignity</h2>
      <p>Respect is not a title, respect is a gesture... a feeling you give and you feel when you are given. Although I have nothing but respect for you...you can't actually be demanding respect from me anymore when you have none for your husband or any member of his family, his friends or his staffs.</p>
      
      <h2>Public Humiliation</h2>
      <p>You publicly humiliate him every chance you get. From pouring him food at my wedding to throwing a bottle of hennessy at him at my workplace, or shouting at him at the top of your lungs in front of his celebrity friends or acquaintances...fights at the airport...just to mention a few.</p>
      
      <h2>The In-Laws Question</h2>
      <p>You are quick to shout and mention 7 kids and your husband being sucked dry, but you filled your household up with 4 maids, 2 P.A's, a live-in mum, a live-in cousin, and a brother at the annex...all to take care of your 2 daughters.</p>
      
      <p class="text-lg font-semibold mt-6">Please... Where are the in-laws who are trying to destroy your marriage?</p>
      
      <h2>A Call for Peace</h2>
      <p>Finally, what scares me most these days is the violence, where does it end? Have a re-think Annie, you made us victims of your rage and the war you have chosen never to let go.</p>
      
      <p class="text-right mt-8 font-semibold">©Charles, 2021</p>
    </div>`,
    category: 'celebrity-gist',
    authorId: '8',
    authorName: 'Goldsweath Babie',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Goldsweath',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop',
    publishedAt: '2025-01-29T12:44:00Z',
    views: 25678,
    readTime: 10,
    tags: ['Celebrity', 'Entertainment', '2Baba', 'Nollywood', 'Family'],
    featured: false,
  },
  {
    id: '10',
    title: 'The Making of Model and Aspiring Actor Justise Chukwuka',
    slug: 'justise-chukwuka-model-aspiring-actor',
    excerpt: 'Born to a Nigerian father and African American mother, Justise Chukwuka is a hardworking young woman with big aspirations in Hollywood modeling.',
    content: `<div class="prose prose-lg max-w-none">
      <p>She was born on July 17th, 1997 to a Nigerian Father and African American Mother. Attended Taylor High School and graduated in 2014.</p>
      
      <h2>A Journey of Determination</h2>
      <p>She has been hardworking with a positive attitude towards progress and personal growth and development. Justise Chukwuka, such a pretty and hardworking girl, has a lot of aspirations.</p>
      
      <h2>Hollywood Dreams</h2>
      <p>She is planning to make it really big as she aspires to be a Model and intends to be one of the big and top Hollywood Models. Growing up, life was not easy, but her determination and resilience have shaped her into the ambitious young woman she is today.</p>
      
      <h2>The Path Forward</h2>
      <p>With her unique heritage, natural beauty, and unwavering dedication, Justise represents the new generation of models breaking barriers and redefining beauty standards in the entertainment industry.</p>
    </div>`,
    category: 'celebrity-gist',
    authorId: '8',
    authorName: 'Goldsweath Babie',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Goldsweath',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop',
    publishedAt: '2024-03-19T20:16:00Z',
    views: 4521,
    readTime: 4,
    tags: ['Celebrity', 'Model', 'Hollywood', 'Entertainment', 'Rising Star'],
    featured: false,
  },
  {
    id: '11',
    title: 'Mrs. Miranda Ombugadu\'s Valentine Mission: Spreading Love and Relief Across Nasarawa State',
    slug: 'miranda-ombugadu-valentine-mission-nasarawa',
    excerpt: 'Despite electoral injustice, Mrs. Miranda Ombugadu exemplifies compassion by bringing joy and relief to mother homes across Nasarawa State.',
    content: `<div class="prose prose-lg max-w-none">
      <p>Mrs. Miranda, the wife of the esteemed PDP gubernatorial candidate, Rt. Hon. David Ombugadu, exemplifies compassion and resilience in the face of adversity. Despite the unjust outcome of the election, her spirit of love and generosity shone brightly during the recent Valentine period.</p>
      
      <h2>A Mission of Love</h2>
      <p>With unwavering determination and boundless empathy, Mrs. Miranda embarked on a journey of compassion, spreading love and kindness to those in need. Recognizing the importance of nurturing and supporting vulnerable members of society, she dedicated herself to bringing smiles to the faces of mothers and children in mother homes throughout the state.</p>
      
      <h2>Touching Hearts</h2>
      <p>Through her thoughtful gestures and generous donations of gifts and relief materials, Mrs. Miranda touched the hearts of countless individuals, offering comfort, solace, and hope in challenging times.</p>
      
      <h2>The Power of Compassion</h2>
      <p>In her selfless acts of kindness, Mrs. Miranda embodied the true essence of love and humanity, demonstrating the power of compassion to transcend barriers and unite communities.</p>
      
      <p class="text-xl font-bold mt-6">As we reflect on Mrs. Miranda's inspiring example, let us be reminded of the profound impact that one individual's compassion and generosity can have on the world around them.</p>
    </div>`,
    category: 'politics',
    authorId: '8',
    authorName: 'Goldsweath Babie',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Goldsweath',
    coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&h=600&fit=crop',
    publishedAt: '2024-02-26T17:42:00Z',
    views: 6234,
    readTime: 6,
    tags: ['Politics', 'Charity', 'Nasarawa', 'Community Service', 'Valentine'],
    featured: false,
  },
  {
    id: '12',
    title: 'Dr. David Ombugadu\'s Triumphant Return: A Hero\'s Welcome Amidst a Sea of Supporters',
    slug: 'david-ombugadu-triumphant-return-hero-welcome',
    excerpt: 'Dr. David Ombugadu\'s return to Nasarawa State was met with a mammoth crowd, symbolizing the unbreakable spirit of resilience and the people\'s unwavering support.',
    content: `<div class="prose prose-lg max-w-none">
      <p>In the rich tapestry of Nigerian politics, the saga of Dr. David Ombugadu emerges as a stirring testament to resilience, integrity, and the unyielding spirit of democracy.</p>
      
      <h2>A Popular Mandate</h2>
      <p>Dr. Ombugadu's candidacy struck a profound chord with the populace, fueled by his steadfast dedication to public service, impeccable track record, and authentic rapport with grassroots communities.</p>
      
      <h2>Electoral Injustice</h2>
      <p>However, the elation of victory was marred by the ominous specter of electoral malfeasance orchestrated by the incumbent Governor Sule-led APC administration. Despite concerted efforts to subvert the popular will, Dr. Ombugadu and his loyal supporters stood resolute.</p>
      
      <h2>The Tribunal Victory</h2>
      <p>The unequivocal verdict of the Justice Ezekiel-led election tribunal, affirming Dr. Ombugadu as the rightful victor, served as a beacon of hope, reaffirming faith in the judiciary as the ultimate arbiter of justice.</p>
      
      <h2>A Mammoth Welcome</h2>
      <p>As Dr. David Ombugadu made his triumphant return amidst a mammoth crowd of supporters, Nasarawa State was ablaze with the fervor of unwavering loyalty and undying hope. The sheer magnitude of the crowd spoke volumes about the unwavering faith the people have in their beloved leader.</p>
      
      <h2>Free NHIS Enrollment</h2>
      <p>Accompanied by esteemed dignitaries including Prof. Labaran Maku, Dr. Ombugadu happily announced free NHIS enrollment for 13,000 residents of the state devoid of religion, political or ethnic sentiments.</p>
      
      <p class="text-xl font-bold mt-6">#ombugaduiscoming</p>
    </div>`,
    category: 'politics',
    authorId: '8',
    authorName: 'Goldsweath Babie',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Goldsweath',
    coverImage: '/david_campaign_flag.jpg',
    publishedAt: '2024-02-26T17:15:00Z',
    views: 18456,
    readTime: 9,
    tags: ['Politics', 'Nasarawa', 'Elections', 'Democracy', 'Justice'],
    featured: true,
  },
  {
    id: '13',
    title: 'A Kaleidoscope of Joy: Mrs. Olajumoke Ganiyat Abebi\'s 50th Birthday Extravaganza in Houston',
    slug: 'olajumoke-abebi-50th-birthday-houston',
    excerpt: '50 and fabulous: A half-century of grace, strength, and timeless beauty celebrated in a colorful cultural fiesta at Houston\'s Expo Events Center.',
    content: `<div class="prose prose-lg max-w-none">
      <p class="text-xl italic">"50 and fabulous: A half-century of grace, strength, and timeless beauty. Cheers to the next chapter of my incredible journey."</p>
      
      <h2>A Golden Jubilee Celebration</h2>
      <p>In the vibrant city of Houston, Texas, the Expo Events Center bore witness to an extraordinary celebration on January 20, 2024. This marked the golden jubilee of Mrs. Olajumoke Ganiyat Abebi, a woman whose influence and affluence were celebrated in a colorful cultural fiesta that transcended borders.</p>
      
      <h2>Visual Feast</h2>
      <p>The event was a visual feast, with guests adorned in the best and most vibrant African attires and styles. Each outfit served as a canvas of tradition and modernity, reflecting the celebrant's journey that seamlessly blends cultural richness and contemporary elegance.</p>
      
      <h2>Culinary Journey</h2>
      <p>The dazzling celebration was not just a spectacle for the eyes; it was a culinary journey spanning continents. Lavish delicacies, ranging from rich African dishes to exquisite intercontinental cuisines, adorned the tables.</p>
      
      <h2>Distinguished Guests</h2>
      <p>Among the countless esteemed guests was the Mother of the day, Mrs. Omotayo Kayode, the Celebrant's father, Mr. Babatunde Baruwa, and his wife, Mrs. Yetunde Jawando, along with Tobi and Grace, all from New York City.</p>
      
      <h2>Entertainment</h2>
      <p>The glamorous affair was expertly hosted by the stylish master of ceremonies, Erelu Olubukanla Fagbola-Badipe, with rhythmic beats provided by the talented Adewale Akanji Barryshowkey.</p>
    </div>`,
    category: 'celebrity-gist',
    authorId: '8',
    authorName: 'Goldsweath Babie',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Goldsweath',
    coverImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=600&fit=crop',
    publishedAt: '2024-01-23T23:13:00Z',
    views: 5678,
    readTime: 7,
    tags: ['Celebrity', 'Birthday', 'Houston', 'Culture', 'Celebration'],
    featured: false,
  },
  {
    id: '14',
    title: 'Dr. David Ombugadu: A Beacon of Resilience and Unity in the Aftermath of the 2023 Nasarawa Gubernatorial Election',
    slug: 'david-ombugadu-beacon-resilience-unity-2023',
    excerpt: 'Despite electoral tribulations and controversial court decisions, Dr. Ombugadu showcases remarkable commitment to unity and democratic principles.',
    content: `<div class="prose prose-lg max-w-none">
      <p>In the aftermath of the 2023 gubernatorial election in Nasarawa State, Dr. David Ombugadu emerged as an embodiment of unwavering dedication to democratic principles.</p>
      
      <h2>Electoral Controversy</h2>
      <p>Despite the electoral tribulations and the subsequent contentious proclamation of the incumbent Governor Sule of the APC by the Nigeria Electoral Commission, conducted in a bellicose manner wherein all agents of the PDP and other parties were forcibly evacuated from the collation center at gunpoint, Dr. Ombugadu remained steadfast.</p>
      
      <h2>Tribunal Victory</h2>
      <p>The electoral tribunal, presided over by Justice Ezekiel, subsequently declared him the rightful victor, overturning the initial dubious and fraudulent declaration by INEC.</p>
      
      <h2>Appeal and Supreme Court</h2>
      <p>However, the pursuit of justice encountered further impediments as both the Appeal and the Supreme Court, in an unexpected turn, upheld the evidently manipulated declaration by INEC.</p>
      
      <h2>Commitment to Peace</h2>
      <p>Unyielding in the face of unjust adjudication, Dr. Ombugadu showcased a remarkable commitment to the unity of Nasarawa State and Nigeria as a whole, transcending ethnic and religious sentiments. Confronted with widespread protests sparked by the Supreme Court's decision, he assumed a position advocating for peace and tranquility.</p>
      
      <h2>Message to Supporters</h2>
      <p>In a poignant missive directed to his supporters and the populace of Nasarawa State, Dr. Ombugadu conveyed heartfelt appreciation for their steadfast support during the electoral process and ensuing legal battles.</p>
      
      <p class="text-xl font-bold mt-6">Dr. Ombugadu underscored shared values and a collective commitment to the advancement of Nasarawa State, urging for unity and resilience in the face of formidable challenges.</p>
    </div>`,
    category: 'politics',
    authorId: '8',
    authorName: 'Goldsweath Babie',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Goldsweath',
    coverImage: '/david_campaign_flag.jpg',
    publishedAt: '2024-01-23T15:09:00Z',
    views: 12345,
    readTime: 8,
    tags: ['Politics', 'Nasarawa', 'Elections', 'Democracy', 'Unity'],
    featured: false,
  },
  {
    id: '15',
    title: 'Nasarawa State\'s Battle for Justice: Rigged Elections, Unrest, and the People\'s Struggle',
    slug: 'nasarawa-battle-justice-rigged-elections',
    excerpt: 'Nasarawa State becomes the epicenter of political storm following allegations of rigged gubernatorial election and the people\'s fight for genuine democracy.',
    content: `<div class="prose prose-lg max-w-none">
      <p>Nasarawa State, Nigeria, has become the epicenter of a political storm following allegations of a rigged gubernatorial election that favored the incumbent Governor, Abdullahi Sule of the APC.</p>
      
      <h2>Electoral Irregularities</h2>
      <p>The controversy, characterized by result fabrication, electoral suppression, and falsification of results, ignited widespread protests as the people vehemently contested what they believed was a subversion of their democratic rights.</p>
      
      <h2>Religious Manipulation</h2>
      <p>Governor Sule and known feudal lords injected religious coloration into the protest, engaging in derogatory name-calling against peaceful demonstrators and exploiting divisive narratives, claiming that allowing a Christian to govern Nasarawa State would endanger Islam.</p>
      
      <h2>Tribunal and Appeal</h2>
      <p>The peaceful protests persisted, demanding justice and the recognition of the true winner, Dr. David Ombugadu of the PDP. The Election Tribunal ruled in favor of Dr. Ombugadu. However, this initial victory was short-lived as the Appeal Court controversially overturned the tribunal's decision.</p>
      
      <h2>Military Intervention</h2>
      <p>The situation took a tragic turn when a peaceful protest was met with excessive force as a military vehicle was deployed to suppress the demonstrators, running over and injuring several protesters.</p>
      
      <h2>The People's Resolve</h2>
      <p>Nasarawa State is currently in the grip of what many describe as an absolute perversion of justice. The citizens remain undaunted, standing firm in their commitment to paying any price to restore justice and bring back Dr. David Ombugadu.</p>
      
      <p class="text-xl font-bold mt-6">The hope lies in the Supreme Court's intervention to rectify the perceived injustices and affirm Dr. David Ombugadu as the duly elected governor.</p>
    </div>`,
    category: 'politics',
    authorId: '8',
    authorName: 'Goldsweath Babie',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Goldsweath',
    coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=600&fit=crop',
    publishedAt: '2023-11-27T13:09:00Z',
    views: 15678,
    readTime: 11,
    tags: ['Politics', 'Nasarawa', 'Elections', 'Justice', 'Democracy'],
    featured: false,
  },
  {
    id: '16',
    title: 'Dangers of Blaming Religion for Political Failures in a Democratic Society',
    slug: 'dangers-blaming-religion-political-failures',
    excerpt: 'When political leaders blame religion for their inadequacies, they undermine democratic principles and pose formidable threats to societal unity.',
    content: `<div class="prose prose-lg max-w-none">
      <p>Within the intricate tapestry of democratic societies, pivotal values, including accountability, responsibility, and unity, serve as linchpins upholding the societal order.</p>
      
      <h2>Deflecting Responsibility</h2>
      <p>The act of attributing political setbacks to religious elements masterfully diverts attention from the substantive issues at hand. Rather than addressing their inherent limitations, these leaders engage in a subterfuge that flagrantly contradicts the very tenets of responsible leadership.</p>
      
      <h2>Sowing Division</h2>
      <p>The introduction of religious narratives into the political arena harbors the insidious potential to sow schisms within society, thereby fostering pernicious polarization and animosity among diverse religious communities.</p>
      
      <h2>Crisis of Confidence</h2>
      <p>Blaming religion precipitates a crisis of confidence among citizens, who begin to question the impartiality of elections, ultimately discerning them as biased by religious considerations rather than objective evaluations of competence.</p>
      
      <h2>The Nasarawa Example</h2>
      <p>These deleterious narratives manifest among certain governors who, having lost their re-election bids due to ineptitude, were collectively shunned by constituents, both Christian and Muslim. The collective rejection of Governor Sule Abdulahi of the APC in Nasarawa State, in favor of Dr. David Ombugadu of the PDP, is a clear indictment of incompetence.</p>
      
      <h2>The Path Forward</h2>
      <p>True leaders, emulating examples like Goodluck Jonathan, place the sanctity of human life above transient political victories. In the democratic landscape, leaders must be held unswervingly accountable for their actions and decisions.</p>
      
      <p class="text-xl font-bold mt-6">Hunger, poverty, and neglect on the streets recognize no religious distinctions, and an enlightened populace is no longer susceptible to divisive machinations.</p>
      
      <p class="text-right mt-8 font-semibold">—Goldswealth Observation</p>
    </div>`,
    category: 'politics',
    authorId: '8',
    authorName: 'Goldsweath Babie',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Goldsweath',
    coverImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=600&fit=crop',
    publishedAt: '2023-10-16T18:02:00Z',
    views: 9876,
    readTime: 10,
    tags: ['Politics', 'Religion', 'Democracy', 'Leadership', 'Nigeria'],
    featured: false,
  },
  {
    id: 'lookman-thrilled-goal-barcelona',
    title: 'Lookman thrilled with goal against Barcelona, gets rare praise from Simeoni',
    slug: 'lookman-thrilled-goal-barcelona',
    excerpt: 'Super Eagles and Atlético Madrid winger Ademola Lookman praises team\'s collective display after emphatic 4–0 win over Barcelona in Copa del Rey.',
    content: `<div class="prose prose-lg max-w-none">
      <p>Super Eagles and Atlético Madrid winger Ademola Lookman has praised his side’s collective display after their emphatic 4–0 win over Barcelona in the Copa del Rey semi-final first leg.</p>
      
      <p>Lookman was on the scoresheet as Diego Simeone’s men stormed into a commanding position in the tie, putting one foot in the final with a ruthless first-half performance at the Metropolitano.</p>
      
      <p>The Nigerian international, who has now scored twice in this season’s Copa del Rey, insisted the victory was built on teamwork rather than individual brilliance.</p>
      
      <p class="italic">"I’m very, very happy. Of course, scoring is good, but I think the team played really well tonight. In the box, we were very professional, and today we showed a great level of teamwork," Lookman told Sporty TV.</p>
      
      <p>"You always want to score as an attacker, always looking to get into dangerous positions, so I just try to be in the right place at the right time."</p>
      
      <p>"Of course, it’s a big victory. But we have a few more games coming up before we play away, so we need to stay with the same mindset and focus on those matches, which will take us to the other semi-final. We are excited about the days to come," he added.</p>
      
      <h2>Match Highlights</h2>
      <p>Atlético Madrid took control of the tie inside the opening minutes, going ahead in the sixth minute when Eric García misjudged a back pass, with the ball rolling past his goalkeeper into the net for an own goal.</p>
      
      <p>Antoine Griezmann made it 2-0 just 14 minutes into the game, and then Lookman scored the third goal at the 33-minute mark.</p>
      
      <p>Julián Álvarez, assisted by Lookman, ended a strong first half with a goal just before halftime.</p>
      
      <h2>Simeone's Praise</h2>
      <p>Meanwhile, Simeone has praised Lookman and Alvarez after the 4-0 demolition of Barcelona.</p>
      
      <p>In his post-match press conference, Simeone highlighted Lookman’s assist as “fantastic” and lauded Alvarez’s exceptional work rate, particularly in the first half.</p>
      
      <p>He said, "The assist for Lookman was fantastic. [Alvarez’s] work rate in the first half was incredible.</p>
      
      <p>"Scoring goals is something he has, and thank God he is back. He needed that goal so much, and for sure it will help clear him up for what is next."</p>
      
      <p>Atletico Madrid’s next challenge will be against Rayo Vallecano on Sunday, February 15.</p>
    </div>`,
    category: 'sports',
    authorId: '9',
    authorName: 'Taiwo Alimi',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taiwo',
    coverImage: '/ademola.jpg',
    publishedAt: '2026-02-14T10:00:00Z',
    views: 3420,
    readTime: 5,
    tags: ['Sports', 'Football', 'Ademola Lookman', 'Atletico Madrid', 'Copa del Rey'],
    featured: true,
  },
  {
    id: 'cubana-chief-priest-obi-2027',
    title: 'I’ll work against Obi in 2027 – Cubana Chief Priest',
    slug: 'cubana-chief-priest-work-against-obi-2027',
    excerpt: 'Socialite Cubana Chief Priest has declared his intention to work against Peter Obi in the 2027 presidential election, citing his past involvement and current stance.',
    content: `<div class="prose prose-lg max-w-none">
      <p>Socialite Cubana Chief Priest has declared his intention to work against Peter Obi in the 2027 presidential election.</p>
      
      <p>He made this known during an Instagram exchange with followers, confirming his stance after being asked directly.</p>
      
      <p>A user asked him directly, “So in simple terms, You are working against Obi in the upcoming presidential election. lol.”</p>
      
      <p>Chief Priest, who served as a special adviser to an APC governor, cited his past involvement with Obi’s campaign as a reason for his current opposition.</p>
      
      <p>Responding, Cubana Chief Priest confirmed his stance, writing, <strong>“yes oh hope say no be crime cuz I worked for Obi last election even as special adviser to an APC governor.”</strong></p>
      
      <h2>Reactions and Backlash</h2>
      <p>His comment sparked reactions from users, including one who referenced his past encounter with the Economic and Financial Crimes Commission (EFCC).</p>
      
      <p>In reply, Cubana Chief Priest downplayed the concern, stating, “if you never go EFCC for naija you never make am.”</p>
      
      <h2>Focus on South-East Development</h2>
      <p>The discussion also touched on Biafra and political support from the South-East, with Chief Priest telling a user to support their preferred candidate.</p>
      
      <p>He emphasised the need for development in the South-East, questioning the user’s contributions to the region.</p>
    </div>`,
    category: 'celebrity-gist',
    authorId: '8',
    authorName: 'Goldsweath Babie',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Goldsweath',
    coverImage: '/Cubana-Chief-Priest.jpg',
    publishedAt: '2026-02-15T12:00:00Z',
    views: 5120,
    readTime: 4,
    tags: ['Entertainment', 'Politics', 'Celebrity', 'Cubana Chief Priest', '2027 Election'],
    featured: true,
  },
  {
    id: 'ombugadu-phd-convocation-rsust',
    title: 'Dr. David Ombugadu Bags PhD in Development Economics from RSUST',
    slug: 'ombugadu-phd-convocation-rsust',
    excerpt: 'Eminent personalities converged at RSUST to witness the conferment of a PhD in Development Economics & Planning on Rt. Hon. Dr. David Emmanuel Ombugadu.',
    content: `<div class="prose prose-lg max-w-none">
      <p>Saturday 4th December 2021, The Rivers State University of Science & Technology (RSUST) Nkpolu-Oroworukwo, Port Harcourt went agog as saveral eminent personalities converged to witnessed the 33rd Convocation ceremony and the conferment of the award of PhD in Development Economics & Planning to a distinguished personality in person of Rt. Hon. Dr. Davematics David Emmanuel Ombugadu, the PDP Governorship candidate for Nasarawa State in the 2019 general elections.</p>
      
      <h2>A Gathering of Dignitaries</h2>
      <p>Notable personalities at the occasion include:</p>
      <ul>
        <li>The Rivers State Governor, Nyesom Wike</li>
        <li>Former Rivers State Governor, Sir Celestine Omehia</li>
        <li>The Emir of Lafia, HRH Sidi Bage (Chancellor of the University)</li>
        <li>OCJ Okocha SAN</li>
        <li>Former Deputy Speaker of the House of Reps, Rt Hon. Austin Okpara</li>
        <li>Senator Lee Maebe</li>
        <li>And many others.</li>
      </ul>
      
      <p>This is another giant feather on his cap! A hearty felicitations to you and more feats ahead, Your Excellency Sir!</p>
      
      <p>Ombugadu, going places, making impacts and touching lives!!</p>
    </div>`,
    category: 'politics',
    authorId: '5',
    authorName: 'Editorial Board',
    authorAvatar: '/david portrat.jpg',
    coverImage: '/david-wike.jpg',
    publishedAt: '2021-12-04T10:00:00Z',
    views: 4230,
    readTime: 3,
    tags: ['Politics', 'Education', 'Ombugadu', 'Nasarawa', 'PhD'],
    featured: true,
  },
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    articleId: '1',
    userId: '3',
    userName: 'John Smith',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    content: 'Excellent analysis! African football has indeed come a long way.',
    createdAt: '2026-02-11T10:30:00Z',
  },
  {
    id: 'c2',
    articleId: '1',
    userId: '4',
    userName: 'Emily Johnson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    content: 'The investment in youth development is really paying off. Exciting times ahead!',
    createdAt: '2026-02-11T14:15:00Z',
  },
  {
    id: 'c3',
    articleId: '2',
    userId: '3',
    userName: 'John Smith',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    content: 'We must continue to preserve our cultural heritage. Great article!',
    createdAt: '2026-02-10T09:45:00Z',
  },
];

export const getArticleById = (id: string): Article | undefined => {
  return mockArticles.find(article => article.id === id);
};

export const getArticlesByCategory = (category: Category): Article[] => {
  return mockArticles.filter(article => article.category === category);
};

export const getFeaturedArticles = (): Article[] => {
  return mockArticles.filter(article => article.featured);
};

export const getCommentsByArticleId = (articleId: string): Comment[] => {
  return mockComments.filter(comment => comment.articleId === articleId);
};

export const getArticlesByTag = (tag: string): Article[] => {
  return mockArticles.filter(article =>
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};
