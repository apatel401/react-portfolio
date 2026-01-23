import { useMemo } from "react";

export function useExperienceDuration(
  startDate = new Date(2019, 0, 1)
) {
  const duration = useMemo(() => {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  }, [startDate]);

  return duration;
}
