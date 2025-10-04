import { useEffect, useState } from "react";
import api from "../../assets/api/axios/axios";
import { SiYoutube } from "react-icons/si";
type VideoResponse = {
  status: number;
  youtube_link: string;
};

const HeroFirstSection: React.FC = () => {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await api.get<VideoResponse>("/videoUpload.php");

        if (res.data.status === 200) {
          const link = res.data.youtube_link;
          let id: string | null = null;

          try {
            const url = new URL(link);

            if (url.hostname.includes("youtu.be")) {
              // short link → take pathname (/VIDEOID)
              id = url.pathname.replace("/", "");
            } else if (
              url.hostname.includes("youtube.com") &&
              url.searchParams.get("v")
            ) {
              // normal youtube link
              id = url.searchParams.get("v");
            }
          } catch (error) {
            console.error("Invalid YouTube link:", link, error);
          }

          if (id) setVideoId(id);
        }
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    };

    fetchVideo();
  }, []);

  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center bg-black">
      {/* Video background */}
      <div className="absolute inset-0">
        <iframe
          className="w-full h-full object-cover"
          src={embedUrl}
          title="YouTube video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Hunger For God
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Learn, Grow, and Connect with Us
        </p>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 flex items-center gap-5 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-700 transition"
        >
          Watch <SiYoutube className="text-white " size={30} />
        </a>
      </div>
    </section>
  );
};

export default HeroFirstSection;
