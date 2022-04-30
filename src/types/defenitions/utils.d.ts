type Nullable<T> = T | null

type Optional<T> = T | undefined

type Unpacked<T> = T extends (infer U)[] ? U : T;
