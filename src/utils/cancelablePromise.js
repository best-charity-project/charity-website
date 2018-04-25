export default (promise) => {
  let hasCanceled_ = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled_ ? reject(Error('Promise canceled')) : resolve(val)),
      error => (hasCanceled_ ? reject(Error('Promise canceled')) : reject(error)),
    );
  });
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
