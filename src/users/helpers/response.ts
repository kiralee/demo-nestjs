class Response {
  setTemplate(message: string, data: any) {
    return {
      message_1: message,
      data: data,
    };
  }
}

export default Response;
