import { describe, it, expect } from 'vitest';
import { requireRole } from '@/lib/rbac';
import { Session } from 'next-auth';

describe('RBAC Role Guards', () => {
  describe('requireRole', () => {
    it('should return error for missing session', () => {
      const result = requireRole(null, 'COACH', 'AD');
      expect(result).toBeDefined();
      expect(result?.status).toBe(401);
    });

    it('should return error for missing user role', () => {
      const session = {
        expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
        user: { id: 'user-1', role: undefined }
      } as unknown as Session;
      const result = requireRole(session, 'COACH', 'AD');
      expect(result).toBeDefined();
      expect(result?.status).toBe(401);
    });

    it('should pass for authorized role', () => {
      const session = {
        expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
        user: { id: 'user-1', role: 'COACH' }
      } as unknown as Session;
      const result = requireRole(session, 'COACH', 'AD');
      expect(result).toBeNull();
    });

    it('should fail for unauthorized role', () => {
      const session = {
        expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
        user: { id: 'user-1', role: 'ATHLETE' }
      } as unknown as Session;
      const result = requireRole(session, 'COACH', 'AD');
      expect(result).toBeDefined();
      expect(result?.status).toBe(401);
    });

    it('should allow ATHLETE for athlete-only guard', () => {
      const session = {
        expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
        user: { id: 'athlete-1', role: 'ATHLETE' }
      } as unknown as Session;
      const result = requireRole(session, 'ATHLETE');
      expect(result).toBeNull();
    });

    it('should allow multiple roles', () => {
      const session = {
        expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
        user: { id: 'user-1', role: 'AD' }
      } as unknown as Session;
      const result = requireRole(session, 'COACH', 'AD');
      expect(result).toBeNull();
    });
  });
});
