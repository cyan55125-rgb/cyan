import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-200 font-[Outfit]">
              出了点问题
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              程序遇到了一个意外错误，但你的数据是安全的。
              <br />
              点击下方按钮重试即可恢复。
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all cursor-pointer mx-auto"
            >
              重新加载
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
