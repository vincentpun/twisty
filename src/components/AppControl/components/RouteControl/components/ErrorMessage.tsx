import * as React from 'react';
import * as classNames from 'classnames';
import { isNil } from 'ramda';

interface ErrorMessageProps {
  title: string;
  message: string;
  onRetryClick?: () => void;
}

const ErrorMessage = ({ title, message, onRetryClick }: ErrorMessageProps) => (
  <div className="error-message">
    <div className="error-message__title">{title}</div>
    <p
      className={
        classNames('error-message__text', {
          'error-message__text--last-line': isNil(onRetryClick),
        })
      }
    >
      Reason: {message}
    </p>
    {
      !isNil(onRetryClick) ?
      <button className="error-message__button" onClick={e => !isNil(onRetryClick) ? onRetryClick() : null}>
        Retry
      </button> :
      null
    }
  </div>
);

export default ErrorMessage;
