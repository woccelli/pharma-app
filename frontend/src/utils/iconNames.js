const getIconNames = () => {
    const icons = require('@mdi/js')
    const keys = Object.keys(icons)
    return keys
};
  
  export default getIconNames;