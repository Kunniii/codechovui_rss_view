import * as cheerio from "cheerio";
import { useEffect, useState } from "react";
import Card from "./components/Card";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [rawRSS, setRawRSS] = useState("");
  useEffect(() => {
    fetch("https://codechovui.dev/index.xml")
      .then((response) => response.text())
      .then((rawRSS) => {
        setRawRSS(rawRSS);
        let $ = cheerio.load(rawRSS, {
          xmlMode: true,
        });
        let tempPosts = [];
        for (let item of $("item")) {
          let postTitle = $(item).find("title").text();
          let postUrl = $(item).find("link").text();
          let pubDate = $(item).find("pubDate").text();
          let description = $(item).find("description").text();
          tempPosts.push({ postTitle, postUrl, description, pubDate });
        }
        let parsedDatePosts = tempPosts.map((post) => {
          return { ...post, pubDate: new Date(post.pubDate) };
        });
        parsedDatePosts.sort((b, a) => a.pubDate - b.pubDate);
        const myPosts = parsedDatePosts.map((post) => {
          return { ...post, pubDate: post.pubDate.toDateString() };
        });
        setPosts(myPosts);
      });
  }, []);

  return (
    <div className="bg-slate-900 select-none">
      <h1 className="text-center text-white pt-24 font-bold text-7xl">RSS Code Cho Vui</h1>
      <div className="grid grid-cols-3 sm:grid-cols-1 px-64 py-20">
        {posts.map((post) => (
          <Card {...post} />
        ))}
      </div>
    </div>
  );
}
