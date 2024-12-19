export function todoTextValidation(todoText: string, min: number, max: number) {
  const trimedText = todoText.trim();
  if (trimedText && trimedText.length >= min && trimedText.length <= max) {
    return true;
  }

  alert('Задача должна содержать от 2 до 64 символов');

  return false;
}
