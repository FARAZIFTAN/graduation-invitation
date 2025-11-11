import { Wisudawan } from '../types';

export const wisudawanData: Wisudawan[] = [
  {
    id: 1,
    nama: 'Elisabeth Diana Yuvita',
    gelar: 'S.Tr.Log',
    prodi: 'D4 Logistik Bisnis',
    inisial: 'EDY',
    accessCode: 'EDY2025',
  },
  {
    id: 2,
    nama: 'Geovitra Veronika Nona',
    gelar: 'S.Tra',
    prodi: 'D4 Transportasi Darat',
    inisial: 'GVN',
    accessCode: 'GVN2025',
  },
  {
    id: 3,
    nama: 'Maria Rosari Stefania Ere Pati',
    gelar: 'S.Tra',
    prodi: 'D4 Transportasi Darat',
    inisial: 'MRS',
    accessCode: 'MRS2025',
  },
  {
    id: 4,
    nama: 'Maria Carmelia Romina',
    gelar: 'S.Tra',
    prodi: 'D4 Transportasi Darat',
    inisial: 'MCR',
    accessCode: 'MCR2025',
  },
  {
    id: 5,
    nama: 'Fernandito Juniantoro Dias De Jesus',
    gelar: 'S.M',
    prodi: 'D4 Manajemen Transportasi',
    inisial: 'FJD',
    accessCode: 'FJD2025',
  },
  {
    id: 6,
    nama: 'Ana Yulita Da Silva',
    gelar: 'S.Log',
    prodi: 'D4 Logistik Bisnis',
    inisial: 'AYD',
    accessCode: 'AYD2025',
  },
  {
    id: 7,
    nama: 'Maria Sabatini Nuro Nona Yelly',
    gelar: 'S.Log',
    prodi: 'D4 Logistik Bisnis',
    inisial: 'MSN',
    accessCode: 'MSN2025',
  },
  {
    id: 8,
    nama: 'Diodatus Son Seran',
    gelar: 'S.Tra',
    prodi: 'D4 Transportasi Darat',
    inisial: 'DSS',
    accessCode: 'DSS2025',
  },
  {
    id: 9,
    nama: 'Oktaviani Manek',
    gelar: 'S.Tr.Ak',
    prodi: 'D4 Akuntansi Transportasi',
    inisial: 'OKM',
    accessCode: 'OKM2025',
  },
  {
    id: 10,
    nama: 'Theresia Avnesia Saja',
    gelar: 'S.Tr.Log',
    prodi: 'D4 Logistik Bisnis',
    inisial: 'TAS',
    accessCode: 'TAS2025',
  },
];

// Helper function to validate access code
export function validateAccessCode(code: string): number | null {
  const wisudawan = wisudawanData.find(
    (w) => w.accessCode?.toUpperCase() === code.toUpperCase()
  );
  return wisudawan ? wisudawan.id : null;
}
