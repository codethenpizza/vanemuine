import {Env} from "../lib/config";

export const stringFromEnv = (env: Optional<string>): string => env || ''

export const envFromNodeEnv = (env: Optional<string>, fallback?: Env): Env => env as Env || fallback || "production"

export const numberFromEnv = (env: Optional<string>): number => {
  const val = parseFloat(env || '');
  if (isNaN(val)) {
    return 0
  }
  return val

}
