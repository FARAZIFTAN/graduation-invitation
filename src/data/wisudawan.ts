import { Wisudawan } from '../types';

export const wisudawanData: Wisudawan[] = [
  {
    id: 1,
    nama: 'Ana Yulita Da Silva',
    gelar: 'S.Log',
    prodi: 'Logistik',
    inisial: 'AYD',
    accessCode: 'AYD2025',
  },
  {
    id: 2,
    nama: 'Diodatus Son Seran',
    gelar: 'S.Tra',
    prodi: 'Administrasi',
    inisial: 'DSS',
    accessCode: 'DSS2025',
  },
  {
    id: 3,
    nama: 'Elisabeth Diana Yuvita',
    gelar: 'S.Tr.Log',
    prodi: 'Logistik',
    inisial: 'EDY',
    accessCode: 'EDY2025',
  },
  {
    id: 4,
    nama: 'Fernandito Juniantoro Dias De Jesus',
    gelar: 'S.M',
    prodi: 'Manajemen',
    inisial: 'FJD',
    accessCode: 'FJD2025',
  },
  {
    id: 5,
    nama: 'Geovitra Veronika Nona',
    gelar: 'S.Tra',
    prodi: 'Administrasi',
    inisial: 'GVN',
    accessCode: 'GVN2025',
  },
  {
    id: 6,
    nama: 'Maria Carmelia Romina',
    gelar: 'S.Tra',
    prodi: 'Administrasi',
    inisial: 'MCR',
    accessCode: 'MCR2025',
  },
  {
    id: 7,
    nama: 'Maria Rosari Stefania Ere Pati',
    gelar: 'S.Tra',
    prodi: 'Administrasi',
    inisial: 'MRS',
    accessCode: 'MRS2025',
  },
  {
    id: 8,
    nama: 'Maria Sabatini Nuro Nona Yelly',
    gelar: 'S.Log',
    prodi: 'Logistik',
    inisial: 'MSN',
    accessCode: 'MSN2025',
  },
  {
    id: 9,
    nama: 'Oktaviani Manek',
    gelar: 'S.Tr.Ak',
    prodi: 'Akuntansi',
    inisial: 'OM',
    accessCode: 'OM2025',
  },
  {
    id: 10,
    nama: 'Theresia Avnesia Saja',
    gelar: 'S.Tr.Log',
    prodi: 'Logistik',
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
