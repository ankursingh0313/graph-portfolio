"use client";
import { title } from "process";
import StickyCard from "./widgets/StickyCard";
import TextCard from "./widgets/TextCard";
import SocialCard from "./widgets/SocialCard";
import {
  Twitter,
  Facebook,
  Github,
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";
import ImageCard from "./widgets/ImageCard";
import ContactCard from "./widgets/ContactCard";
import ListCard from "./widgets/ListCard";
const iconMap = {
  twitter: Twitter,
  facebook: Facebook,
  github: Github,
};
const links = [
  {
    platform: "twitter",
    label: "My Twitter",
    url: "https://twitter.com/myprofile",
  },
  {
    platform: "facebook",
    label: "Facebook Page",
    url: "https://facebook.com/myprofile",
  },
  {
    platform: "github",
    label: "GitHub Repo",
    url: "https://github.com/myrepo",
  },
];
export default function Home() {
  function handleLinkClick(url: string) {
    window.open(url, "_blank"); // opens the URL in a new tab
  }
  return (
    <div>
      {/* Example movable + resizable component */}
      <StickyCard
        title={"Background"}
        content={
          "I have 2+ years of experience in web development, specializing in React, Node.js, MongoDb, Websockets and modern web technologies. Previously I have worked with Ucertify.com as Web Developer for 1 year and with Naygon Technologies as Full-stack Developer for 1 years. And currently I'm working as freelancer."
        }
        color={"gray"}
      />
      <TextCard
        content={
          "Hi, I'm a Full Stack Developer passionate about creating amazing web experiences.\n I love building interactive applications and exploring new technologies. Currently focused on React, TypeScript, and modern web development."
        }
        color={"gray"}
      />
      <StickyCard
        title={"Core Skills"}
        content={
          "Frontend: React, TypeScript, Tailwind CSS, BootStrap, JavaScript, HTML, CSS \nBackend: Node.js, Express \nDatabase: MongoDb, MySQL, Firebase \nTools: Socket.io, Git, Docker, AWS, Canva, Figma \nOther Languages: C, C++, PHP"
        }
        color={"gray"}
      />
      <StickyCard
        title={"Education"}
        content={
          "Bachelor of Computer Applications (MGKVP Varanasi, Uttar Pradesh, India)\nIntermediate (Colonelganj Inter College Prayagraj, Uttar Pradesh, India)\nHigh School (St. Xavier's High School Robertsganj, Sonbhadra, Uttar Pradesh, India)\nAnd I'm a continuous learning enthusiast"
        }
        color={"gray"}
      />
      <ListCard
        color="gray"
        title="Frontend Technologies"
        items={[
          "React & Next.js",
          "TypeScript",
          "Tailwind CSS",
          "HTML5 & CSS3",
          "JavaScript ES6+",
        ]}
      />
      <ListCard
        color="gray"
        title="Backend Technologies"
        items={[
          "Node.js & Express",
          "MongoDB & MySQL",
          "Rest APIs",
          "Socket.io",
        ]}
      />
      <ListCard
        color="gray"
        title="Development Tools"
        items={["Git Bash & GitHub", "VS Code", "Figma & Canva", "Docker", "AWS & Vercel"]}
      />
      <SocialCard
        color={"gray"}
        title="Socials"
        links={links}
        iconMap={iconMap}
        handleLinkClick={handleLinkClick}
        ExternalLink={ExternalLinkIcon}
      />
      <ImageCard
        color="gray"
        title="That's Me!"
        imageUrl="./images/profile.jpeg"
        alt="Ankur Singh"
        caption="Always ready to tackle new chalanges!"
      />
      <ContactCard
        color="gray"
        title="Get in Touch"
        placeholder="We’re here to help!"
      />
    </div>
  );
}
