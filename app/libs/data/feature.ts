interface FeatureCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  color: string;
  bg: string;
}

export const featureCards: FeatureCardData[] = [
  {
    id: "caption",
    title: "توصیف تصویر",
    description:
      "ابزار ما محتوای هر تصویر را تحلیل می‌کند و توضیحی روان و قابل فهم از آن ارائه می‌دهد. مناسب برای دسترس‌پذیری، تولید محتوا و مستندسازی.",
    image: "/images/caption.png",
    path: "/caption",
    color: "#D9333E",
    bg: "#FFEBEC",
  },
  {
    id: "tags",
    title: "تگ‌گذاری",
    description:
      "این ابزار اجزای اصلی تصویر را شناسایی کرده و برچسب‌های مرتبط تولید می‌کند. به شما کمک می‌کند تصاویرتان سریع‌تر دسته‌بندی و جستجو شوند.",
    image: "/images/tags.png",
    path: "/tags",
    color: "#8E25F6",
    bg: "#F3E9FD",
  },
  {
    id: "elements",
    title: "پردازش تصویر",
    description:
      "این ابزار اجزای موجود در هر تصویر را شناسایی کرده و به‌صورت یک فهرست کامل در اختیار شما قرار می‌دهد. روشی ساده و سریع برای درک بهتر محتوای تصاویر.",
    image: "/images/elements.png",
    path: "/elements",
    color: "#3399D4",
    bg: "#EBF8FF",
  },
];
