export default function Card({ postTitle, postUrl, description, pubDate }) {
  return (
    <div className="m-2 px-2 py-4 rounded-lg hover:scale-105 duration-200 bg-white hover:drop-shadow-lg">
      <div>
        <a
          href={postUrl}
          className="font-bold text-xl"
          target="_blank"
        >
          {postTitle}
        </a>
        <hr className="my-2" />
        <p className="h-24">
          {description.substring(0, 200) +
            (() => {
              if (description.length > 200) return "...";
              else return "";
            })()}
        </p>
        <p className="text-xs text-right">{pubDate}</p>
      </div>
      <div className="text-center mt-3">
        <a
          href={"https://codechovui.dev/" + postUrl}
          className="bg-blue-500 text-white font-bold px-7 py-2 rounded-lg hover:bg-blue-600"
          target="_blank"
        >
          See More ➡️{" "}
        </a>
      </div>
    </div>
  );
}
