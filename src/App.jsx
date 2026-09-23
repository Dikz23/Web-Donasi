import React, { useState, useEffect } from 'react';
import PublicView from './components/PublicView';
import AdminView from './components/AdminView';

export default function App() {
  // Pengatur Jalur (Router) Berdasarkan Hashes (#) pada URL
  const [currentRoute, setCurrentRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setCurrentRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // State Donasi Terkumpul & Donatur (Tersimpan Permanen di Browser)
  const [collected, setCollected] = useState(() => {
    const saved = localStorage.getItem('donasi_collected');
    return saved !== null ? Number(saved) : 0;
  });

  const [donorsCount, setDonorsCount] = useState(() => {
    const saved = localStorage.getItem('donasi_donors_count');
    return saved !== null ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('donasi_collected', collected.toString());
  }, [collected]);

  useEffect(() => {
    localStorage.setItem('donasi_donors_count', donorsCount.toString());
  }, [donorsCount]);

  // Jika URL memiliki #admin, tampilkan Halaman Admin
  if (currentRoute === '#admin') {
    return (
      <AdminView 
        collected={collected} 
        setCollected={setCollected} 
        donorsCount={donorsCount} 
        setDonorsCount={setDonorsCount} 
      />
    );
  }

  // Jika tidak, tampilkan Halaman Utama Publik
  return (
    <PublicView 
      collected={collected} 
      donorsCount={donorsCount} 
    />
  );
}