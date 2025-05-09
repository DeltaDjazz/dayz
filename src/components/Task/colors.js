export const colors = {
    yellow: '#ffe100',
    yellowLight: '#ffbf00',
    yellowDark: '#ffad0f',
    blue: '#0ff',
    blueLight: '#00abff',
    blueDark: '#006ece',
    green: '#2aff00',
    greenLight: '#23d500',
    greenDark: '#1eac02',
  };


// Fonction utilitaire pour déterminer la couleur en fonction du statut
export const getColorByStatus = (status) => {
  switch (status) {
    case 'todo': return colors.yellow;
    case 'en cours': return colors.blue;
    case 'terminé': return colors.green;
    default: return '#ccccccbd';
  }
};

export const getColorDarkByStatus = (status) => {
  switch (status) {
    case 'todo': return colors.yellowDark;
    case 'en cours': return colors.blueDark;
    case 'terminé': return colors.greenDark;
    default: return 'white';
  }
};