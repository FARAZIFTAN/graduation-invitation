export interface Wisudawan {
  id: number;
  nama: string;
  gelar: string;
  prodi: string;
  inisial: string;
}

export interface Invitation {
  id: string;
  guestName: string;
  link: string;
  createdAt: string;
  qrCodeData?: string;
}

export interface Quota {
  used: number;
  max: number;
}

export interface QuotaMap {
  [wisudawanName: string]: Quota;
}
