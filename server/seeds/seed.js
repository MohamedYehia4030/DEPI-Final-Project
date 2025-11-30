import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { tours, services } from '../../src/features/packages/api/data.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

// Reviews seed data
const reviews = [
  { 
    name: "Ali", 
    comment: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure...",
    rating: 5,
    avatar: "/images/Person%204.avif"
  },
  { 
    name: "Sara", 
    comment: "I have to share how this amazing experience completely changed my perspective. From the very first moment, I realized the attention to detail and care that went into every aspect. It's rare to find something so thoughtfully designed, where every interaction feels meaningful. I've recommended it to everyone I know because it truly elevates the standard of excellence.",
    rating: 5,
    avatar: null
  },
  { 
    name: "Mona", 
    comment: "I never imagined that a service could feel so seamless and thoughtful. Every step of the process was carefully planned, making it easy and enjoyable from start to finish. What impressed me most was the genuine care shown by the team—they listened, adapted, and went above and beyond to ensure everything was perfect.",
    rating: 5,
    avatar: null
  },
  { 
    name: "Amr", 
    comment: "I need to share with you the story of how this misunderstanding about rejecting joy and valuing hardship first appeared. I will explain in detail the principles of the wise seeker of truth and the founder of happiness for humanity. Nobody refuses pleasure, dislikes it, or avoids it, because it is naturally fulfilling and brings contentment...",
    rating: 4,
    avatar: null
  },
  { 
    name: "Aya", 
    comment: "It is important to understand how this false notion of denying enjoyment and praising suffering came into existence. I will describe the true philosophy of the great seeker of knowledge, the architect of human delight. Pleasure itself is never rejected, avoided, or hated, because it naturally brings joy and satisfaction to everyone...",
    rating: 5,
    avatar: null
  },
];

// Stats seed data
const stats = [
  { key: "years", value: "20+", labelKey: "about:stats.years", order: 1 },
  { key: "customers", value: "100+", labelKey: "about:stats.customers", order: 2 },
  { key: "services", value: "15+", labelKey: "about:stats.services", order: 3 },
  { key: "guides", value: "10+", labelKey: "about:stats.guides", order: 4 },
];

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    const db = conn.connection.db;

    // Tour Packages
    const tourPackagesCollection = db.collection('tourPackages');
    await tourPackagesCollection.deleteMany({});
    await tourPackagesCollection.insertMany(tours);
    console.log('✅ Tour Packages seeded');

    // Services
    const servicesCollection = db.collection('services');
    await servicesCollection.deleteMany({});
    await servicesCollection.insertMany(services);
    console.log('✅ Services seeded');

    // Reviews
    const reviewsCollection = db.collection('reviews');
    await reviewsCollection.deleteMany({});
    await reviewsCollection.insertMany(reviews.map(r => ({ ...r, isApproved: true, createdAt: new Date(), updatedAt: new Date() })));
    console.log('✅ Reviews seeded');

    // Stats
    const statsCollection = db.collection('stats');
    await statsCollection.deleteMany({});
    await statsCollection.insertMany(stats.map(s => ({ ...s, createdAt: new Date(), updatedAt: new Date() })));
    console.log('✅ Stats seeded');

    console.log('\n🎉 All seed data inserted successfully!');
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
