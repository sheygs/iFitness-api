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

type NotFoundResponse = {
  error: NotFoundError;
};

interface SuccessResponse<T> {
  code: number;
  status: Status;
  message: string;
  data: T | object;
}

type FailureResponse = {
  code: number;
  status: Status;
  error: {
    name?: string;
    message: string | object;
    stack?: string;
    path: string;
  };
};

export { Status, SuccessResponse, FailureResponse, NotFoundResponse };
