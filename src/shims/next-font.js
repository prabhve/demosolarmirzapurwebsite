export function Inter(options = {}) {
  return {
    className: 'font-inter',
    variable: options.variable || '--font-inter',
    style: { fontFamily: "'Inter', sans-serif" }
  };
}

export function Poppins(options = {}) {
  return {
    className: 'font-poppins',
    variable: options.variable || '--font-poppins',
    style: { fontFamily: "'Poppins', sans-serif" }
  };
}
