import type { TableStyles } from 'react-data-table-component';

export const TABLE_STYLES: TableStyles = {
  table: {
    style: { backgroundColor: 'var(--surface)', color: 'var(--text)' },
  },
  tableWrapper: {
    style: { borderRadius: 'var(--radius-list)' },
  },
  headRow: {
    style: {
      minHeight: '48px',
      backgroundColor: 'var(--surface-alt)',
      borderBottom: '1px solid var(--border)',
    },
  },
  headCells: {
    style: {
      paddingInline: '28px',
      fontSize: '14px',
      fontWeight: 500,
      color: 'var(--text-muted)',
    },
  },
  rows: {
    style: {
      minHeight: '56px',
      fontSize: '16px',
      color: 'var(--text)',
      backgroundColor: 'var(--surface)',
      '&:not(:last-of-type)': { borderBottom: '1px solid var(--divider)' },
    },
    highlightOnHoverStyle: {
      backgroundColor: 'var(--surface-alt)',
      color: 'var(--text)',
      outline: 'none',
      borderBottomColor: 'var(--divider)',
    },
  },
  cells: {
    style: { paddingInline: '28px', fontVariantNumeric: 'tabular-nums' },
  },
  pagination: {
    style: {
      minHeight: '56px',
      backgroundColor: 'var(--surface)',
      color: 'var(--text-muted)',
      borderTop: '1px solid var(--border)',
      fontSize: '14px',
    },
    pageButtonsStyle: {
      color: 'var(--title)',
      fill: 'var(--title)',
      '&:disabled': { color: 'var(--text-faint)', fill: 'var(--text-faint)' },
      '&:hover:not(:disabled)': { backgroundColor: 'var(--mint-soft)' },
      '&:focus': { outline: 'none', backgroundColor: 'var(--mint-soft)' },
    },
  },
  noData: {
    style: { padding: '32px', backgroundColor: 'var(--surface)', color: 'var(--text-muted)' },
  },
  progress: {
    style: { backgroundColor: 'var(--surface)' },
  },
};
