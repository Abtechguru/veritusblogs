// Seed data for initial weekly topic
export const seedInitialWeeklyTopic = async () => {
  const SERVER_URL = 'http://localhost:54321/functions/v1/make-server-5bb3fa81';
  
  // This should be called by an admin user with proper auth token
  const sampleTopic = {
    title: "What Does True Leadership Mean in Africa Today?",
    description: "Share your thoughts on what makes a great leader in modern Africa. Consider qualities like integrity, vision, accountability, and service to the people. How can leaders better serve their communities?",
    category: "politics",
    duration: 7 // 7 days
  };

  try {
    const response = await fetch(`${SERVER_URL}/weekly-topic/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_ADMIN_TOKEN_HERE`,
      },
      body: JSON.stringify(sampleTopic),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Weekly topic created:', data);
      return data;
    } else {
      const error = await response.json();
      console.error('Failed to create topic:', error);
    }
  } catch (error) {
    console.error('Error creating topic:', error);
  }
};

// Sample topics for admins to create
export const sampleWeeklyTopics = [
  {
    title: "What Does True Leadership Mean in Africa Today?",
    description: "Share your thoughts on what makes a great leader in modern Africa. Consider qualities like integrity, vision, accountability, and service to the people.",
    category: "politics",
    duration: 7
  },
  {
    title: "The Role of Technology in African Development",
    description: "How can technology bridge the gap in education, healthcare, and economic opportunities across Africa? Share your insights and experiences.",
    category: "cultures",
    duration: 7
  },
  {
    title: "Preserving African Culture in a Globalized World",
    description: "As the world becomes more connected, how do we preserve our unique African traditions, languages, and values? What role do younger generations play?",
    category: "cultures",
    duration: 7
  },
  {
    title: "Youth Empowerment: Opportunities and Challenges",
    description: "What are the biggest challenges facing African youth today, and what opportunities exist for empowerment and growth? How can we create better pathways to success?",
    category: "general",
    duration: 7
  },
  {
    title: "Climate Change and Environmental Stewardship in Africa",
    description: "Africa is particularly vulnerable to climate change. What actions can individuals and communities take to protect our environment and build sustainable futures?",
    category: "weather",
    duration: 7
  },
  {
    title: "The Power of Pan-African Unity",
    description: "What does African unity mean to you? How can we strengthen collaboration and solidarity across African nations for collective progress?",
    category: "politics",
    duration: 7
  },
  {
    title: "Education Reform: Building the Africa We Want",
    description: "What changes would you make to education systems in Africa to better prepare students for the future? Share your ideas for innovation and improvement.",
    category: "cultures",
    duration: 7
  },
  {
    title: "Sports as a Unifying Force in Africa",
    description: "From football to athletics, sports have brought Africans together. Share your favorite sports moments and discuss how sports can continue to unite our continent.",
    category: "sports",
    duration: 7
  },
];
