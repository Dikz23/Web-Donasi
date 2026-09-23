import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Share2, 
  HandHeart, 
  MessageSquare, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { ADMIN_WA_NUMBER, formatRupiah, INITIAL_ACTIVITY_PHOTOS } from '../utils/constants';

export default function PublicView({ collected, donorsCount }) {
  const campaign = {
    title: 'Bantuan Pangan & Kebutuhan Pokok untuk Kaum Dhuafa',
    organizer: 'Mahasiswa & Mahasiswi Universitas Muhammadiyah Tangerang',
    target: 2000000,
    timeRemainingText: '5 Minggu Lagi',
    description: 'Mari bersama-sama ulurkan tangan membantu saudara-saudara kita dari kalangan dhuafa, lansia sebatang kara, dan keluarga prasejahtera. Donasi yang Anda berikan akan disalurkan dalam bentuk paket sembako, makanan gizi layak, dan bantuan kebutuhan dasar harian.'
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

  const progressPercentage = Math.min(100, (collected / campaign.target) * 100);

  const handleDonateViaWhatsApp = (e) => {
    e.preventDefault();
    const nameToDisplay = isAnonymous ? 'Hamba Allah' : (donorName.trim() || 'Hamba Allah');
    
    let message = `Halo Admin ${campaign.organizer},\n\n`;
    message += `Saya ingin berdonasi untuk program ${campaign.title}.\n\n`;
    message += `Nama Donatur: ${nameToDisplay}\n\n`;
    message += `Mohon petunjuk nomor rekening dan langkah selanjutnya untuk menyalurkan donasi ini. Terima kasih.`;

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
            
            {/* Foto Slideshow Berunsur Donasi */}
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

            {/* Info Kampanye */}
            <div className="lg:col-span-5 space-y-5">
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

              {/* Progress Bar & Jangka Waktu */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-blue-50 shadow-sm space-y-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Dana Terkumpul</p>
                    <p className="text-2xl font-black text-blue-600">{formatRupiah(collected)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-medium">Target</p>
                    <p className="text-sm font-bold text-slate-700">{formatRupiah(campaign.target)}</p>
                  </div>
                </div>

                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-slate-500 pt-1 border-t border-slate-200 mt-2">
                  <span className="flex items-center gap-1 font-medium text-slate-700 mt-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    {donorsCount} Orang Baik Tergabung
                  </span>
                  <span className="flex items-center gap-1 font-medium text-slate-700 mt-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    {campaign.timeRemainingText}
                  </span>
                </div>
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
              <div className="bg-blue-50 border border-blue-200 text-blue-900 p-4 rounded-2xl text-xs md:text-sm leading-relaxed flex gap-3">
                <span className="text-xl">💡</span>
                <p>
                  <strong>Catatan Transparansi:</strong> Setelah menghubungi WhatsApp Admin, Admin akan memberikan nomor rekening resmi. Setelah transfer terkonfirmasi, data terkumpul di website ini akan diperbarui oleh Admin.
                </p>
              </div>
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

              <p className="text-xs text-slate-500 mb-4">
                Dokumentasi penyaluran donasi dan aksi peduli yang diinisiasi oleh mahasiswa & mahasiswi Universitas Muhammadiyah Tangerang.
              </p>

              {/* Grid Foto Kegiatan */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
                {activityPhotos.map((url, idx) => (
                  <div key={idx} className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm aspect-video bg-slate-100">
                    <img 
                      src={url} 
                      alt={`Kegiatan Bantuan ${idx + 1}`} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-2.5">
                      <span className="text-[10px] text-white font-medium bg-blue-600/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        Dokumentasi {idx + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Form Hubungi WhatsApp */}
          <section className="lg:col-span-5">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 text-blue-700 p-2.5 rounded-xl">
                  <HandHeart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Mulai Berdonasi</h3>
                  <p className="text-xs text-slate-500 font-medium">Terhubung Langsung ke WA Admin</p>
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
                  <span>Niat Berdonasi via WhatsApp</span>
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
          <p>Terima kasih telah menjadi bagian dari perubahan positif. Sehat dan sukses selalu untuk Anda.</p>
        </div>
      </footer>
    </div>
  );
}