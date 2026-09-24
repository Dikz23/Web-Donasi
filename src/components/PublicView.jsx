// components/PublicView.jsx
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  HandHeart, 
  MessageSquare, 
  ShieldCheck,
  RefreshCw,
  Target
} from 'lucide-react';
import { ADMIN_WA_NUMBER, INITIAL_ACTIVITY_PHOTOS } from '../utils/constants';
import QrisSection from './QrisSection';

export default function PublicView() {
  const campaign = {
    title: 'Bantuan Pangan & Kebutuhan Pokok untuk Kaum Dhuafa',
    organizer: 'Mahasiswa & Mahasiswi Universitas Muhammadiyah Tangerang',
    timeRemainingText: '6 Minggu Lagi',
    description: `Mari Berbagi dan Peduli. Setiap bantuan yang diberikan, berapa pun nilainya, dapat menjadi berarti bagi mereka yang membutuhkan. 🤍

    Melalui kegiatan donasi ini, kami mengajak Bapak/Ibu dan teman-teman untuk turut berpartisipasi dalam memberikan manfaat bagi sesama. Tidak ada batasan nominal dalam berdonasi, karena setiap kontribusi merupakan bentuk kepedulian yang berharga. ✨

    Mari sisihkan sebagian rezeki yang kita miliki dan bersama-sama wujudkan kebaikan yang dapat dirasakan oleh orang lain.`,
    objectives: [
      'Penyaluran 100+ paket sembako langsung ke target sasaran (lansia & dhuafa sebatang kara).',
      'Pemberian santunan kebutuhan dasar harian untuk meringankan beban keluarga prasejahtera.',
      'Pendistribusian makanan siap saji dan bantuan gizi layak di wilayah Tangerang dan sekitarnya.'
    ]
  };

  const bannerPhotos = [
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1200',
  ];
  
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % bannerPhotos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [bannerPhotos.length]);

  const [activityPhotos, setActivityPhotos] = useState([]);

  const randomizeActivityPhotos = () => {
    const shuffled = [...INITIAL_ACTIVITY_PHOTOS].sort(() => 0.5 - Math.random());
    const randomExtra = [
      `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/500/350`,
      `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/500/350`
    ];
    setActivityPhotos([...shuffled.slice(0, 4), ...randomExtra]);
  };

  useEffect(() => {
    randomizeActivityPhotos();
  }, []);

  const [donorName, setDonorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleDonateViaWhatsApp = (e) => {
    e.preventDefault();
    const nameToDisplay = isAnonymous ? 'Hamba Allah' : (donorName.trim() || 'Hamba Allah');
    
    let message = `Halo Admin ${campaign.organizer},\n\n`;
    message += `Saya ingin konfirmasi berdonasi untuk program ${campaign.title}.\n\n`;
    message += `Nama Donatur: ${nameToDisplay}\n\n`;
    message += `Berikut saya lampirkan bukti transfer/QRIS/DANA. Terima kasih.`;

    const waUrl = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: campaign.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link website berhasil disalin.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* NAVBAR PUBLIK */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 block leading-tight">Peduli Dhuafa</span>
              <span className="text-xs text-blue-600 font-medium">Universitas Muhammadiyah Tangerang</span>
            </div>
          </div>

          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full text-xs font-semibold transition"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Bagikan</span>
          </button>
        </div>
      </nav>

      {/* HEADER / BANNER MAIN SLIDESHOW */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Foto Slideshow */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-video bg-slate-100 border-4 border-white">
                <img 
                  src={bannerPhotos[currentPhoto]} 
                  alt="Kegiatan Bantuan Donasi" 
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out transform hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  Program Khusus Dhuafa
                </div>
                
                {/* Dots Navigasi Slideshow */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {bannerPhotos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhoto(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${currentPhoto === idx ? 'w-6 bg-blue-600' : 'w-2 bg-white/70'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Info Kampanye & Tujuan Program */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100">
                <ShieldCheck className="w-4 h-4" />
                <span>Aksi Sosial Mahasiswa</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {campaign.title}
              </h1>

              {/* Running Text */}
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-100 flex-shrink-0" />
                <marquee className="text-sm font-bold text-blue-700 w-full" scrollamount="4">
                  Aksi Peduli oleh: {campaign.organizer}
                </marquee>
              </div>

              {/* KOTAK TUJUAN PROGRAM */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-blue-100 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Tujuan Utama Program Ini:</span>
                </div>
                <ul className="space-y-2">
                  {campaign.objectives.map((obj, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <span className="bg-blue-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Deskripsi & Dokumentasi Bantuan */}
          <section className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-3">Kisah Program</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {campaign.description}
              </p>
            </div>

            {/* FOTO KEGIATAN BANTUAN */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" /> 
                  Dokumentasi Aksi Lapangan
                </h2>
                <button
                  onClick={randomizeActivityPhotos}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full font-semibold transition"
                  title="Acak foto kegiatan"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Acak Foto</span>
                </button>
              </div>

              {/* Grid Foto Kegiatan */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
                {activityPhotos.map((url, idx) => (
                  <div key={idx} className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm aspect-video bg-slate-100">
                    <img 
                      src={url} 
                      alt={`Kegiatan Bantuan ${idx + 1}`} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section QRIS & DANA + Form Konfirmasi WhatsApp */}
          <section className="lg:col-span-5 space-y-6">
            
            <QrisSection />

            {/* FORM KONFIRMASI WHATSAPP */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 text-blue-700 p-2.5 rounded-xl">
                  <HandHeart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Konfirmasi Donasi</h3>
                  <p className="text-xs text-slate-500 font-medium">Kirim bukti transfer/QRIS ke WA Admin</p>
                </div>
              </div>

              <form onSubmit={handleDonateViaWhatsApp} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Donatur</label>
                  <input 
                    type="text"
                    placeholder="Masukkan nama Anda"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    disabled={isAnonymous}
                    className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100 disabled:text-slate-400 transition"
                  />
                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span className="text-sm font-medium text-slate-600">Sembunyikan nama (Hamba Allah)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-sm transform hover:-translate-y-1"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Kirim Konfirmasi via WhatsApp</span>
                </button>
              </form>
            </div>

          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-slate-500 space-y-2">
          <p className="font-semibold text-slate-700">© 2026 Mahasiswa & Mahasiswi Universitas Muhammadiyah Tangerang Peduli Dhuafa.</p>
          <p>Terima kasih telah berpartisipasi dalam kebaikan ini.</p>
        </div>
      </footer>
    </div>
  );
}