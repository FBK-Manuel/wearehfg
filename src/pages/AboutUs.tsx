import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="flex-1 container mx-auto px-4 py-6">
      <div className="min-h-screen flex items-center justify-center px-6 py-12 backdrop-blur-md bg-white/10 border-b border-white/20 transition-shadow duration-300 rounded-2xl">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-50">
              Our Story
            </h2>

            <p className="text-gray-50 leading-relaxed">
              Our Story HUNGRY FOR GOD was birthed through the inspiration of
              the Holy Spirit as a vibrant prayer movement. What began as a
              small circle of about five believers in Massachusetts, under the
              leadership of its visionary, Alberto Bruny, has now become a
              global family.
            </p>
            <p className="text-gray-50 leading-relaxed">
              During those early days, God led Alberto to relocate to Florida,
              where he encountered intense seasons of hardship and testing. Yet,
              what the enemy meant for defeat became the soil for deeper
              intimacy with God. Out of these trials was birthed a burning
              passion to intercede for others and to create a space where people
              could encounter the presence of God for themselves.
            </p>

            <p className="text-gray-50 leading-relaxed">
              In January 2021, Alberto experienced a life-changing visitation.
              For an entire week, he was ministered to by holy angels, receiving
              divine strength and equipping for the assignment ahead. Shortly
              after, during a 21-day fast, the Lord gave him a clear
              instruction: open the prayer line to the nations. From that
              moment, HUNGRY FOR GOD began welcoming people from every walk of
              life and from different parts of the world.
            </p>

            <p className="text-gray-50 leading-relaxed">
              Today, under the leadership of Alberto and his wife, Annie Bruny,
              this prayer community has grown into a thriving global family of
              thousands. Men and women, young and old, gather daily to
              experience the transforming power of God where faith is
              strengthened, miracles are witnessed, and believers are empowered
              to walk boldly in their true identity in Christ.
            </p>
            <p className="text-gray-50 leading-relaxed">
              HUNGRY FOR GOD is more than a community it is a movement, calling
              hearts everywhere to seek His presence, grow deeper in prayer, and
              live fully in the purpose of God.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="/images/both1.png"
              alt="About Us"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
