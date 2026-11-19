import { Category, CategoryId, Product } from '../types/nova';
import catAudioImg from '../assets/images/cat_audio_gear_1795113308491.jpg';
import catChargingImg from '../assets/images/cat_charging_gear_1795113308758.jpg';
import catDeskImg from '../assets/images/cat_desk_gear_1795113308746.jpg';
import prodArcImg from '../assets/images/prod_arc_headphones_1795113308502.jpg';
import prodPulseImg from '../assets/images/prod_pulse_dock_1795113309345.jpg';
import prodFolioImg from '../assets/images/prod_folio_hub_1795113309017.jpg';
import prodCoreImg from '../assets/images/prod_core_gan_1795113308988.jpg';
import { CATALOG_CATEGORIES, CATALOG_PRODUCTS } from './catalogData';

const CATEGORY_IMAGES: Record<CategoryId, string> = {
  audio: catAudioImg,
  charging: catChargingImg,
  desk: catDeskImg,
};

const PRODUCT_IMAGES: Record<string, string> = {
  'nova-arc-anc': prodArcImg,
  'nova-pulse-dock': prodPulseImg,
  'nova-folio-hub': prodFolioImg,
  'nova-core-gan': prodCoreImg,
};

export const CATEGORIES: Category[] = CATALOG_CATEGORIES.map((category) => ({
  ...category,
  imagePath: CATEGORY_IMAGES[category.id],
}));

export const FEATURED_PRODUCTS: Product[] = CATALOG_PRODUCTS.map((product) => ({
  ...product,
  imagePath: PRODUCT_IMAGES[product.id] ?? '',
}));
