import { Response } from 'express';

import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException as HttpExceptions,
} from '@nestjs/common';

import { AppError } from './app-errors';

interface IErrorResponse {
    message: string[];
    statusCode: number;
    error: string;
}

@Catch(Error)
export class GlobalErrors implements ExceptionFilter<Error> {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let message: string[];
        let statusCode: number;
        let code: string;

        if (exception instanceof AppError) {
            const response = exception.getResponse();

            message = [response.message];
            code = response.code;
            statusCode = response.statusCode;
        } else if (exception instanceof HttpExceptions) {
            const response = exception.getResponse() as IErrorResponse;

            message = response.message;
            code = response.error;
            statusCode = response.statusCode;
        } else {
            message = ['Internal server error'];
            code = 'INTERNAL_SERVER_ERROR';
            statusCode = 500;

            // eslint-disable-next-line no-console
            console.error({
                message,
                code,
                exception,
            });
        }

        return response.status(statusCode).json({
            message,
            code,
        });
    }
}
