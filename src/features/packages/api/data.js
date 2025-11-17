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

export const tours = [
  {
    id: 1,
    titleKey: "packages:tours.luccaBike.title",
    price: "34€",
    img: package1,
    duration: "2.5 hour",
    groupKey: "packages:tours.luccaBike.group",
    rating: "5.0",
  },
  {
    id: 2,
    titleKey: "packages:tours.wineTasting.title",
    price: "34€",
    img: package2,
    duration: "3 hour",
    groupKey: "packages:tours.wineTasting.group",
    rating: "5.0",
  },
  {
    id: 3,
    titleKey: "packages:tours.cinqueTerre.title",
    price: "34€",
    img: package3,
    duration: "5 hour",
    groupKey: "packages:tours.cinqueTerre.group",
    rating: "4.9",
  },
  {
    id: 4,
    titleKey: "packages:tours.siena.title",
    price: "34€",
    img: package4,
    duration: "3.5 hour",
    groupKey: "packages:tours.siena.group",
    rating: "5.0",
  },
  {
    id: 5,
    titleKey: "packages:tours.luccaHills.title",
    price: "34€",
    img: package5,
    duration: "3 hour",
    groupKey: "packages:tours.luccaHills.group",
    rating: "5.0",
  },
  {
    id: 6,
    titleKey: "packages:tours.gardaland.title",
    price: "34€",
    img: package6,
    duration: "6 hour",
    groupKey: "packages:tours.gardaland.group",
    rating: "4.8",
  },
  {
    id: 7,
    titleKey: "packages:tours.pisaLucca.title",
    price: "34€",
    img: package7,
    duration: "4 hour",
    groupKey: "packages:tours.pisaLucca.group",
    rating: "4.9",
  },
  {
    id: 8,
    titleKey: "packages:tours.florence.title",
    price: "34€",
    img: package8,
    duration: "5 hour",
    groupKey: "packages:tours.florence.group",
    rating: "5.0",
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
