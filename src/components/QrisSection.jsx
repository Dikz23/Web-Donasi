// components/QrisSection.jsx
import React, { useState } from 'react';
import { QrCode, CreditCard, Copy, Check } from 'lucide-react';
import { PAYMENT_INFO } from '../utils/constants';

export default function QrisSection() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
      
      {/* HEADER QRIS */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-emerald-100 text-emerald-700 p-2.5 rounded-xl">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">QRIS & Pembayaran</h3>
            <p className="text-xs text-slate-500 font-medium">Scan QRIS atau transfer melalui rekening/e-wallet resmi</p>
          </div>
        </div>
      </div>

      {/* FOTO QRIS */}
      <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-3">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 w-52 h-52 flex items-center justify-center">
          <img 
            src={PAYMENT_INFO.qrisImageUrl} 
            alt="QRIS Donasi" 
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-700">Scan QRIS menggunakan E-Wallet / M-Banking</p>
          <p className="text-[11px] text-slate-500">GoPay, OVO, DANA, ShopeePay, BCA Mobile, Livin, dll.</p>
        </div>
      </div>

      {/* INFORMASI REKENING & E-WALLET (DANA) */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <CreditCard className="w-4 h-4 text-emerald-600" />
          <span>Transfer Bank & E-Wallet</span>
        </div>

        <div className="space-y-2.5">
          {PAYMENT_INFO.bankAccounts.map((acc, index) => (
            <div 
              key={index} 
              className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-2"
            >
              <div>
                {/* Menggunakan bankName agar fleksibel untuk Bank atau DANA */}
                <p className="text-xs font-bold text-slate-800">{acc.bankName}</p>
                <p className="text-sm font-mono font-extrabold text-blue-600 tracking-wide my-0.5">
                  {acc.accountNumber}
                </p>
                <p className="text-[11px] text-slate-500">a.n. {acc.accountHolder}</p>
              </div>

              <button
                onClick={() => handleCopy(acc.accountNumber, index)}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm flex-shrink-0"
                title="Salin nomor"
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Disalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}