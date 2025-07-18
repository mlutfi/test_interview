export type ResponseData<T = any> = {
  code: number | string,
  message: string,
  data: T,
}