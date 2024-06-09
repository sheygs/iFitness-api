enum Status {
  SUCCESS = 'success',
  FAILURE = 'failure',
}

type NotFoundError = {
  code: number;
  status: Status;
  message: string;
  path: string;
};

interface NotFoundResponse {
  error: NotFoundError;
}

interface SuccessResponse<T> {
  code: number;
  status: Status;
  message: string;
  data: T | object;
}

interface FailureResponse {
  code: number;
  status: Status;
  error: {
    name: string;
    message: string;
    stack?: string;
    path: string;
  };
}

export { Status, SuccessResponse, FailureResponse, NotFoundResponse };
