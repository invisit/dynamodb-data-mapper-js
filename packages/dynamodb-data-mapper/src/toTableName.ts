

function toSnakeCase(str: string) {
  return str
    .replace(/[-\s]+/g, "_")
    .replace(/([A-Z\d]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
}

function toDashCase(str: string): string {
  return toSnakeCase(str).replace(/_/g, "-")
}

export function toTableName(str: string) {
  return toDashCase(str).toLowerCase()
}
