export function formatDuration(minutes: number): string {
  if (minutes < 0) return '0分钟';
  if (minutes < 1) return '不到1分钟';
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (hours === 0) return `${mins}分钟`;
  if (mins === 0) return `${hours}小时`;
  return `${hours}小时${mins}分钟`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return '刚刚';
  if (diffMinutes < 60) return `${diffMinutes}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays === 1) return '昨天';
  if (diffDays === 2) return '前天';
  if (diffDays < 7) return `${diffDays}天前`;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const currentYear = now.getFullYear();

  if (year === currentYear) {
    return `${month}月${day}日`;
  }
  return `${year}年${month}月${day}日`;
}

export function formatStreak(days: number): string {
  if (days === 0) return '暂无连续记录';
  if (days < 7) return `连续 ${days} 天`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    const remainder = days % 7;
    return remainder > 0
      ? `连续 ${weeks} 周 ${remainder} 天`
      : `连续 ${weeks} 周`;
  }
  const months = Math.floor(days / 30);
  const remainder = days % 30;
  return remainder > 0
    ? `连续 ${months} 个月 ${remainder} 天`
    : `连续 ${months} 个月`;
}

export function formatProgress(percent: number): string {
  const clamped = Math.max(0, Math.min(100, percent));
  if (Number.isInteger(clamped)) {
    return `${clamped}%`;
  }
  return `${clamped.toFixed(1)}%`;
}
