import { Invitation, QuotaMap } from '../types';
import { wisudawanData } from '../data/wisudawan';

const QUOTA_KEY = 'wisuda_quotas';

export function initializeData(): void {
  if (!localStorage.getItem(QUOTA_KEY)) {
    const quotas: QuotaMap = {};
    wisudawanData.forEach((w) => {
      quotas[w.nama] = { used: 0, max: 10 };
    });
    localStorage.setItem(QUOTA_KEY, JSON.stringify(quotas));
  }
}

export function getQuotas(): QuotaMap {
  const data = localStorage.getItem(QUOTA_KEY);
  if (!data) {
    initializeData();
    return getQuotas();
  }
  return JSON.parse(data);
}

export function updateQuota(wisudawan: string, used: number): void {
  const quotas = getQuotas();
  quotas[wisudawan].used = used;
  localStorage.setItem(QUOTA_KEY, JSON.stringify(quotas));
}

export function getInvitationKey(wisudawan: string): string {
  return `wisuda_invitations_${wisudawan.replace(/\s+/g, '_')}`;
}

export function getInvitations(wisudawan: string): Invitation[] {
  const key = getInvitationKey(wisudawan);
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function saveInvitation(
  wisudawan: string,
  invitation: Invitation
): void {
  const invitations = getInvitations(wisudawan);
  invitations.push(invitation);
  const key = getInvitationKey(wisudawan);
  localStorage.setItem(key, JSON.stringify(invitations));

  const quotas = getQuotas();
  quotas[wisudawan].used += 1;
  localStorage.setItem(QUOTA_KEY, JSON.stringify(quotas));
}

export function deleteInvitation(wisudawan: string, invitationId: string): void {
  const key = getInvitationKey(wisudawan);
  let invitations = getInvitations(wisudawan);
  invitations = invitations.filter((inv) => inv.id !== invitationId);
  localStorage.setItem(key, JSON.stringify(invitations));

  const quotas = getQuotas();
  quotas[wisudawan].used = Math.max(0, quotas[wisudawan].used - 1);
  localStorage.setItem(QUOTA_KEY, JSON.stringify(quotas));
}
