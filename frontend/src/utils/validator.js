export const isInputTextValid = (input) => {
  return input.trim().split(" ").length <= 14
}