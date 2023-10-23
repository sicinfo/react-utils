/**
 * @author moreira 2022-06-07
 */
'use strict';

export default (
    /** @type {WrapPromiseArgument<any>} */ promiseAny
) => {

  const SUCCESS = 1;
  const ERROR = 2;
  
  /** @type {0|SUCCESS|ERROR} */ let status = 0;
  /** @type {WrapPromiseResponse<any>} */ let response;

  const suspender = promiseAny.then(
    success => { status = SUCCESS; response = success },
    error => { status = ERROR; response = error }
  )

  return {
    get read() {
      if (status == SUCCESS) return response;
      throw status ? response : suspender;
    }
  }

}  
