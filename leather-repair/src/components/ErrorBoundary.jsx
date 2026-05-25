import { Component } from 'react';
import { BUSINESS } from '../config/business.js';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Surface to console for now; wire to Sentry/etc. in Phase E.
    console.error('[ErrorBoundary]', error, info?.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div role="alert" className="error-boundary">
        <div className="error-boundary__card">
          <h1 className="error-boundary__title">Something went wrong</h1>
          <p className="error-boundary__body">
            We hit an unexpected error. You can reload the page, or reach us directly — we'll be glad to help.
          </p>
          <div className="error-boundary__actions">
            <button type="button" className="btn btn--primary" onClick={this.handleReload}>
              Reload page
            </button>
            <a className="btn btn--ghost" href={`tel:${BUSINESS.phone.e164}`}>
              Call {BUSINESS.phone.display}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
