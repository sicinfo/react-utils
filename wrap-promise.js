/**
 * @author moreira 2022-06-07
 */
'use strict';

System.register([], (_export, _context) => {
   
  const [SUCCESS, ERROR] = [1, 2];

  const wrapPromise = (
    /** @type {Promise<any>} */ promise
  ) => {

    /** @type {{status?:number,response?:any}} */
    const _this = {};

    const suspender = promise.then(
      response => { Object.assign(_this, { status: SUCCESS, response }) },
      response => { Object.assign(_this, { status: ERROR, response }) }
    )

    return {
      read: () => {
        if (_this.status == SUCCESS) return _this.response;
        else throw _this.status ? _this.response : suspender;
      }
    }

  }

  return {

    execute: () => {
      _export('version', '0.1.0');
      _export('default', wrapPromise);
    }

  }
})




// System.register(['idcreate'], (_export,_context) => {

//   /** @type {function} */ let newId;

//   const setters = [
//     a => (a => { newId = a.newId })(a.default)
//   ];

//   const [SUCCESS, ERROR] = [1, 2];

//   const wrapPromise = (
//     /** @type {Promise<any>} */ promise
//   ) => {

//     /** @type {{status?:number,response?:any}} */
//     const _this = {};

//     const suspender = promise.then(
//       response => { Object.assign(_this, { status: SUCCESS, response }) },
//       response => { Object.assign(_this, { status: ERROR, response }) }
//     )

//     return {
//       read: () => {
//         if (_this.status == SUCCESS) return _this.response;
//         else throw _this.status ? _this.response : suspender;
//       }
//     }

//   }

//   const execute = () => {
//     _export('version', '0.1.0');
//     _export('default', { wrapPromise, newId });
//   }

//   return { setters, execute }
// })