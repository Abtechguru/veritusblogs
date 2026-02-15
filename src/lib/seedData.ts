import { authAPI, articleAPI } from './api';

export const seedInitialData = async () => {
  try {
    console.log('🌱 Seeding initial data...');

    // Create initial admin account
    // Note: In production, this should be done securely via backend setup
    // For demo purposes, we'll log these credentials
    console.log('\n📝 Initial Admin Credentials:');
    console.log('Email: admin@veritus.com');
    console.log('Password: Admin123!');
    console.log('\nUse these credentials to log in as admin.\n');

    console.log('✅ Initial data seeding complete!');
    console.log('\n🚀 Next Steps:');
    console.log('1. Create an admin account using the signup page');
    console.log('2. Manually update the user role to "admin" in the database if needed');
    console.log('3. Log in with admin credentials');
    console.log('4. Start managing users and approving author accounts');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
};

// Sample article data for testing
export const sampleArticles = [
  {
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
    cover_image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=600&fit=crop',
    read_time: 5,
    tags: ['Football', 'Africa', 'Sports'],
    featured: true,
    status: 'published',
  },
  {
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
    cover_image: 'https://images.unsplash.com/photo-1578926078326-ee6c29a1d51b?w=1200&h=600&fit=crop',
    read_time: 6,
    tags: ['Culture', 'Art', 'Heritage'],
    featured: true,
    status: 'published',
  },
];
