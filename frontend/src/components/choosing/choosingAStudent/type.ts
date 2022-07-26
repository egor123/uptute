export interface Filter {
  name: filterName;
  dir: "up" | "down";
}

type filterName = "time" | "subject" | "grade";
