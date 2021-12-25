export function toggleSetLike(setNum: string | undefined) {
  if (setNum)
    localStorage.setItem(setNum, !isSetLiked(setNum) as any);

  return isSetLiked(setNum);
}

export function isSetLiked(setNum: string | undefined) {
  return setNum ? localStorage.getItem(setNum) === 'true' : false;
}