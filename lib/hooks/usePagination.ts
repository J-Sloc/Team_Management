'use client';

import { useState, useCallback } from 'react';

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface PaginationControls {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  setTotal: (totalItems: number) => void;
}

export function usePagination(initialPageSize = 10): PaginationControls {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [total, setTotalState] = useState(0);

  const totalPages = Math.ceil(total / pageSize);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const setTotal = useCallback((totalItems: number) => {
    setTotalState(totalItems);
  }, []);

  const goToPage = useCallback((newPage: number) => {
    const maxPage = Math.ceil(total / pageSize);
    if (newPage >= 1 && newPage <= maxPage) {
      setPage(newPage);
    }
  }, [total, pageSize]);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage(p => p + 1);
    }
  }, [hasNextPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage(p => p - 1);
    }
  }, [hasPreviousPage]);

  const setPageSize = useCallback((size: number) => {
    if (size > 0) {
      setPageSizeState(size);
      setPage(1); // Reset to first page on page size change
    }
  }, []);

  return {
    page,
    pageSize,
    total,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    setTotal,
  };
}

// Helper to slice data for pagination (client-side)
export function paginateArray<T>(data: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return data.slice(start, start + pageSize);
}
