export const ADMIN_WA_NUMBER = "6285841277953";
export const ADMIN_PIN = "admin123";

export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
};

// Koleksi Gambar Bantuan Sosial yang Stabil
export const INITIAL_ACTIVITY_PHOTOS = [
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=600'
];