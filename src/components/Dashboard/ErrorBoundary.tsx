import { Component, type ReactNode } from 'react'

interface Props {
  fallback?: ReactNode
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      const message =
        (this.state.error as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? this.state.error?.message
        ?? 'Something went wrong'
      return (
        <div className="px-7 py-6 bg-secondary-bg rounded-2xl min-h-[160px] flex items-center justify-center">
          <p className="text-text-secondary">{message}</p>
        </div>
      )
    }

    return this.props.children
  }
}