// Los 14 alérgenos de declaración obligatoria en la UE, en castellano, catalán e inglés.
import type { Allergen } from '../core/model';

export const ALLERGENS: Record<Allergen, { es: string; ca: string; en: string }> = {
  gluten: { es: 'Gluten', ca: 'Gluten', en: 'Gluten' },
  crustaceans: { es: 'Crustáceos', ca: 'Crustacis', en: 'Crustaceans' },
  egg: { es: 'Huevo', ca: 'Ou', en: 'Egg' },
  fish: { es: 'Pescado', ca: 'Peix', en: 'Fish' },
  peanuts: { es: 'Cacahuete', ca: 'Cacauet', en: 'Peanuts' },
  soy: { es: 'Soja', ca: 'Soja', en: 'Soy' },
  milk: { es: 'Leche / lactosa', ca: 'Llet / lactosa', en: 'Milk' },
  nuts: { es: 'Frutos de cáscara', ca: 'Fruits de closca', en: 'Tree nuts' },
  celery: { es: 'Apio', ca: 'Api', en: 'Celery' },
  mustard: { es: 'Mostaza', ca: 'Mostassa', en: 'Mustard' },
  sesame: { es: 'Sésamo', ca: 'Sèsam', en: 'Sesame' },
  sulphites: { es: 'Sulfitos', ca: 'Sulfits', en: 'Sulphites' },
  lupin: { es: 'Altramuz', ca: 'Tramús', en: 'Lupin' },
  molluscs: { es: 'Moluscos', ca: 'Mol·luscs', en: 'Molluscs' },
};
