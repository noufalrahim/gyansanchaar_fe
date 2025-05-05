export const avatarGenerator = (name: string | undefined) => {
  if(!name){
    return "";
  }
  const initials = name.split(' ').map(n => n[0]).join('')
  return initials
};