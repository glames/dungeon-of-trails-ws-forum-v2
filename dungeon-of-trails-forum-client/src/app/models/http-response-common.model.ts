export default interface HttpResponseCommon<T> {
  data: T;
  loading?: any;
  error?: any;
}
