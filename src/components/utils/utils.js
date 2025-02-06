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
  