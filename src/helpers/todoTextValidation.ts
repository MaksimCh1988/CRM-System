export function todoTextValidation(todoText: string, min: number, max: number) {
  const trimedText = todoText.trim();
  if (trimedText && trimedText.length >= min && trimedText.length <= max) {
    return true;
  }

  return false;
}
