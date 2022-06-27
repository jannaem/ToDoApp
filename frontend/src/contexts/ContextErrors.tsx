/**
 * noContextProviderFound is a method that throws an error and is used
 * inside the defaultContextValue
 */
export const noContextProviderFound = (context: string) => {
  throw new Error("Found no provider for the " + context);
};
