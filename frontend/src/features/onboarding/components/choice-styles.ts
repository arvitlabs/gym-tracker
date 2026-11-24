export const choiceGroupStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
  '& .MuiToggleButtonGroup-grouped': {
    borderRadius: '14px !important',
    border: '1.5px solid #3A3B35 !important',
    margin: '0 !important',
  },
  '& .MuiToggleButtonGroup-grouped.Mui-selected': {
    borderColor: '#FF7A3D !important',
  },
};

export const choiceStyles = {
  minHeight: 48,
  border: '1.5px solid #3A3B35',
  color: '#F3F1EA',
  backgroundColor: '#1E1F1B',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-body)',
  textTransform: 'none',
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#1A0E06',
    backgroundColor: '#FF7A3D',
    borderColor: '#FF7A3D',
  },
  '&:hover': { backgroundColor: '#30312A' },
  '&.Mui-focusVisible': { outline: '2px solid #C8F25A', outlineOffset: '2px' },
};
