export const getRandomRating = () => {
  const ratings = ["Отлично", "Хорошо", "Плохо"];
  return ratings[Math.floor(Math.random() * ratings.length)];
};

export const getRatingClass = (rating) => {
  const ratingClasses = {
    Отлично: "excellent",
    Хорошо: "good",
    Плохо: "bad",
  };
  return ratingClasses[rating] || "";
};

export const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
};

export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const formatted = cleaned.replace(
  /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
  "+$1 ($2) $3-$4-$5"
  );
  return formatted;
}
export function groupCallsByDate(calls) {
  const groups = {};
  calls.forEach(call => {
    const dateKey = new Date(call.date).toISOString().split('T')[0];
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(call);
  });
  return Object.entries(groups)
    .map(([date, groupCalls]) => ({ date, calls: groupCalls }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getHumanDateLabel(dateStr) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const date = new Date(dateStr);
  today.setHours(0,0,0,0);
  yesterday.setHours(0,0,0,0);
  date.setHours(0,0,0,0);

  if (date.getTime() === today.getTime()) return 'Сегодня';
  if (date.getTime() === yesterday.getTime()) return 'Вчера';

  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}