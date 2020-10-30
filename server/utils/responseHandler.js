//Show the various responses for every request

const responseHandler = (success, code = 400, message='valid', data) => {
      return {
          success,
          code,
          message,
          data
      };
};

export default responseHandler