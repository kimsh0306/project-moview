const getErrorMessage = (error) => {
  let errorMessage = "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";

  if (error.response) {
    const statusCode = error.response.status;

    switch (statusCode) {
      case 400:
        errorMessage = error.response.data?.message || "잘못된 요청입니다.";
        break;
      case 401:
        errorMessage = error.response.data?.message || "인증이 필요합니다. 다시 시도해 주세요.";
        break;
      case 403:
        errorMessage = error.response.data?.message || "접근 권한이 없습니다.";
        break;
      case 404:
        errorMessage = error.response.data?.message || "요청한 페이지를 찾을 수 없습니다.";
        break;
      case 422:
        errorMessage = error.response.data?.message || "입력 값이 잘못되었습니다. 다시 확인해 주세요.";
        break;
      default:
        if (statusCode >= 500) {
          errorMessage = error.response.data?.message || "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
        }
    }
  } else if (error.request) {
    errorMessage = "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.";
  }

  return errorMessage;
}

export default getErrorMessage;