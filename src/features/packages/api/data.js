// This mock data will be replaced by your usePackages() hook later
// All image paths are imported from src/assets/images
// Package images
import package1 from '../../../assets/images/Packages/package1.png';
import package2 from '../../../assets/images/Packages/package2.png';
import package3 from '../../../assets/images/Packages/package3.png';
import package4 from '../../../assets/images/Packages/package4.png';
import package5 from '../../../assets/images/Packages/package5.png';
import package6 from '../../../assets/images/Packages/package6.png';
import package7 from '../../../assets/images/Packages/package7.jpg';
import package8 from '../../../assets/images/Packages/package8.png';

// Service images
import service1 from '../../../assets/images/Packages/service1.png';
import service2 from '../../../assets/images/Packages/service2.png';
import service3 from '../../../assets/images/Packages/service3.png';
import service4 from '../../../assets/images/Packages/service4.png';
import service5 from '../../../assets/images/Packages/service5.png';
import service6 from '../../../assets/images/Packages/service6.png';

// sub images
import sub1 from '../../../assets/images/Packages/sub1.png';
import sub2 from '../../../assets/images/Packages/sub2.png';
import sub3 from '../../../assets/images/Packages/sub3.png';
import sub4 from '../../../assets/images/Packages/sub4.png';
import sub5 from '../../../assets/images/Packages/sub5.png';
import sub6 from '../../../assets/images/Packages/sub6.png';
import sub7 from '../../../assets/images/Packages/sub7.png';
import sub8 from '../../../assets/images/Packages/sub8.png';
import sub9 from '../../../assets/images/Packages/sub9.png';
import sub11 from '../../../assets/images/Packages/sub11.png';
import sub12 from '../../../assets/images/Packages/sub12.png';
import sub13 from '../../../assets/images/Packages/sub13.png';
import sub14 from '../../../assets/images/Packages/sub14.png';
import sub15 from '../../../assets/images/Packages/sub15.png';
import sub16 from '../../../assets/images/Packages/sub16.png';
import sub17 from '../../../assets/images/Packages/sub17.png';
import sub18 from '../../../assets/images/Packages/sub18.png';

//Gallery images
import gallery1 from '../../../assets/images/Packages/gallery1.png';
import gallery2 from '../../../assets/images/Packages/gallery2.png';
import gallery3 from '../../../assets/images/Packages/gallery3.png';
import gallery4 from '../../../assets/images/Packages/gallery4.png';
import gallery5 from '../../../assets/images/Packages/gallery5.png';
import gallery6 from '../../../assets/images/Packages/gallery6.png';
import gallery7 from '../../../assets/images/Packages/gallery7.png';
import gallery8 from '../../../assets/images/Packages/gallery8.png';
import gallery9 from '../../../assets/images/Packages/gallery9.png';
import gallery10 from '../../../assets/images/Packages/gallery10.png';
import gallery11 from '../../../assets/images/Packages/gallery11.png';
import gallery12 from '../../../assets/images/Packages/gallery12.png';
import gallery13 from '../../../assets/images/Packages/gallery13.png';

import gallery14 from '../../../assets/images/Packages/gallery14.png';
import gallery15 from '../../../assets/images/Packages/gallery15.png';
import gallery16 from '../../../assets/images/Packages/gallery16.png';
import gallery17 from '../../../assets/images/Packages/gallery17.png';
import gallery18 from '../../../assets/images/Packages/gallery18.png';
import gallery19 from '../../../assets/images/Packages/gallery19.png';
import gallery20 from '../../../assets/images/Packages/gallery20.png';
import gallery21 from '../../../assets/images/Packages/gallery21.png';


export const tours = [
  {
    id: 1,
    titleKey: "packages:tours.luccaBike.title",
    price: "34 €",
    img: package1,
    duration: "2.5 hour",
    groupKey: "packages:tours.luccaBike.group",
    rating: "5.0",
    subimages:[sub1,sub2],
     desc: "Discover the historic city of Lucca on a scenic bike tour through its ancient walls and charming streets.",
    longDescKey:
      "Enjoy a relaxing bike ride through Lucca’s medieval streets and iconic city walls. This tour offers a perfect mix of history, culture, and nature as you explore hidden gems, picturesque alleys, and beautiful viewpoints. It’s a safe and enjoyable experience suitable for all ages.",
    gallery:[gallery3,gallery1,gallery2,gallery4],
    
  },
  {
    id: 2,
    titleKey: "packages:tours.wineTasting.title",
    price: "34 €",
    img: package2,
    duration: "3 hour",
    groupKey: "packages:tours.wineTasting.group",
    rating: "5.0",
    subimages:[sub3,sub4],
    desc: "Experience the taste of Tuscany with a guided tour through the region’s finest vineyards.",
    longDescKey:
      "Immerse yourself in the world of Tuscan wine as you explore lush vineyards and taste a selection of premium local wines. Learn about the winemaking process from grape to bottle and enjoy a peaceful atmosphere surrounded by stunning countryside landscapes.",
    gallery: [gallery3, gallery1, gallery2, gallery4],
    },
  {
    id: 3,
    titleKey: "packages:tours.cinqueTerre.title",
    price: "34 €",
    img: package3,
    duration: "5 hour",
    groupKey: "packages:tours.cinqueTerre.group",
    rating: "4.9",
    subimages:[sub5,sub6],
    gallery:[gallery1,gallery2,gallery3,gallery4],
    desc: "Explore the breathtaking seaside villages of Cinque Terre, famous for their colorful houses and dramatic cliffs.",
    longDescKey:
      "Embark on a memorable journey through the iconic Cinque Terre, where each village offers unique beauty, panoramic sea views, and charming coastal paths. This tour is perfect for nature lovers, photographers, and anyone seeking a truly unforgettable Italian experience.",
  },
  {
    id: 4,
    titleKey: "packages:tours.siena.title",
    price: "34 €",
    img: package4,
    duration: "3.5 hour",
    groupKey: "packages:tours.siena.group",
    rating: "5.0",
    subimages:[sub7,sub8],
    
    gallery:[gallery21,gallery1,gallery3,gallery4],
   desc: "A cultural journey through Siena, a medieval city rich in history, art, and architectural wonders.",
    longDescKey:
      "Discover the heart of Tuscany with a visit to Siena’s most remarkable landmarks, including Piazza del Campo and the magnificent cathedral. Walk through narrow medieval streets and learn the stories behind one of Italy’s most historically significant cities.",
  },
  {
    id: 5,
    titleKey: "packages:tours.luccaHills.title",
    price: "34 €",
    img: package5,
    duration: "3 hour",
    groupKey: "packages:tours.luccaHills.group",
    rating: "5.0",
    subimages:[sub9,sub11],
    gallery:[gallery3,gallery1,gallery2,gallery4],
    desc: "Enjoy a peaceful scenic tour through the rolling green hills surrounding Lucca.",
    longDescKey:
      "Escape the city and explore the beautiful countryside of Lucca. This tour takes you through quiet hilltop roads, charming rural landscapes, and breathtaking viewpoints. Perfect for nature enthusiasts and travelers looking for a relaxing outdoor experience.",
  },
  {
    id: 6,
    titleKey: "packages:tours.gardaland.title",
    price: "34 €",
    img: package6,
    duration: "6 hour",
    groupKey: "packages:tours.gardaland.group",
    rating: "4.8",
    subimages:[sub11,sub12],
    gallery:[gallery21,gallery1,gallery3,gallery4],
     desc: "Spend a thrilling day at Gardaland, Italy’s most famous amusement park.",
    longDescKey:
      "Get ready for a full day of excitement at one of Europe’s top theme parks. From high-speed roller coasters to family-friendly attractions and spectacular shows, Gardaland offers unforgettable fun for visitors of all ages.",
  },
  {
    id: 7,
    titleKey: "packages:tours.pisaLucca.title",
    price: "34 €",
    img: package7,
    duration: "4 hour",
    groupKey: "packages:tours.pisaLucca.group",
    rating: "4.9",
    subimages:[sub13,sub14],
    gallery:[gallery1,gallery2,gallery3,gallery4],
     desc: "Visit two iconic Tuscan destinations in one day: the Leaning Tower of Pisa and the city of Lucca.",
    longDescKey:
      "Start your journey by admiring the world-famous Leaning Tower of Pisa, then continue to the charming walled city of Lucca. This combined tour is perfect for those who want to experience Tuscany’s most iconic landmarks in a single unforgettable trip.",
    },
  {
    id: 8,
    titleKey: "packages:tours.florence.title",
    price: "34 €",
    img: package8,
    duration: "5 hour",
    groupKey: "packages:tours.florence.group",
    rating: "5.0",
    subimages:[sub15,sub16],
    gallery:[gallery21,gallery1,gallery3,gallery4],
    desc: "Discover the artistic treasures and historic landmarks of Florence, the cradle of the Renaissance.",
    longDescKey:
      "Explore Florence’s extraordinary cultural heritage as you visit its most famous sites, including the Cathedral of Santa Maria del Fiore, Ponte Vecchio, and renowned artistic squares. A perfect tour for art lovers, history enthusiasts, and anyone fascinated by Italian culture.",
    },
];

export const services = [
  {
    img: service1,
    titleKey: "packages:services.bike.title",
    descKey: "packages:services.bike.desc",
  },
  {
    img: service2,
    titleKey: "packages:services.guided.title",
    descKey: "packages:services.guided.desc",
  },
  {
    img: service3,
    titleKey: "packages:services.hills.title",
    descKey: "packages:services.hills.desc",
  },
  {
    img: service4,
    titleKey: "packages:services.coach.title",
    descKey: "packages:services.coach.desc",
  },
  {
    img: service5,
    titleKey: "packages:services.luxury.title",
    descKey: "packages:services.luxury.desc",
  },
  {
    img: service6,
    titleKey: "packages:services.wine.title",
    descKey: "packages:services.wine.desc",
  },
];
