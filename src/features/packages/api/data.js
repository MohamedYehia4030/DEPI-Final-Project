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
    price: "34€",
    img: package1,
    duration: "2.5 hour",
    groupKey: "packages:tours.luccaBike.group",
    rating: "5.0",
    subimages:[sub1,sub2],
    longDescKey:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    gallery:[gallery1,gallery2,gallery3,gallery4],
    desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 2,
    titleKey: "packages:tours.wineTasting.title",
    price: "34€",
    img: package2,
    duration: "3 hour",
    groupKey: "packages:tours.wineTasting.group",
    rating: "5.0",
    subimages:[sub3,sub4],
    longDescKey:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    gallery:[gallery3,gallery1,gallery2,gallery4],
    desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  {
    id: 3,
    titleKey: "packages:tours.cinqueTerre.title",
    price: "34€",
    img: package3,
    duration: "5 hour",
    groupKey: "packages:tours.cinqueTerre.group",
    rating: "4.9",
    subimages:[sub5,sub6],
    longDescKey:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    gallery:[gallery1,gallery2,gallery3,gallery4],
    desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 4,
    titleKey: "packages:tours.siena.title",
    price: "34€",
    img: package4,
    duration: "3.5 hour",
    groupKey: "packages:tours.siena.group",
    rating: "5.0",
    subimages:[sub7,sub8],
    longDescKey:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    gallery:[gallery21,gallery1,gallery3,gallery4],
    desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 5,
    titleKey: "packages:tours.luccaHills.title",
    price: "34€",
    img: package5,
    duration: "3 hour",
    groupKey: "packages:tours.luccaHills.group",
    rating: "5.0",
    subimages:[sub9,sub11],
    longDescKey:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    gallery:[gallery3,gallery1,gallery2,gallery4],
    desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 6,
    titleKey: "packages:tours.gardaland.title",
    price: "34€",
    img: package6,
    duration: "6 hour",
    groupKey: "packages:tours.gardaland.group",
    rating: "4.8",
    subimages:[sub11,sub12],
    longDescKey:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    gallery:[gallery21,gallery1,gallery3,gallery4],
    desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 7,
    titleKey: "packages:tours.pisaLucca.title",
    price: "34€",
    img: package7,
    duration: "4 hour",
    groupKey: "packages:tours.pisaLucca.group",
    rating: "4.9",
    subimages:[sub13,sub14],
    longDescKey:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    gallery:[gallery1,gallery2,gallery3,gallery4],
    desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  {
    id: 8,
    titleKey: "packages:tours.florence.title",
    price: "34€",
    img: package8,
    duration: "5 hour",
    groupKey: "packages:tours.florence.group",
    rating: "5.0",
    subimages:[sub15,sub16],
    longDescKey:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    gallery:[gallery21,gallery1,gallery3,gallery4],
    desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
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
