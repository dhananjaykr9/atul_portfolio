export async function withDatabaseFallback<T>(
  label: string,
  query: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await query();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";

    console.warn(`Database query failed for ${label}. Using fallback. ${message}`);
    return fallback;
  }
}
