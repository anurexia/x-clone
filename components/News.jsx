import Image from "next/image";
import Link from "next/link";

const News = ({ headline: { source, title, url, urlToImage } }) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="flex cursor-pointer flex-col items-center justify-between gap-3 rounded-lg p-2 transition-all duration-500 hover:bg-neutral-100 md:flex-row-reverse"
    >
      <Image
        className="h-20 w-full rounded object-cover md:h-20 md:w-20"
        width={90}
        height={0}
        src={urlToImage}
        alt="latest news"
      />

      <div className="space-y-2">
        <h3 className="line-clamp-3 text-sm font-medium text-neutral-400">
          {title}
        </h3>
        <p className="tracking text-xs font-semibold text-neutral-500">
          {source.name}
        </p>
      </div>
    </Link>
  );
};
export default News;
