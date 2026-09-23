import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  LayoutDashboard, 
  Home, 
  LogOut, 
  PlusCircle, 
  RefreshCw, 
  Save 
} from 'lucide-react';
import { ADMIN_PIN, formatRupiah } from '../utils/constants';

export default function AdminView({ collected, setCollected, donorsCount, setDonorsCount }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [inputCollected, setInputCollected] = useState(collected.toString());
  const [inputDonorsCount, setInputDonorsCount] = useState(donorsCount.toString());
  const [addAmount, setAddAmount] = useState('');

  // Synchronize inputs jika state eksternal berubah
  useEffect(() => {
    setInputCollected(collected.toString());
    setInputDonorsCount(donorsCount.toString());
  }, [collected, donorsCount]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAdminLoggedIn(true);
      setPinError('');
    } else {
      setPinError('PIN Admin salah! Silakan coba lagi.');
    }
  };

  const handleSaveAdminData = (e) => {
    e.preventDefault();
    const newCollected = Number(inputCollected);
    const newDonors = Number(inputDonorsCount);

    if (isNaN(newCollected) || newCollected < 0) {
      alert('Nominal terkumpul tidak valid.');
      return;
    }

    setCollected(newCollected);
    setDonorsCount(isNaN(newDonors) ? 0 : newDonors);
    alert('Data donasi berhasil diperbarui di website!');
  };

  const handleQuickAddDonation = (e) => {
    e.preventDefault();
    const addVal = Number(addAmount);
    if (!addVal || addVal <= 0) {
      alert('Masukkan nominal donasi yang valid.');
      return;
    }

    const updatedCollected = collected + addVal;
    const updatedDonors = donorsCount + 1;

    setCollected(updatedCollected);
    setDonorsCount(updatedDonors);
    setAddAmount('');
    alert(`Berhasil menambahkan donasi masuk sebesar ${formatRupiah(addVal)}.`);
  };

  // Tampilan Form Login PIN Admin
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
        <form onSubmit={handleAdminLogin} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Ruang Admin</h2>
            <p className="text-xs text-slate-500">Masukkan PIN Keamanan Admin</p>
          </div>

          {pinError && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-600 rounded-xl text-center font-semibold">
              {pinError}
            </div>
          )}

          <input 
            type="password"
            placeholder="• • • • • •"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            className="w-full text-center tracking-widest text-2xl font-bold px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 outline-none transition"
            autoFocus
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <Unlock className="w-5 h-5" />
            <span>Buka Akses Admin</span>
          </button>

          <button 
            type="button" 
            onClick={() => window.location.hash = ''} 
            className="w-full text-xs text-slate-500 hover:text-slate-800 font-semibold transition text-center block"
          >
            ← Kembali ke Web Publik
          </button>
        </form>
      </div>
    );
  }

  // Tampilan Dashboard Kelola Donasi jika berhasil Login
  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-12">
      {/* Navbar Admin Header */}
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-lg">Panel Kelola Admin</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => window.location.hash = ''} 
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              <Home className="w-4 h-4" /> Web Utama
            </button>
            <button 
              onClick={() => setIsAdminLoggedIn(false)} 
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </div>
        </div>
      </nav>

      {/* Content Dashboard Admin */}
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-6">
        
        {/* Ringkasan Ringkas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
            <p className="text-xs font-semibold text-slate-500 mb-1">Total Dana Tampil di Web</p>
            <h3 className="text-3xl font-black text-slate-900">{formatRupiah(collected)}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-600">
            <p className="text-xs font-semibold text-slate-500 mb-1">Total Donatur Terdata</p>
            <h3 className="text-3xl font-black text-slate-900">{donorsCount} Orang Baik</h3>
          </div>
        </div>

        {/* Form Aksi Pengelolaan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Quick Add Form */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-600" /> + Verifikasi Donasi Masuk
            </h4>
            <p className="text-xs text-slate-500">
              Gunakan form ini jika ada transfer masuk ke rekening. Nominal akan otomatis ditambahkan ke total dana.
            </p>
            <form onSubmit={handleQuickAddDonation} className="space-y-3">
              <input 
                type="number"
                placeholder="Nominal Masuk (Rp)"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                className="w-full px-4 py-3 text-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none"
              />
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-xs shadow-md"
              >
                + Tambahkan Donasi Cepat
              </button>
            </form>
          </div>

          {/* Edit Manual Form */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-600" /> Ubah Data Manual
            </h4>
            <p className="text-xs text-slate-500">
              Gunakan form ini untuk mengubah total angka secara bebas jika terjadi penyesuaian data.
            </p>
            <form onSubmit={handleSaveAdminData} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Total Dana (Rp)</label>
                <input 
                  type="number"
                  value={inputCollected}
                  onChange={(e) => setInputCollected(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm font-bold border-2 border-slate-200 rounded-xl focus:border-emerald-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Total Donatur (Orang)</label>
                <input 
                  type="number"
                  value={inputDonorsCount}
                  onChange={(e) => setInputDonorsCount(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm font-bold border-2 border-slate-200 rounded-xl focus:border-emerald-500 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Web</span>
              </button>
            </form>
          </div>

        </div>

      </main>
    </div>
  );
}