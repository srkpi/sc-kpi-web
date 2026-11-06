// Тимчасові ліміти довжини текстів для адмінки структури.
// Значення ще не погоджені із замовником, змінюються в одному місці.
export const STRUCTURE_LIMITS = {
  personName: 60,
  position: 100,
  managerDuties: 300,
  areaName: 80,
  areaDescription: 250,
  sectionName: 80,
  sectionDescription: 250,
} as const;
